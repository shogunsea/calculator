'use strict';

import server from '../src/server'; // starts app server
import TestRunner from './testRunner'; // wraps actual tests within headless chrome

describe('Integration tests', () => {
  afterAll(() => {
    // stop app server here.
    server.close();
  });

  test('all pass', async () => {
    const result = await TestRunner.run();
    expect(result).toBe(true);
  });
})
