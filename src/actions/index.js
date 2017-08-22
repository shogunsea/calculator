'use strict';

import ActionTypes from './action_types';
import Dispatcher from '../dispatcher';

const dispatcher = Dispatcher.getInstance();

const Actions = {
  operandInput(value) {
    dispatcher.dispatch({
      action: ActionTypes.OPERAND_INPUT,
      value: value,
    })
  },
  operatorInput(value) {
    dispatcher.dispatch({
      action: ActionTypes.OPERATOR_INPUT,
      value: value,
    })
  },
  evaluate(value)  {
    dispatcher.dispatch({
      action: ActionTypes.EVALUATE,
      value: value,
    })
  },
  modify(value)  {
    dispatcher.dispatch({
      action: ActionTypes.MODIFY,
      value: value,
    })
  },
};

export default Actions;
