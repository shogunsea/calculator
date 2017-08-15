'use strict';

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
    this.currentOperator = '';
    this.lastInputType = '';

    this._registerToDispatcher();
  }

  reduce(action, value) {
    switch (action) {
      case ActionTypes.OPERAND_INPUT:
        this._receiveOperand(value);
        break;
      case ActionTypes.OPERATOR_INPUT:
        this._receiveOperator(value);
        break;
      case ActionTypes.EVALUATE:
        this._evaluate();
        break;
      case ActionTypes.DISPLAY_RESULT:
        this._displayResult();
        break;
      case ActionTypes.MODIFY:
        this._modifyResult(value);
        break;
      default:
        break;
    }
  }

  _registerToDispatcher() {
    this.dispatcher.subscribe('OPERAND_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('OPERATOR_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('DISPLAY_RESULT', this.reduce.bind(this));
    this.dispatcher.subscribe('EVALUATE', this.reduce.bind(this));
    this.dispatcher.subscribe('MODIFY', this.reduce.bind(this));
  }


  _clear() {
    this.currentValue = 0;
    this.lastValue = 0;
    this.lastInputType = '';
  }

  _switchSign() {
    this.currentValue = -this.currentValue;
  }

  _percent() {
    this.currentValue = 0.01 * this.currentValue;
  }

  _modifyResult(value) {
    if (value === 'clear') {
      this._clear();
    } else if (value === 'sign') {
      this._switchSign();
    } else if (value === 'percent') {
      this._percent();
    }
    this._displayResult();
  }

  _add() {
    this.currentValue = this.lastValue + this.currentValue;
    this._displayResult();
  }

  _minus() {
    this.currentValue = this.lastValue - this.currentValue;
    this._displayResult();
  }

  _multiply() {
    this.currentValue = this.lastValue * this.currentValue;
    this._displayResult();
  }

  _divide() {
    this.currentValue = this.lastValue / this.currentValue;
    this.displayResult();
  }

  _receiveOperand(value) {
    const intValue = +value;

    if (this.lastInputType === 'operand' || this.lastInputType === '') {
      this.currentValue = (this.currentValue * 10 + intValue);
    } else {
      this.currentValue = intValue;
    }

    this.lastInputType = 'operand';
    this._displayResult();
  }

  _receiveOperator(operator) {
    if (operator === '=') {
      return this._evaluate();
    }

    this.lastInputType = 'operator';
    this.lastValue = this.currentValue;
    this.currentValue = 0;
    this.currentOperator = operator;
  }

  _displayResult() {
    const value = this.currentValue;
    const formattedValue = new Intl.NumberFormat('en-US', {maximumFractionDigits: 20}).format(value);
    this.view.render('UPDATE_VIEW', formattedValue);
  }

  _evaluate() {
    // continous evaluation: second operand awalys used as lastValue
    if (this.lastInputType === 'operand') {
      const buffer = this.currentValue;
      this.currentValue = this.lastValue;
      this.lastValue = buffer;
    }

    this.lastInputType = 'operator';

    switch (this.currentOperator) {
      case 'plus':
        this._add();
        break;
      case 'minus':
        this._minus();
        break;
      case 'multiply':
        this._multiply();
        break;
      case 'divide':
        this._divide();
        break;
      default:
        break;
    }
    this._displayResult();
  }

}

export default new CalculatorStore();
