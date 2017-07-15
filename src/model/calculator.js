'use strict';

const Calculator = function() {
  this.valA = 0;
  this.valB = 0;
  this.result = 0;
  this.input = 0;
  this.operator = '';
};

Calculator.prototype.add = function(valA, valB) {
  return valA + valB;
};

Calculator.prototype.receiveOperand = function(value) {
  this.valA = value;
};

Calculator.prototype.receiveOperator = function(operator) {

};

Calculator.prototype.displayResult = function() {

};

// Calculator.prototype.evaluate = function() {

// }

module.exports = Calculator;

// export default class Calculator {
//   constructor() {

//   }

//   yolo() {
//     return 1;
//   }
// }
