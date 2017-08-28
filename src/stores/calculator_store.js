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
    // this.currentValue = null;
    // this.lastValue = null;
    this.result = null; // is this necessary?
    this.currentOperator = '';
    this.lastInputType = '';
    // TODO: these two are added to solve mixed operation
    // refactor to use stack for value&operators
    // this.preLastValue = null;
    // this.preOperator = '';
    // TODO: use stack to keep inner state?
    this.operands = [];
    this.operators = [];


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
    this.dispatcher.register('OPERAND_INPUT', this.reduce.bind(this));
    this.dispatcher.register('OPERATOR_INPUT', this.reduce.bind(this));
    this.dispatcher.register('DISPLAY_RESULT', this.reduce.bind(this));
    this.dispatcher.register('EVALUATE', this.reduce.bind(this));
    this.dispatcher.register('MODIFY', this.reduce.bind(this));
  }

  _clear() {
    // this.currentValue = null;
    // this.lastValue = null;
    this.result = null;
    this.operands = [];
    this.operators = [];
    this.lastInputType = '';
    this._displayResult(0);
    console.clear();
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
    // this._displayResult();
  }

  _add(leftOperand, rightOperand) {
    const result = leftOperand + rightOperand;
    this.result = result;
    // const buffer = this.currentValue;
    // this.currentValue = this.lastValue + this.currentValue;
    // this.lastValue = buffer;
    this._displayResult(result);
  }

  _minus(leftOperand, rightOperand) {
    const buffer = this.currentValue;
    this.currentValue = this.lastValue - this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  _multiply(leftOperand, rightOperand) {
    const buffer = this.currentValue;
    this.currentValue = this.lastValue * this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  _divide(leftOperand, rightOperand) {
    const buffer = this.currentValue;
    this.currentValue = this.lastValue / this.currentValue;
    this.lastValue = buffer;
    this._displayResult();
  }

  // number only. how about dot?
  _receiveOperand(value) {
    // if last operation is 'evaluate' then reset.

    let currentValue = +value;

    if (this.lastInputType === 'operand' && this.operands.length > 0) {
      // this.currentValue = (this.currentValue * 10 + intValue);
      const previousValue = this.operands.pop();
      currentValue = (previousValue * 10 + currentValue);
      // this.operands.push(currentValue);
    } else if (this.lastInputType === 'operator') {
      // this.lastValue = this.currentValue;
      // this.currentValue = intValue;
      // this.operands
    }

    this.operands.push(currentValue);

    this.lastInputType = 'operand';
    this._displayResult(currentValue);
  }

  _receiveOperator(currentOperator) {
    // if operator is + or -, run calculation right away if possible
    // if operator is * or /, hold the value and wait for next in put.
    // if (operator === 'plus' || operator === 'minus') {
    //   if (this.lastValue != null) {
    //     this._evaluate();
    //   }
    // } else {

    // }
    const lastOperator = this.operators[this.operators.length - 1];

    if (lastOperator === 'plus' || lastOperator === 'minus') {
      if (currentOperator === 'plus' || currentOperator === 'minus') {
        this._evaluate();
        this.operators.pop();
        this.operators.push(currentOperator);
      }
    } else {
      this.operators.push(currentOperator);
    }

    this.lastInputType = 'operator';
    // this.currentOperator = operator;
  }

  _evaluate() {
    // if (this.lastValue === null) { // test case: 1 + =
    let leftOperand = 0;
    let rightOperand = 0;
    let operator = '';

    // !! new computation sign: after evaluation, there's a operand coming in.
    // you should call reset when that happens.
    if (this.lastInputType === 'operand' && this.result != null) {
      this.operands.shift();
    }
    // console.log({operands: this.operands});
    // console.log({operators: this.operators});
    if (this.operands.length <= 1) { // test case: 4 + =
      rightOperand = this.operands[this.operands.length - 1]; // peek
      leftOperand = this.result == null? rightOperand : this.result;
    } else {
      rightOperand = this.operands.pop(); // pop
      leftOperand = this.operands.pop();
    }

    if (this.operands.length === 0) { // always reserve rightOperand in case of
      // continuous evaluation
      this.operands.push(rightOperand);
    }



    if (this.operators.length <= 1) {
      operator = this.operators[this.operators.length - 1]; // peek
    } else {
      operator = this.operators.pop(); // pop
    }

    // 1 + =
    // 1 + 2 =
    // 1 + 2 + 3 =
    // you might need a 'result' varible to hold the data.
    console.log({leftOperand});
    console.log({rightOperand});


    //     this.lastValue = this.currentValue;
    // } else if (this.lastInputType === 'operator') { // continous evaluation: second operand awalys used as lastValue
    //   const buffer = this.currentValue;
    //   this.currentValue = this.lastValue;
    //   this.lastValue = buffer;
    // }

    this.lastInputType = 'operator';

    switch (operator) {
      case 'plus':
        this._add(leftOperand, rightOperand);
        break;
      case 'minus':
        this._minus(leftOperand, rightOperand);
        break;
      case 'multiply':
        this._multiply(leftOperand, rightOperand);
        break;
      case 'divide':
        this._divide(leftOperand, rightOperand);
        break;
      default:
        break;
    }

    // this._displayResult();
  }

  _displayResult(value) {
    // const value = this.currentValue;
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
        // currentValue: this.currentValue,
        // lastValue: this.lastValue,
        result: this.result,
        // currentOperator: this.currentOperator,
        operators: this.operators,
        operands: this.operands,
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
