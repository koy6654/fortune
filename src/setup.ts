import './styles/index.scss';

import { ReportHandler } from 'web-vitals';

import { USE_DEV_MODE } from './consts';

let beforSetupDone = false;

const beforeSetup = () => {
  if (beforSetupDone) {
    return;
  }

  beforSetupDone = true;

  if (USE_DEV_MODE === false) {
    console.group = () => {};
    console.groupEnd = () => {};
    console.groupCollapsed = () => {};
    console.time = () => {};
    console.timeEnd = () => {};
    console.timeStamp = () => {};
    console.log = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.error = () => {};
  }
};

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

const afterSetup = () => {
  reportWebVitals();
};

export { afterSetup, beforeSetup };
