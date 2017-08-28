'use strict';

import server from '../../src/server'; // starts app server
import HeadlessChrome from './headless_chrome';
import additionTests from '../test_cases/addition';
import subtractionTests from '../test_cases/subtraction';
import multiplicationTests from '../test_cases/multiplication';
import divisionTests from '../test_cases/division';
import mixedOperationTests from '../test_cases/mixed_operation';

describe('Integration tests', () => {
  beforeAll(async () => {
    await HeadlessChrome.start();
  })

  afterAll(async () => {
    // stop app server here.
    server.close();
    await HeadlessChrome.stop();
  });

  describe('Addition', async () => {
  for (let {actions, result} of additionTests) {
      test(`${actions} yeilds to ${result}`, async () => {
        const actualResult = await HeadlessChrome.evaluate(actions);
        expect(actualResult).toBe(result);
      })
    }
  });

  describe('Subtraction', async () => {
    for (let {actions, result} of subtractionTests) {
      test(`${actions} yeilds to ${result}`, async () => {
        const actualResult = await HeadlessChrome.evaluate(actions);
        expect(actualResult).toBe(result);
      })
    }
  });

  describe('Multiplication', async () => {
    for (let {actions, result} of multiplicationTests) {
      test(`${actions} yeilds to ${result}`, async () => {
        const actualResult = await HeadlessChrome.evaluate(actions);
        expect(actualResult).toBe(result);
      })
    }
  });

  describe('Division', async () => {
    for (let {actions, result} of divisionTests) {
      test(`${actions} yeilds to ${result}`, async () => {
        const actualResult = await HeadlessChrome.evaluate(actions);
        expect(actualResult).toBe(result);
      })
    }
  });

  xdescribe('Mixed operation', async () => {
    for (let {actions, result} of mixedOperationTests) {
      test(`${actions} yeilds to ${result}`, async () => {
        const actualResult = await HeadlessChrome.evaluate(actions);
        expect(actualResult).toBe(result);
      })
    }
  });

})

