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

  xdescribe('#receiveOperand', () => {
    describe('when receiving first input', () => {
      test('first operand will be assied with the input value', () => {
        CalculatorStore.receiveOperand(3);
        expect(CalculatorStore.valA).toBe(3);
      });

      test('second operand will remain value 0', () => {
        CalculatorStore.receiveOperand(3);
        expect(CalculatorStore.valB).toBe(0);
      });

    });
  });

  xdescribe('#receiveOperator', () => {
    test('sets the current operator');
    test('calls #receiveOperand with current input value');
    // subtle implication: previous input stays on the display panel
    // new input will starts from 0
    test('sets current input to 0');

    describe('when only first operand has value', () => {
      test('does not call #evaluate');
    });

    describe('when both operands have value', () => {
      test('calls #evaluate');
    });

  });

  xdescribe('#add', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(Calculator.prototype.add(1, 2)).toBe(3);
    });

    test('sets the sum of operandA and operandB to result');

    test('sets the result to operandA');

    test('sets operandB to 0');

    test('calls #displayResult method');
  });
});
