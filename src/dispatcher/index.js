'use strict';

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
    // this.initSubscription();
    this.seed = Math.random();
  }

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

  getSeed() {
    // same instance should have same seed value
    return this.seed;
  }
}

let instance = null;

const getInstance = () => {
  return instance === null? instance = new Dispatcher() : instance;
}

export default {getInstance};
