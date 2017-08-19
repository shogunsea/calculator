'use strict';

import server from '../../src/server'; // starts app server
import PuppeteerLauncher from './puppeteer_launcher'; // wraps actual tests within headless

describe('Integration tests', () => {
  afterAll(() => {
    // stop app server here.
    server.close();
  });

  test('all pass', async () => {
    const result = await PuppeteerLauncher.run();
    expect(result).toBe(true);
  });
})
