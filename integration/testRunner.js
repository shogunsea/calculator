'use strict';

import {remote} from 'webdriverio';
import chromedriver from 'chromedriver';
import addition from './addition';

const PATH_TO_CANARY = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';
const PATH_TO_CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

const PORT = 9515;

chromedriver.start([
  '--url-base=wd/hub',
  `--port=${PORT}`,
  '--verbose'
]);

const test = async () => {
  const opts = {
    port: PORT,
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        binary: PATH_TO_CHROME,
        args: ['--headless']
      }
    }
  };

  const browser = remote(opts).init();
  const url = 'http://localhost:3090';

  await browser.url(url);

  const additionResult = await addition(browser);

  chromedriver.stop();
  browser.end();

  return additionResult;
};

const run = async () => {
  const result = await test();
  return result;
}

// TODO: possible refactor
export default {run};
