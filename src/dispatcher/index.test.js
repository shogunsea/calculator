'use strict';

const Dispatcher = require('./index');

describe('Dispatcher', () => {
  beforeEach(() => {
    this.instance = Dispatcher;
  });

  // from view
  xdescribe('#receiveViewAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.receiveViewAction).toBe('function');
    });

    it('consumes click and keyup event from DOM', () => {

    });

    it('keeps mouth shut when event is not click or keyup');

    it('calls dispatchAction for valid click event');

    it('calls dispatchAction for valid keyup event');

  });

  // to model
  xdescribe('#dispatchAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.dispatchAction).toBe('function');
    });

    it('calls Calculator.receiveOperand when ?');

    it('calls Calculator.receiveOperator when ?');
  });

  // from model
  xdescribe('#receiveModelAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.receiveModelAction).toBe('function');
    });

    it('consumes an object that contains view element id/class and next state');
  });

  // to view
  xdescribe('#updateView', () => {
    it('is a function', () => {
      expect(typeof this.instance.updateView).toBe('function');
    });

    it('manipulates DOM');

    it('updates DOM elements with right state');
  });
});
