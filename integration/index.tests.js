
import TestRunner from './testRunner';

describe('Integration tests', () => {
  test('all pass', async () => {
    // console.log(TestRunner.run.toString());
    const result = await TestRunner.run();
    expect(result).toBe('success');
  });
})
