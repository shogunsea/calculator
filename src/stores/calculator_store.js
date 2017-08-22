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
    this.currentValue = null;
    this.lastValue = null;
    this.result = 0;
    this.currentOperator = '';
    this.lastInputType = '';

    // TODO: use stack to keep inner state?

    // seperate this call into init method?
    this._registerToDispatcher();
  }

  reduce(action, value) {
    this._logger({action, value});

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

    this._logger();
  }

  _registerToDispatcher() {
    this.dispatcher.subscribe('OPERAND_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('OPERATOR_INPUT', this.reduce.bind(this));
    this.dispatcher.subscribe('DISPLAY_RESULT', this.reduce.bind(this));
    this.dispatcher.subscribe('EVALUATE', this.reduce.bind(this));
    this.dispatcher.subscribe('MODIFY', this.reduce.bind(this));
  }

  _clear() {
    this.currentValue = null;
    this.lastValue = null;
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
    const buffer = this.currentValue;
    this.currentValue = this.lastValue + this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  _minus() {
    const buffer = this.currentValue;
    this.currentValue = this.lastValue - this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  _multiply() {
    const buffer = this.currentValue;
    this.currentValue = this.lastValue * this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  _divide() {
    const buffer = this.currentValue;
    debugger
    this.currentValue = this.lastValue / this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  // number only. how about dot?
  _receiveOperand(value) {
    const intValue = +value;

    if (this.lastInputType === 'operand' || this.lastInputType === '') {
      this.currentValue = (this.currentValue * 10 + intValue);
    } else if (this.lastInputType === 'operator') {
      this.lastValue = this.currentValue;
      this.currentValue = intValue;
    }

    this.lastInputType = 'operand';
    this._displayResult();
  }

  _receiveOperator(operator) {
    this.lastInputType = 'operator';
    this.currentOperator = operator;
  }

  _evaluate() {
    if (this.lastValue === null) { // test case: 1 + =
      this.lastValue = this.currentValue;
    } else if (this.lastInputType === 'operator') { // continous evaluation: second operand awalys used as lastValue
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

  _displayResult() {
    const value = this.currentValue;
    const formattedValue = new Intl.NumberFormat('en-US', {maximumFractionDigits: 20}).format(value);
    this.view.render('UPDATE_VIEW', formattedValue);
  }

  _logger(data) {
    const debugMode = window.location.href.match('debug');
    if (!debugMode) {
      return;
    }

    if (!data) {
      // log current state
      console.log('Current state: ');
      const data = {
        currentValue: this.currentValue,
        lastValue: this.lastValue,
        result: this.result,
        currentOperator: this.currentOperator,
        lastInputType: this.lastInputType,
      };

      console.log(JSON.stringify(data, null, 2));
      console.log('');
    } else {
      console.log('Current action: ');
      console.log(data);
    }

  }
}

export default new CalculatorStore();
