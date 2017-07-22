'use strict';


// store-like component: subscribe to events dispatcher emit
export default class Calculator {
  constructor() {
    this.valA = 0;
    this.valB = 0;
    this.result = 0;
    this.input = 0;
    this.operator = '';
  }

  receiveAction(action) {
    if (action === 'something') {
      // process it
    }
  }

  add (valA, valB) {
    return valA + valB;
  }

  receiveOperand (value) {
    this.valA = value;
  }

  receiveOperator (operator) {

  }

  displayResult () {

  }

  evaluate () {
    return 1;
  }
}
