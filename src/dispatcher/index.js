'use strict';

// import all stores here
// why use .default here? https://github.com/webpack/webpack/issues/706
const calculatorStore = require('../stores/calculator_store').default;
/**
 * The core dispatcher, essentially an EventEmitter
 * Spec:
 * 1. dispatch: emit(id, value)
 * 2. register/subscribe: addEventListner(id, cb)
 * 3. unsub: removeListener(id,) [optional]
 *
 * @export
 * @class Dispatcher
 */

// TODO: use singleton pattern to avoid multiple instances been created
class Dispatcher {
  constructor() {
    // register call backs
    this.subscribers = {}; // TODO: use ES6 MAP
    this.initSubscription();
  }

  // TODO: add 2nd stores to test out the unidirectional flow.
  initSubscription() {
    this.subscribe('OPERAND_INPUT', calculatorStore.reduce.bind(calculatorStore));
    this.subscribe('OPERATOR_INPUT', calculatorStore.reduce.bind(calculatorStore));
    this.subscribe('EVALUATE', calculatorStore.reduce.bind(calculatorStore));
    this.subscribe('DISPLAY_RESULT', calculatorStore.reduce.bind(calculatorStore));
  }

  // addEventListener
  // handler here has been bound to its host object
  subscribe(actionType, handler) {
    if (this.subscribers[actionType] === undefined) {
      this.subscribers[actionType] = [];
    }

    this.subscribers[actionType].push(handler);
  }

  dispatch({type: action, value}) {
    if (this.subscribers[action] === undefined) {
      console.warn('No action:' + action + ' defined.');
    } else if (this.subscribers[action].length === 0) {
      console.warn('No handler found for action:' + action + '.');
    }

    for (let handler of this.subscribers[action]) {
      handler(action, value);
    }
  }
}

export default new Dispatcher();
