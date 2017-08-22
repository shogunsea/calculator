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

class Dispatcher {
  constructor() {
    // register call backs
    this.subscribers = {}; // TODO: use ES6 MAP
    this.seed = Math.random();
  }

  // handler here has been bound to its host object
  register(actionType, handler) {
    if (this.subscribers[actionType] === undefined) {
      this.subscribers[actionType] = [];
    }

    this.subscribers[actionType].push(handler);
  }

  dispatch({action, value}) {
    if (Object.keys(this.subscribers).length === 0) {
      return console.warn('No action:' + action + ' defined.');
    } else if (this.subscribers[action] === undefined) {
      return console.warn('No handler found for action:' + action + '.');
    }

    for (let handler of this.subscribers[action]) {
      handler(action, value);
    }
  }

  reset() {
    this.subscribers = {};
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
