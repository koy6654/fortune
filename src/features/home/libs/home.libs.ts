import { appUrl, DEFAULT_NUM_ZERO } from 'consts';
import { DEFAULT_SHARE_X_MESSAGE } from 'consts/fortune';
import { DailyChecksResponse } from 'features/services/service.model';

export function getDailyCheckRestCount(fortuneDailyChecks: DailyChecksResponse | null): number {
  if (!fortuneDailyChecks) return DEFAULT_NUM_ZERO;
  // completed 는 claim을 받으면 'done' 이고 받지 않았으면 null
  return fortuneDailyChecks.filter((check) => check.completed === 'done').length;
}

export const MessageToX = async (message: string): Promise<boolean> => {
  try {
    const text = encodeURIComponent(message); // 기본 트윗 문구
    const url = encodeURI(appUrl); // 초대 링크
    const via = encodeURIComponent(DEFAULT_SHARE_X_MESSAGE); // 출처
    const hashtags = encodeURIComponent('fortune,FRTN'); // 쉼표로 구분된 해시태그
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}&hashtags=${hashtags}`, '_blank');
    return true;
  } catch (error) {
    console.error('X 공유 실패:', error);
    return false;
  }
};
