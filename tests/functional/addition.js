'use strict';

const {valueTransformer} = require('../helper');
const testCases = require('../test_cases/addition');

const additionTest = async (browser) => {
  const metaData = {
    pass: true,
    testCases: []
  }

  for (let [index, testCase] of testCases.entries()) {
    const {actions, result} = testCase;

    for (let action of actions) {
      const buttonID = `#button_${valueTransformer(action)}`;
      await browser.click(buttonID);
    }

    const newValue = await browser.getText('.result');
    testCase.receivedValue = newValue;

    if (newValue !== result) {
      metaData.pass = false;
      metaData.testCases.push(testCase);
    }
  }

  return metaData;
};

export default additionTest;
