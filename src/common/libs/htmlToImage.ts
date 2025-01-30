import dayjs from 'dayjs';
import { toPng } from 'html-to-image';

/**
 * 데이터 URL을 통해 이미지를 다운로드합니다
 * @param dataUrl 이미지의 데이터 URL
 * @param filename 다운로드 시 사용할 파일 이름
 */
const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 데이터 URL을 통해 이미지를 클립보드에 복사합니다
 * @param dataUrl 이미지의 데이터 URL
 */
const copyImageToClipboard = async (dataUrl: string) => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    const successMessage = 'Image successfully copied to clipboard!';
    alert(successMessage);
  } catch (error) {
    const errorMessage = 'Failed to copy image to clipboard';
    console.error(`${errorMessage}:`, error);
    alert(errorMessage);
  }
};

/**
 * HTML 요소를 이미지로 캡처하여 다운로드하거나 클립보드에 복사합니다
 * @param el 캡처할 HTML 요소
 * @param mode 동작 모드: 'download' 또는 'clipboard'
 * @param filename 다운로드 시 사용할 파일 이름 (기본값: 'fortune')
 */
export const htmlToImage = async (
  el: HTMLElement,
  mode: 'download' | 'clipboard' = 'download',
  filename: string = 'fortune'
) => {
  if (!el) {
    console.error('Element not found for capturing.');
    return;
  }

  const formattedDate = dayjs().format('YYYYMMDDHHmmss');

  try {
    // 요소를 PNG로 변환
    const image = await toPng(el, {
      style: {
        transform: 'scale(1)', // 기본 스케일로 고정
        fontFamily: 'inherit', // 폰트 상속
      },
      skipFonts: true,
    });

    if (mode === 'download') {
      // 모드 1: 이미지를 다운로드
      downloadImage(image, `${filename}_${formattedDate}.png`);
    } else if (mode === 'clipboard') {
      // 모드 2: 이미지를 클립보드에 복사
      await copyImageToClipboard(image);
    } else {
      // 예외 처리: 알 수 없는 모드
      console.error(`Unknown mode: ${mode}`);
    }
  } catch (error) {
    // 요소를 캡쳐하는 동안 오류가 발생한경우
    console.error('An error occurred while capturing the element:', error);
  }
};
