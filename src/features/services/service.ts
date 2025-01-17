import { BaseResponse, api_v1, apiAuth } from 'common/apis';
import { AuthParams, AuthResponse } from 'features/auth';

export interface GenerateToken {
  token: string;
}
// export async function getTokenByDebug(params: AuthParams): Promise<GenerateToken> {
//   const {
//     data: { data },
//   } = await apiAuth.get<BaseResponse<GenerateToken>>('/todos/1', {
//     params,
//     withCredentials: false,
//   });
//   // return {
//   //   token: data.token,
//   // };
//   return data;
// }

export async function postAuthTelegramUser(params: AuthParams) {
  const {
    data: { data },
  } = await api_v1.post<any>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    ...params,
  });
  return data;
}

// export async function postRateLimitInfo(params: RateLmitParams): Promise<unknown> {
//   // TODO: API가 완성되면, axios 대신 api_v1 을 사용하여 요청할 것
//   // const {
//   //   data: { data },
//   // } = await axios.post<BaseResponse<unknown>>(
//   //   'https://jsonplaceholder.typicode.com/posts',
//   //   {
//   //     title: 'foo',
//   //     body: 'bar',
//   //     userId: 1,
//   //     ...params,
//   //   },
//   // );
//   // TODO: socket 연결할때 채널 요청으로 바뀔 가능성이 있음
//   // if (USE_DEV_MODE) {
//   //   const { data } = await api_v1.get<BaseResponse>('/market/time');
//   //   return data;
//   // }
//   // return Promise.resolve();
// }

// if (localStorage.getItem("token") === null) {
//   const { data } = await $http.post<{
//     token: string;
//     first_login: boolean;
//   }>("/auth/telegram-user", {
//     telegram_id: user.id,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     username: user.username,
//     referred_by: start_param?.replace("ref", ""),
//   });
//   setBearerToken(data.token);
//   setIsFirstLoad(data.first_login);
// }

// const data = await $http.$get<
//         {
//           user: UserType;
//           boosters: Record<BoosterTypes, BoosterType>;
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } & Record<string, any>
//       >("/clicker/sync");

//       useUserStore.setState({
//         ...data.user,
//       });

// "url"/api/auth/telegram-user (POST)

// {
//   "telegram_id" : 1,
//   "first_name" : "test",
//   "last_name" : "test",
//   "username" : "test",
//   "referred_by" : 5
// }

// {
//   "token": "123....."
// }

// localstorage 에 token이 없는 경우 호출합니다.
// 요청시 데이터는 telegram 정보로 요청합니다.
// referred_by 는 app에 start-param 으로 입력된 telegram-id 입니다.
// (보내드린 miniApp 참고.)

// response 는 token 값입니다.
// token 값은 localStorage 에 저장해서 사용하시면 됩니다.
// (보내드린 miniApp 참고.)

// username , referred_by 의 경우 값을 없을땐 요청 param에서 제외합니다.
// 메인화면 왼쪽 상단에 표현은 username 이 아닌 firstname , lastname 으로하시면 됩니다.

// "url"/api/fortune/sync (GET)

// header => Bearer "token"

// {
//   "user" : {
//       "id" : 1,
//       "telegram_id" : 1,
//       "first_name" : "test",
//       "last_name" : "test",
//       "username" : "test",
//       "wallet" : null,
//       "balance" : 500,
//         ....
//       "fortune" : 0,
//       }
//     "isFortune" : true,
//     "fortuneIndex" : 1
// }

// app이 실행되었을때 호출되고 접속한 user 의 정보가 리턴됩니다.
// (보내드린 miniApp 참고.)

// response 는 user , isFortune , fortuneIndex 로 되어 있습니다.
// user (... 은 프론트 관련 데이터가 아니여서 생략.)
//  1. balance = user 가 가지고 있는 point(FRTN). 메인화면 중앙 위쪽 숫자.
//  2. fortune = 하루 3번중 user 가 열었던 포츈 number 입니다. ( ex : 0/3 )

// isFortune 는 현재 fortune open 여부 입니다.

// fortuneIndex 는 하루 3번중 현재 몇번째 fortune 인지를 나타냅니다.
