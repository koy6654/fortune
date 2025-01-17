import { USE_DEV_MODE } from 'consts';
import { DEFAULT_TELEGRAM_DATA } from 'consts/mock';
import { useEffect, useState } from 'react';
import { TelegramWebApps } from 'telegram-webapps-types';

/**
 * ## parseTelegramInitData
 * @function parseTelegramInitData
 * @description Parses the Telegram Web App initialization data.
 * @retuns Parsed data as an object
 * @see{@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/forEach}
 */
function parseTelegramInitData(): TelegramWebApps.WebAppInitData {
  const rawInitData = new URLSearchParams(window.Telegram.WebApp.initData);

  const parsedData: Record<string, string> = {};

  rawInitData.forEach((value, key) => {
    try {
      parsedData[key] = JSON.parse(value);
    } catch {
      parsedData[key] = value; // Fallback for non-JSON values
    }
  });

  return parsedData as TelegramWebApps.WebAppInitData;
}

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
export function useTelegramInitData(): TelegramWebApps.WebAppInitData {
  const [data, setData] = useState<TelegramWebApps.WebAppInitData>(USE_DEV_MODE ? DEFAULT_TELEGRAM_DATA : {});

  useEffect(() => {
    if (!USE_DEV_MODE) {
      setData(parseTelegramInitData());
    }
  }, []);

  return data;
}
