'use strict';

import server from '../../src/server'; // starts app server
// import TestRunner from './testRunner'; // wraps actual tests within headless chrome
import PuppeteerLauncher from './puppeteer_launcher';

describe('Integration tests', () => {
  afterAll(() => {
    // stop app server here.
    server.close();
  });

  test('all pass', async () => {
    // const result = await TestRunner.run();
    const result = await PuppeteerLauncher.run();
    expect(result).toBe(true);
  });
})
