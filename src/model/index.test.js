'use strict';

const Calculator = require('./index');

describe('Calculator', () => {
  beforeEach(() => {
    this.instance = new Calculator();
  });

  describe('instance attributes', () => {
    test('contains one current input with value 0', () => {
        expect(this.instance.input).toBe(0);
    });

    test('contains two operands with value 0', () => {
      expect(this.instance.valA).toBe(0);
      expect(this.instance.valB).toBe(0);
    });

    test('contains one result with value 0', () => {
      expect(this.instance.result).toBe(0);
    });

    test('contains one operator, initially set to empty string', () => {
      expect(this.instance.operator).toBe('');
    });
  });

  describe('#receiveOperand', () => {
    describe('when receiving first input', () => {
      it('first operand will be assied with the input value', () => {
        this.instance.receiveOperand(3);
        expect(this.instance.valA).toBe(3);
      });

      it('second operand will remain value 0', () => {
        this.instance.receiveOperand(3);
        expect(this.instance.valB).toBe(0);
      });

    });
  });

  describe('#receiveOperator', () => {
    it('sets the current operator');
    it('calls #receiveOperand with current input value');
    // subtle implication: previous input stays on the display panel
    // new input will starts from 0
    it('sets current input to 0');

    describe('when only first operand has value', () => {
      it('does not call #evaluate');
    });

    describe('when both operands have value', () => {
      it('calls #evaluate');
    });

  });

  describe('#add', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(Calculator.prototype.add(1, 2)).toBe(3);
    });

    it('sets the sum of operandA and operandB to result');

    it('sets the result to operandA');

    it('sets operandB to 0');

    it('calls #displayResult method');
  });

});
