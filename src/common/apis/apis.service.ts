import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { isPathAllowed } from 'common/libs';
import { DEFAULT_FALLBACK_URL, apiDomain } from 'consts';

import { BaseError, BaseResponse, CreateAxiosInstanceOptions, CustomAxiosInstance } from './apis.model';
import { LocalStorage } from 'common/libs/storageManager';
import { AuthState } from 'features/auth';
import { StoreApi, UseBoundStore } from 'zustand';

let _authStore: UseBoundStore<StoreApi<AuthState>> | null = null;

/**
 * @function injectStore
 * @description apis 모듈의 전역변수에 store를 할당
 * - axios 인스턴스의 request 인터셉터에서 store 여부를 판단함
 * - store가 할당된 경우, 토큰값을 store.auth.{token} 값에 접근하여 가져온다
 * - axios 인스턴의 request 인터셉터에서 options 속성에 useAuthorization 가 포함된 경우, 헤더에 위 토큰 정보를 사용하여 발송한다
 */
const injectStore = (s: UseBoundStore<StoreApi<AuthState>>): void => {
  _authStore = s;
};

const handleInterceptorRequest = (
  config: InternalAxiosRequestConfig,
  options?: CreateAxiosInstanceOptions
): InternalAxiosRequestConfig => {
  const requestConfig = { ...config };

  /**
   * @property {object} withCredentials
   * @description Cross Origin에 브라우저의 인증 정보를 요청하기 위한 설정
   * - 이 옵션을 사용하는 요청에 대해서는 서버가 특정 도메인의 요청만 허용되도록 제한해야 한다
   * - 따라서 서버 응답의 헤더값이 Access-Control-Allow-Origin `*` 으로 설정 되어있는 경우 에러가 뜬다
   * - withCredentials 옵션이 활성된 상태에서는 `*` 사용을 허용하지 않기 때문이다
   * - 서버 측 Access-Control-Allow-Origin 에서 특정한 origin에 대한 허용 설정이 있어야 하며
   * - 서버 측에서 설정을 변경할 수 없거나 `*`으로 설정된 경우, withCredential 옵션을 제외하면 CORS 정책 위반을 피할 수 있다
   * @summary CORS에 쿠키 정보 전송
   */
  if (options?.useCredentials) {
    requestConfig.withCredentials = true;
  }

  if (options?.useAuthorization) {
    if (_authStore) {
      const token = _authStore.getState().getToken();
      if (token) {
        const authorization = /^bearer/i.test(token) ? token : `bearer ${token}`;
        requestConfig.headers.Authorization = authorization;
      }
    }
  }

  return requestConfig;
};

const handleInterceptorRequestError = (error: Error | AxiosError): Promise<AxiosError> => {
  console.log(error);
  return Promise.reject(error);
};

/**
 * @description
 * - HTTP status code 가 무조건 200 OK 를 수신함
 * - 따라서 data.code 가 0 보다 큰 경우, AxiosError를 throw 해줘야 함
 * @catution
 * - AxiosError 객체의 두번째 인자에서 code를 받고 있는데, number(0) 인 경우, 출력이 되지 않는 버그가 있으므로 문자열로 형변환하도록 한다
 */
const handleInterceptorResult = (
  response: AxiosResponse<BaseResponse | BaseError>
): AxiosResponse<BaseResponse | BaseError> => {
  const { responseURL } = response.request;

  /**
   * 특정 API를 에러로 간주할 수 있도록 함
   * @example
   * const blackLists = ['/category/something', '/else/time'];
   */
  // eslint-disable-next-line prefer-const
  let blackLists: string[] = [];

  const isExistBlacklistAPI = isPathAllowed({
    pathname: responseURL,
    lists: blackLists,
    method: 'includes',
  });

  if (isExistBlacklistAPI) {
    const message = response?.data?.msg?.toString();
    const code = response?.data?.code?.toString();

    const axiosError: AxiosError = new AxiosError(message, code, response.config, response.request, response);

    throw axiosError;
  }
  /** 주의: return 형식 변경시 `CustomAxiosInstance`의 주석 참고 */
  return response;
};

const handleInterceptorResultError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isCancel(error)) {
    console.error(error);
    throw error;
  }

  // 401 Unauthorized (type assertion)
  if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 401) {
    console.error(error);

    if (_authStore) {
      _authStore.getState().clearToken();
    }

    window.location.href = `${DEFAULT_FALLBACK_URL}`;
  }

  return Promise.reject(error);
};

const setInterceptor = (axiosInstance: AxiosInstance, options?: CreateAxiosInstanceOptions): AxiosInstance => {
  const { interceptors } = axiosInstance;
  interceptors.request.use((config) => handleInterceptorRequest(config, options), handleInterceptorRequestError);
  interceptors.response.use(handleInterceptorResult, handleInterceptorResultError);
  return axiosInstance;
};

const createAxiosInstance = (baseURL: string, options?: CreateAxiosInstanceOptions): AxiosInstance => {
  const axiosInstance: CustomAxiosInstance = axios.create({
    baseURL,
    responseType: 'json',
    timeout: 1000 * 5,
    ...axios.defaults.headers,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': 'true',
      ...(options?.requstConfig?.headers || {}),
    },
    ...options?.requstConfig,
  });

  return setInterceptor(axiosInstance, options);
};

const removeToken = ($axiosInstance: AxiosInstance): void => {
  const axiosInstance = $axiosInstance;
  delete axiosInstance.defaults.headers.common?.authorization;
};

/** 공개 api 객체 */
const api_v1 = createAxiosInstance(apiDomain);

/** 인증 api 객체 */
const apiAuth = createAxiosInstance(apiDomain, {
  useAuthorization: true,
});

/** 다른도메인에 쿠키를 포함하여 전송하는 api 객체 */
const apiWithCredentials = createAxiosInstance(apiDomain, {
  useCredentials: true,
  useAuthorization: true,
});

export { api_v1, apiAuth, apiWithCredentials, removeToken, injectStore };
