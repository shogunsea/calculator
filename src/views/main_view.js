'use strict';

import Actions from '../actions';
// Hook up controller view with main view here?
// controllerView emit a change to broadcast to mainview?
// right now this is just for initilization
// import ControllerView from './controller_view';

/**
 * The main app view
 * Spec:
 * 1. bind js object to DOM elements.
 * 2. listens for user interactions
 * 3. create actions objects and emit
 *
 * @export
 * @class View
 */

export default class MainView {
  constructor(container, config) {
    const {buttonIDs} = config;
    this.container = container;
    this.elems = [];

    buttonIDs.forEach((buttonID) =>  {
      const buttonName = buttonID.replace('button_', '');
      this.elems.push(container.querySelector(`#${buttonID}`));
    });
  }

  createAction(type, value = 0) {
    switch(type) {
      case 'OPERAND_INPUT' :
        return Actions.operandInput(value);
      case 'OPERATOR_INPUT' :
        return Actions.operatorInput(value);
      case 'EVALUATE':
        return Actions.evaluate();
      case 'MODIFY':
        return Actions.modify(value);
      default:
       return;
    }
  }

  init() {
    this.elems.forEach((element) => {
      const isModifier = element.classList.contains('modify');
      const isEvaluate = element.classList.contains('evaluate');
      const isOperand = element.classList.contains('operand');
      const isOperator = element.classList.contains('operator');
      const value = element.dataset.value;

      element.addEventListener('click', (e) => {
        if (isModifier) {
          this.createAction('MODIFY', value);
        } else if (isEvaluate) {
          this.createAction('EVALUATE', value);
        } else if (isOperand) {
          this.createAction('OPERAND_INPUT', value);
        } else if (isOperator) {
          this.createAction('OPERATOR_INPUT', value);
        } else {
          console.warn('No Action detected.');
        }
      });
    });
  }
}
