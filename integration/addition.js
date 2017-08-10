'use strict';

const {valueTransformer} = require('./helper');

const testCases = [
  // {
  //   actions: [1, '+', '='],
  //   result: '2',
  // },
  // {
  //   actions: [1, '+', 3],
  //   result: '3',
  // },
  // {
  //   actions: [1, '+', 3, '-'],
  //   result: '4',
  // },
  // {
  //   actions: [1, '+', '=', '='],
  //   result: '3',
  // },
  {
    actions: [1, '+', 2, '='],
    result: '3',
  },
  {
    actions: [4, '+', 7, '='],
    result: '11',
  },
  {
    actions: [5, '+', 2, '=', '='],
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
