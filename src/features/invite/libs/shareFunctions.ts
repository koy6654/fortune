import { appUrl, botDomain } from 'consts';
import { DEFAULT_SHARE_TELEGRAM_MESSAGE, DEFAULT_SHARE_X_MESSAGE } from 'consts/fortune';
import { UserType } from 'features/services/service.model';

export const ShareOnTelegram = (user: UserType | null) => {
  if (user && window.Telegram) {
    const shareMessage = encodeURIComponent(DEFAULT_SHARE_TELEGRAM_MESSAGE);
    const telegram_id = user.telegram_id;

    const referralLink = `${botDomain}/?start_param=ref${telegram_id}`;

    // src/types/type.d.ts 에서 타입정의
    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?text=${shareMessage}&url=${referralLink}`);
  }
};

export const ShareOnClipboard = async (text: string): Promise<boolean> => {
  try {
    const urlText = encodeURI(text);
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([urlText], { type: 'text/plain' }),
      }),
    ]);
    return true;
  } catch (error) {
    console.error('클립보드 복사 실패:', error);
    return false;
  }
};

export const ShareOnX = async (): Promise<boolean> => {
  try {
    const text = encodeURIComponent(DEFAULT_SHARE_X_MESSAGE); // 기본 트윗 문구
    const url = encodeURI(appUrl); // 초대 링크
    const via = encodeURIComponent(''); // 출처
    const hashtags = encodeURIComponent('fortune,FRTN'); // 쉼표로 구분된 해시태그
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}&hashtags=${hashtags}`, '_blank');
    return true;
  } catch (error) {
    console.error('X 공유 실패:', error);
    return false;
  }
};
