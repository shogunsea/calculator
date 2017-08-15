'use strict';

import CalculatorStore from './calculator_store';

describe('Calculator store', () => {
  describe('instance attributes', () => {
    test('contains one current input with value 0', () => {
        expect(CalculatorStore.input).toBe(0);
    });

    test('contains two operands with value 0', () => {
      expect(CalculatorStore.currentValue).toBe(0);
      expect(CalculatorStore.lastValue).toBe(0);
    });

    test('contains one result with value 0', () => {
      expect(CalculatorStore.result).toBe(0);
    });

    test('contains currentOperator, initially set to empty string', () => {
      expect(CalculatorStore.currentOperator).toBe('');
    });
  });

  xdescribe('#reduce', () => {

  });
});
