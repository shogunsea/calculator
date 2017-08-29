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
    this.view = ControllerView;
    this.result = null; // result should stay null before any computation takes place
    this.currentOperator = '';
    this.lastInputType = '';
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
  }

  _add(leftOperand, rightOperand, unsetResult) {
    const result = leftOperand + rightOperand;
    if (!unsetResult) {
      this.result = result;
      this._displayResult(result);
    }

    return result;
  }

  _minus(leftOperand, rightOperand) {
    const result = leftOperand - rightOperand;
    this.result = result;
    this._displayResult(result);
  }

  _multiply(leftOperand, rightOperand, unsetResult) {
    const result = leftOperand * rightOperand;
    if (!unsetResult) {
      this.result = result;
      this._displayResult(result);
    }
    return result;
  }

  _divide(leftOperand, rightOperand) {
    const result = leftOperand / rightOperand;
    this.result = result;
    this._displayResult(result);
  }

  // number only. how about dot?
  _receiveOperand(value) {
    // if last operation is 'evaluate' then reset.

    let currentValue = +value;

    if (this.lastInputType === 'operand' && this.operands.length > 0) {
      const previousValue = this.operands.pop();
      currentValue = (previousValue * 10 + currentValue);
    } else if (this.lastInputType === 'operator') {
    }

    this.operands.push(currentValue);

    this.lastInputType = 'operand';
    this._displayResult(currentValue);
  }

  _receiveOperator(currentOperator) {
    const lastOperator = this.operators[this.operators.length - 1];

    if (currentOperator === 'plus' || currentOperator === 'minus') {
        this._evaluate();
        this.operators.pop();
        this.operators.push(currentOperator);
    } else {
      this.operators.push(currentOperator);
    }

    this.lastInputType = 'operator';
    // this.currentOperator = operator;
  }

  _evaluate() {
    let leftOperand = 0;
    let rightOperand = 0;
    let operator = '';

    // !! new computation sign: after evaluation, there's a operand coming in.
    // you should call reset when that happens.
    if (this.lastInputType === 'operand' && this.result != null) {
      this.operands.shift(); // previous right operator was store; but if new value coming in and result is present, we don't need previous right operator
    }

    if (this.operands.length <= 1) { // test case: 4 + =
      rightOperand = this.operands[this.operands.length - 1]; // peek
      leftOperand = this.result == null? rightOperand : this.result;
    } else {
      rightOperand = this.operands.pop(); // pop
      leftOperand = this.operands.pop();
    }

    const evaluateTwice = this.operators.length === 2;

    if (this.operands.length === 0) { // always reserve rightOperand in case of
      // continuous evaluation
      this.operands.push(rightOperand);
    }

    // {
    //   actions: [1, '+', 5, '*', 2, '='],
    //   result: '11',
    // },

    if (this.operators.length <= 1) {
      operator = this.operators[this.operators.length - 1]; // peek
    } else {
      operator = this.operators.pop(); // pop
    }

    this.lastInputType = 'operator';

    if (evaluateTwice) {
      const tempResult = this._compute(leftOperand, rightOperand, operator, true);

      console.log({tempResult});

      const newRightOperand = tempResult;
      const rightOperator = operator;
      const leftMostOperand = this.operands.pop();
      const newOperator = this.operators.pop();
      this.operands.push(rightOperand);
      this.operators.push(rightOperator);

      this._compute(leftMostOperand, newRightOperand, newOperator);

    } else {
      this._compute(leftOperand, rightOperand, operator, )
    }
  }

  _compute(leftOperand, rightOperand, operator, unsetResult) {
    // const {unsetResult, evaluateTwice} = options;
    switch (operator) {
      case 'plus':
        return this._add(leftOperand, rightOperand, unsetResult);
      case 'minus':
        return this._minus(leftOperand, rightOperand);
      case 'multiply':
        return this._multiply(leftOperand, rightOperand);
      case 'divide':
        return this._divide(leftOperand, rightOperand);
      default:
        return 0;
    }
  }

  _displayResult(value) {
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
        result: this.result,
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
