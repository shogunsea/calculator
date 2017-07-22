'use strict';

// import all stores
const calculator = new require('./calculator');

export default class Dispatcher {
  constructor() {
    // register call backs
    this.subscribers = [calculator];
  }

  receiveViewAction() {
  }

  dispatchAction(action) {
    for (let subscriber of this.subscribters) {
      subscriber.receiveAction(action)
    }
  }

  receiveModelAction() {
  }

  updateView() {
  }
}
