'use strict';

import puppeteer from 'puppeteer';
import {valueTransformer} from '../helper';

let browserInstance = null;
let pageInstance = null;

const start = async () => {
  if (browserInstance) {
    console.warn('Browser is already running.');
    return;
  }

  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // TODO: move port to config file
  const url = 'http://localhost:3099';
  await page.goto(url);

  browserInstance = browser;
  pageInstance = page;
}

const stop = async () => {
  if (browserInstance === null) {
    console.warn('No browser instance found.');
    return;
  }

  browserInstance.close();
}

const evaluate = async (actions) => {
  const clearButton = '#button_clear';
  await pageInstance.click(clearButton);

  for (let action of actions) {
    const buttonID = `#button_${valueTransformer(action)}`;
    await pageInstance.click(buttonID);
  }

  const resultElementHandle = await pageInstance.$('.result');
  const result = await resultElementHandle.evaluate((e) => e.innerText);

  return result;
}

export default {start, stop, evaluate};
