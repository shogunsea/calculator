'use strict';

const {valueTransformer} = require('../helper');
const testCases = require('../test_cases/addition');

const additionTest = async (page) => {
  const metaData = {
    pass: true,
    testCases: []
  }

  for (let [index, testCase] of testCases.entries()) {
    const {actions, result} = testCase;

    for (let action of actions) {
      const buttonID = `#button_${valueTransformer(action)}`;
      await page.click(buttonID);
    }

    const resultElementHandle = await page.$('.result');
    const textValue = await resultElementHandle.evaluate((e) => e.innerText);
    testCase.receivedValue = textValue;

    if (textValue !== result) {
      metaData.pass = false;
      metaData.testCases.push(testCase);
    }
  }

  return metaData;
};

export default additionTest;
