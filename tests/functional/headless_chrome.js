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
};

const stop = async () => {
  if (browserInstance === null) {
    console.warn('No browser instance found.');
    return;
  }

  browserInstance.close();
};

const evaluate = async (actions) => {
  await pageInstance.evaluate(() => {
    const clearButton = '#button_clear';
    return document.querySelector(clearButton).click();
  });

  for (let action of actions) {
    const buttonID = `#button_${valueTransformer(action)}`;
    await pageInstance.evaluate(async (buttonID) => {
      return document.querySelector(buttonID).click();
    }, buttonID);
  }

  const result = await pageInstance.evaluate(() => {
    const value = document.querySelector('.result').innerText;
    return value;
  });

  return result;
};

export default {start, stop, evaluate};
