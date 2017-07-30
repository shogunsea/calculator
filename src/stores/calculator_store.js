'use strict';

// store-like component: subscribe to events dispatcher emit

import ActionTypes from '../actions/action_types';
import ControllerView from '../views/controller_view';

/**
 *
 * @export
 * @class CalculatorStore
 */

 // TODO: use singleton pattern to avoid multiple instances been created

 // " a store registers itself with the dispatcher and provides it with a callback. " ---> Dependency Inversion or not.
class CalculatorStore {
  constructor() {
    this.view = [];
    this.valA = 0;
    this.valB = 0;
    this.result = 0;
    this.input = 0;
    this.operator = '';

    this.registerView(ControllerView);
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
    this.valA = value;
    this.displayResult(value);
  }

  receiveOperator(operator) {
    this.operator = operator;
  }

  registerView(viewInstance) {
    this.view.push(viewInstance);
  }

  displayResult(value) {
    for (let view of this.view) {
      view.render('UPDATE_VIEW', value);
    }
  }

  evaluate() {
    // call this.displayResult after evluation?
    this.displayResult(this.result);
  }
}

export default new CalculatorStore();
