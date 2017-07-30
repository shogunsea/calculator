'use strict';

import ActionTypes from './action_types';
// Importing dispatcher here will create new instance of  dispatcher class
// wihch iniailizes all the store instances as well.
import Dispatcher from '../dispatcher';

const Actions = {
  operandInput(value) {
    Dispatcher.dispatch({
      type: ActionTypes.OPERAND_INPUT,
      value: value
    })
  },
  operatorInput(value) {
    Dispatcher.dispatch({
      type: ActionTypes.OPERATOR_INPUT,
      value: value
    })
  },
  evaluate()  {
    Dispatcher.dispatch({
      type: ActionTypes.EVALUATE
    })
  },
};

export default Actions;
