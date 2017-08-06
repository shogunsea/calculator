'use strict';

import ActionTypes from './action_types';
import Dispatcher from '../dispatcher';

const dispatcher = Dispatcher.getInstance();

const Actions = {
  operandInput(value) {
    dispatcher.dispatch({
      type: ActionTypes.OPERAND_INPUT,
      value: value,
    })
  },
  operatorInput(value) {
    dispatcher.dispatch({
      type: ActionTypes.OPERATOR_INPUT,
      value: value,
    })
  },
  evaluate()  {
    dispatcher.dispatch({
      type: ActionTypes.EVALUATE,
    })
  },
  modify(value)  {
    dispatcher.dispatch({
      type: ActionTypes.MODIFY,
      value: value,
    })
  },
};

export default Actions;
