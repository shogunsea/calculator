'use strict';

const Dispatcher = require('./dispatcher');

describe('Dispatcher', () => {
  beforeEach(() => {
    this.instance = new Dispatcher();
  });

  // from view
  describe('#receiveViewAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.receiveViewAction).toBe('function');
    });

    it('consumes click and keyup event from DOM');

    it('keeps mouth shut when event is not click or keyup');

    it('calls dispatchAction for valid click event');

    it('calls dispatchAction for valid keyup event');

  });

  // to model
  describe('#dispatchAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.dispatchAction).toBe('function');
    });

    it('calls Calculator.receiveOperand when ?');

    it('calls Calculator.receiveOperator when ?');
  });

  // from model
  describe('#receiveModelAction', () => {
    it('is a function', () => {
      expect(typeof this.instance.receiveModelAction).toBe('function');
    });

    it('consumes an object that contains view element id/class and next state');
  });

  // to view
  describe('#updateView', () => {
    it('is a function', () => {
      expect(typeof this.instance.updateView).toBe('function');
    });

    it('manipulates DOM');

    it('updates DOM elements with right state');
  });
});
