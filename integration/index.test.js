
import TestRunner from './testRunner';

describe('Integration tests', () => {
  test('all pass', async () => {
    const result = await TestRunner.run();
    expect(result).toEqual(["success", "success", "success"]);
  });
})
