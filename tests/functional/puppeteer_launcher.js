'use strict';

import puppeteer from 'puppeteer';
import addition from './addition';

const test = async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const url = 'http://localhost:3090';
  await page.goto(url);

  const additionResult = await addition(page);

  if (!additionResult.pass) {
    console.log('Addition tests did not pass.');
    console.log('Failed test cases: ');
    additionResult.testCases.forEach((testCase) => {
      console.log({testCase});
    })
  }

  browser.close();

  return additionResult.pass;
};

const run = async () => {
  const result = await test();
  return result;
}
// TODO: possible refactor
export default {run};
