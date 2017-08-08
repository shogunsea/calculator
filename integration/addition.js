'use strict';

const testCases = [
  {
    actions: ['one', 'plus', 'two', 'evaluate'],
    result: '3',
    index: 0,
  },
  {
    actions: ['four', 'plus', 'seven', 'evaluate'],
    result: '11',
    index: 1,
  },
  {
    actions: ['five', 'plus', 'two', 'evaluate', 'evaluate'],
    result: '9',
    index: 2,
  }
]

const finalResult = [];

const additionTest = async (browser) => {
  let pass = true;

  for (let testCase of testCases) {
    const {actions, result, index} = testCase;

    for (let action of actions) {
      await browser.click(`#button_${action}`);
    }

    const newValue = await browser.getText('.result');

    if (newValue !== result) {
      finalResult[index] = 'fail';
    } else {
      finalResult[index] = 'success';
    }
  }

  return finalResult;

  // await Promise.all(testCases.forEach(async ({action, result, index}) => {
  //   await Promise.all(
  //     action.forEach(async (buttonID) => {
  //       await browser.click(`#button_${buttonID}`);
  //     })
  //   );

  //   const newValue = await browser.getText('.result');

  //   console.log('Checking test case: ' + action);

  //   if (newValue !== result) {
  //     finalResult[index] = 'fail';
  //   } else {
  //     finalResult[index] = 'success';
  //   }
  // }));

  // return finalResult;

  // await browser.click('#button_one');
    // await browser.click('#button_plus');
    // await browser.click('#button_two');
    // await browser.click('#button_evaluate');

    // const newValue = await browser.getText('.result');

    // if (newValue === '3') {
    //   return 'success';
    // } else {
    //   return 'fail';
    // }
};

export default additionTest;
