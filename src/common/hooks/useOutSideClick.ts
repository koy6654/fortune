import { useEffect, RefObject } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: (event: MouseEvent | KeyboardEvent) => void) => {
  const handleClick = (event: MouseEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return;
    callback(event);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ref, callback]);
};
