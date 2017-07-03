'use strict';

const {expect} = require('chai');
const Calculator = require('./index');

describe('Calculator', () => {
  beforeEach(() => {
    this.instance = new Calculator();
  });

  describe('instance attribtues', () => {
    it('contains one current input with value 0', () => {
      expect(this.instance.input).to.equal(0);
    });

    it('contains two operands with value 0', () => {
      expect(this.instance.valA).to.equal(0);
      expect(this.instance.valB).to.equal(0);
    });

    it('contains one result with value 0', () => {
      expect(this.instance.result).to.equal(0);
    });

    it('contains one operator, initially set to empty string', () => {
      expect(this.instance.operator).to.equal('');
    });
  })

  describe('#receiveOperand', () => {
    context('when receiving first input', () => {
      it('first operand will be assied with the input value', () => {
        this.instance.receiveOperand(3);
        expect(this.instance.valA).to.equal(3);
      });

      it('second operand will remain value 0', () => {
        this.instance.receiveOperand(3);
        expect(this.instance.valB).to.equal(0);
      });

    });
  });

  describe('#receiveOperator', () => {
    it('sets the current operator');
    it('calls #receiveOperand with current input value');
    // subtle implication: previous input stays on the display panel
    // new input will starts from 0
    it('sets current input to 0');

    context('when only first operand has value', () => {
      it('does not call #evaluate');
    });

    context('when both operands have value', () => {
      it('calls #evaluate');
    })

  });

  describe('#add', () => {
    it('sets the sum of operandA and operandB to result');

    it('sets the result to operandA');

    it('sets operandB to 0');

    it('calls #displayResult method');
  })

});
