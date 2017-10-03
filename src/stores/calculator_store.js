'use strict';

import ActionTypes from '../actions/action_types';
import ControllerView from '../views/controller_view';
import Dispatcher from '../dispatcher';
import Stack from './stack';
import {isPlusMinus, isMultiplyDivide} from './helper';

/**
 *
 * @export
 * @class CalculatorStore
 */

 // " a store registers itself with the dispatcher and provides it with
 // a callback. " ---> Dependency Inversion or not.
class CalculatorStore {
  // lower module implements abstraction. contains details.
  // Store should be initialized with dispatcher instance.
  constructor() {
    this.dispatcher = Dispatcher.getInstance();
    this.view = ControllerView;
    this.lastInputType = '';
    this.lastAction = '';
    this.operands = new Stack();
    this.operators = new Stack();
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
      case ActionTypes.MODIFY:
        this._modifyResult(value);
        break;
      case ActionTypes.EVALUATE:
        this._evaluate();
        break;
      case ActionTypes.DISPLAY_RESULT:
        this._displayResult();
        break;
      default:
        break;
    }

    this.lastAction = action;
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
    this.operands = new Stack();
    this.operators = new Stack();
    this.lastInputType = '';
    this._displayResult();
    console.clear();
  }

  _switchSign() {
    this.result = -this.result;
  }

  _percent() {
    this.result = 0.01 * this.result;
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

  _add(leftOperand, rightOperand) {
    const result = leftOperand + rightOperand;
    this.operands.push(result);
    this._displayResult();
  }

  _minus(leftOperand, rightOperand) {
    let result = 0;

    if (this.lastAction === ActionTypes.EVALUATE) {
      result = rightOperand - leftOperand;
    } else {
      result = leftOperand - rightOperand;
    }

    this.operands.push(result);
    this._displayResult();
  }

  _multiply(leftOperand, rightOperand) {
    const result = leftOperand * rightOperand;
    this.operands.push(result);

    this._displayResult();
  }

  _divide(leftOperand, rightOperand) {
    let result = 0;
    if (this.lastAction === ActionTypes.EVALUATE) {
      result = rightOperand / leftOperand;
    } else {
      result = leftOperand / rightOperand;
    }

    this.operands.push(result);
    this._displayResult();
  }

  // * Receiving operands should never trigger evaluation.
  _receiveOperand(value) {
    let currentValue = +value;

    if (this.lastInputType === 'operand' && this.operands.size() > 0) {
      const previousValue = this.operands.pop();
      currentValue = (previousValue * 10 + currentValue);
    }

    this.operands.push(currentValue);
    this.lastInputType = 'operand';
    this._displayResult();
  }

  // * Receiving operators *MIGHT* trigger evaluation.
  _receiveOperator(currentOperator) {
    const previousOperator = this.operators.peek();
    const previousPlusMinus = isPlusMinus(previousOperator);
    const previousMultiplyDivide = isMultiplyDivide(previousOperator);
    const currentPlusMinus = isPlusMinus(currentOperator);
    const currentMultiplyDivide = isMultiplyDivide(currentOperator);

    // 5 + + --> stay at 5
    // 5 + 1 + --> evaluate
    const invokedByOperator = {plusMinus: currentPlusMinus};
    if (previousPlusMinus && this.lastInputType !== 'operator') {
      if (currentPlusMinus) {
        this._evaluate(invokedByOperator);
      } else if (currentMultiplyDivide) {
        // no action: only store
      }
    } else if (previousMultiplyDivide) {
      if (currentPlusMinus) {
        this._evaluate(invokedByOperator);
      } else if (currentMultiplyDivide) {
        this._evaluate(invokedByOperator);
      }
    }

    if (this.lastInputType == 'operator') {
      const remainPlusMinus = isPlusMinus(this.operators.peek());
      if (remainPlusMinus && currentMultiplyDivide) {
        // do nothing:
        // [1, '+', 5, '*', 2, '/', 2, '='] --> 6
      } else {
        this.operators.pop();
      }
    }

    this.operators.push(currentOperator);
    this.lastInputType = 'operator';
  }

  _evaluate(invokedByOperator) {
    let leftOperand = 0;
    let rightOperand = 0;
    let operator = '';
    const operatorsLen = this.operators.size();

    // *Start: Collect value for operands and operators *
    if (this.operands.size() === 1) { // test case: 4 + =
      rightOperand = this.operands.peek();
      leftOperand = this.result == null? rightOperand : this.result;
    } else {
      rightOperand = this.operands.pop();
      leftOperand = this.operands.pop();
    }

    // always reserve rightOperand in case of continuous evaluation
    if (this.operands.isEmpty() && !invokedByOperator) {
      this.operands.push(rightOperand);
    }

    if (this.operators.size() <= 1) {
      operator = this.operators.peek();
    } else {
      operator = this.operators.pop();
    }
    // *END: Collect value for operands and operators *

    this.lastInputType = 'operator';

    const result = this._compute(leftOperand, rightOperand, operator);
    this.operands.push(result);

    if (operatorsLen > 1 && (!invokedByOperator || invokedByOperator.plusMinus)) {
      this._evaluate();
    }
  }

  _compute(leftOperand, rightOperand, operator) {
    switch (operator) {
      case 'plus':
        return this._add(leftOperand, rightOperand);
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

  _displayResult() {
    const value = this.operands.peek() || 0;
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
        operators: this.operators,
        operands: this.operands,
        lastInputType: this.lastInputType,
        lastAction: this.lastAction,
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
