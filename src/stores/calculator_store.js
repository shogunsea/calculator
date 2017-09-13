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
    this.operands = new Stack();
    this.operators = new Stack();
    this.lastInputType = '';
    this._displayResult(0);
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
    this._displayResult(this.result);
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
  // * Receiving operands should never trigger evaluation.
  _receiveOperand(value) {
    let currentValue = +value;

    if (this.lastInputType === 'operand' && this.operands.size() > 0) {
      const previousValue = this.operands.pop();
      currentValue = (previousValue * 10 + currentValue);
    }

    this.operands.push(currentValue);
    this.lastInputType = 'operand';
    this._displayResult(currentValue);
  }

  // * Receiving operators *MIGHT* trigger evaluation.
  _receiveOperator(currentOperator) {
    const previousOperator = this.operators.peek();
    const previousPlusMinus = isPlusMinus(previousOperator);
    const previousMultiplyDivide = isMultiplyDivide(previousOperator);
    const currentPlusMinus = isPlusMinus(currentOperator);
    const currentMultiplyDivide = isMultiplyDivide(currentOperator);

    // actions: [1, '+', 5, '*', 2, '='],
    // result: '11',
    if (previousPlusMinus) {
      if (currentPlusMinus) {
        // evaluate
        this._evaluate();
      } else if (currentMultiplyDivide) {
        // no action: only store
      }
    } else if (previousMultiplyDivide) {
      if (currentPlusMinus) {
        // evaluate
        this._evaluate();
      } else if (currentMultiplyDivide) {
        // evaluate
        this._evaluate();
      }
    }

    this.operators.push(currentOperator);
    this.lastInputType = 'operator';
  }

  _evaluate() {
    let leftOperand = 0;
    let rightOperand = 0;
    let operator = '';

    // *Start: Pre-process*
    // previous right operand is stored by default, but if new value coming in
    // and result is present, we don't need previous right operator
    if (this.lastInputType === 'operand' && this.result != null) {
      this.operands.shift();
    }
    // *End: Pre-process*

    // *Start: Collect value for operands and operators *
    if (this.operands.size() === 1) { // test case: 4 + =
      rightOperand = this.operands.peek(); // peek
      leftOperand = this.result == null? rightOperand : this.result;
    } else {
      rightOperand = this.operands.pop();
      leftOperand = this.operands.pop();
    }

    // always reserve rightOperand in case of continuous evaluation
    if (this.operands.isEmpty()) {
      this.operands.push(rightOperand);
    }

    if (this.operators.size() <= 1) {
      operator = this.operators.peek();
    } else {
      operator = this.operators.pop();
    }

    // *END: Collect value for operands and operators *

    this.lastInputType = 'operator';

    // Actual computation
    // while !terminationCondition
    //    compute
    // --> Loop twice max?
    this._compute(leftOperand, rightOperand, operator);
  }

  _compute(leftOperand, rightOperand, operator, unsetResult) {
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
