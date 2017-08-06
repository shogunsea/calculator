'use strict';

// store-like component: subscribe to events dispatcher emit

import ActionTypes from '../actions/action_types';
import ControllerView from '../views/controller_view';
import Dispatcher from '../dispatcher';

/**
 *
 * @export
 * @class CalculatorStore
 */

 // TODO: use singleton pattern to avoid multiple instances been created

 // " a store registers itself with the dispatcher and provides it with a callback. " ---> Dependency Inversion or not.
class CalculatorStore {
  // lower module implements abstraction. contains details.
  // Store should be initialized with dispatcher instance.
  constructor() {
    this.dispatcher = Dispatcher.getInstance();
    this.view = ControllerView; // one to one coupling? How many views should one store talk to?
    this.currentValue = 0;
    this.lastValue = 0;
    this.result = 0;
    this.input = 0;
    this.operator = '';
    this.lastOperation = '';

    this.registerToDispatcher();
  }

  registerToDispatcher() {
    this.dispatcher.subscribe('OPERAND_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('OPERATOR_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('DISPLAY_RESULT', this.reduce.bind(this));
    this.dispatcher.subscribe('EVALUATE', this.reduce.bind(this));
    this.dispatcher.subscribe('MODIFY', this.reduce.bind(this));
  }

  reduce(action, value) {
    switch (action) {
      case ActionTypes.OPERAND_INPUT:
        this.receiveOperand(value);
        break;
      case ActionTypes.OPERATOR_INPUT:
        this.receiveOperator(value);
        break;
      case ActionTypes.EVALUATE:
        this.evaluate();
        break;
      case ActionTypes.DISPLAY_RESULT:
        this.displayResult();
        break;
      case ActionTypes.MODIFY:
        this.modifyResult(value);
        break;
      default:
        break;
    }
  }

  // reset
  clear() {
    this.currentValue = 0;
    this.lastValue = 0;
    this.lastOperation = '';
  }

  switchSign() {
    this.currentValue = -this.currentValue;
  }

  percent() {
    this.currentValue = 0.01 * this.currentValue;
  }

  modifyResult(value) {
    if (value === 'clear') {
      this.clear();
    } else if (value === 'sign') {
      this.switchSign();
    } else if (value === 'percent') {
      this.percent();
    }
    this.displayResult();
  }

  add() {
    this.currentValue = this.lastValue + this.currentValue;
    this.displayResult();
  }

  minus() {
    this.currentValue = this.lastValue - this.currentValue;
    this.displayResult();
  }

  multiply() {
    this.currentValue = this.lastValue * this.currentValue;
    this.displayResult();
  }

  divide() {
    this.currentValue = this.lastValue / this.currentValue;
    this.displayResult();
  }

  receiveOperand(value) {
    const intValue = +value;

    if (this.lastOperation === 'operand' || this.lastOperation === '') {
      this.currentValue = (this.currentValue * 10 + intValue);
    } else {
      this.currentValue = intValue;
    }

    this.lastOperation = 'operand';
    this.displayResult();
  }

  receiveOperator(operator) {
    this.lastOperation = 'operator';
    this.lastValue = this.currentValue;
    this.currentValue = 0;
    this.operator = operator;
  }

  displayResult() {
    const value = this.currentValue;
    const formattedValue = new Intl.NumberFormat('en-US', {maximumFractionDigits: 20}).format(value);
    this.view.render('UPDATE_VIEW', formattedValue);
  }

  evaluate() {
    switch (this.operator) {
      case 'plus':
        this.add();
        break;
      case 'minus':
        this.minus();
        break;
      case 'multiply':
        this.multiply();
        break;
      case 'divide':
        this.divide();
        break;
      default:
        break;
    }
    this.displayResult();
  }

}

export default new CalculatorStore();
