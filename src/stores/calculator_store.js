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
    this.valA = 0;
    this.valB = 0;
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
      default:
        break;
    }
  }

  add(valA, valB) {
    return valA + valB;
  }

  receiveOperand(value) {
    const intValue = +value;
    if (this.lastOperation === 'operand' || this.lastOperation === '') {
      this.valA = (this.valA * 10 + intValue);
    } else {
      this.valA = intValue;
    }

    this.lastOperation = 'operand';
    this.displayResult(this.valA);
  }

  receiveOperator(operator) {
    this.lastOperation = 'operator';
    this.operator = operator;
  }

  displayResult(value) {
    this.view.render('UPDATE_VIEW', value);
  }

  evaluate() {
    // call this.displayResult after evluation?
    this.displayResult(this.result);
  }
}

export default new CalculatorStore();
