import dayjs from 'dayjs';
import { toPng } from 'html-to-image';

const htmlToImage = (el: HTMLElement, filename: string = 'fortune') => {
  if (!el) {
    console.error('Element not found for capturing.');
    return;
  }

  const formattedDate = dayjs().format('YYYYMMDDHHmmss');

  toPng(el, { skipFonts: true })
    .then((image: string) => {
      const link = window.document.createElement('a');
      link.download = `${filename}_${formattedDate}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error: Error) => {
      console.error('An error occurred while capturing the element:', error);
    });
};

export default htmlToImage;
