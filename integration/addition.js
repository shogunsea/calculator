'use strict';

const testCases = [
  {
    actions: ['one', 'plus', 'two', 'evaluate'],
    result: '3',
  },
  {
    actions: ['four', 'plus', 'seven', 'evaluate'],
    result: '11',
  },
  {
    actions: ['five', 'plus', 'two', 'evaluate', 'evaluate'],
    result: '9',
  }
];

const additionTest = async (browser) => {
  const metaData = {
    pass: true,
    testCases: []
  }

  for (let [index, testCase] of testCases.entries()) {
    const {actions, result} = testCase;

    for (let action of actions) {
      await browser.click(`#button_${action}`);
      browser.pause(3000);
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
