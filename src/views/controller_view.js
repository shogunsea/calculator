'use strict';

/**
 * Controller View that listens for store's state update and renders the view.
 *
 * " After the stores are updated, they broadcast an event declaring that their
 * state has changed, so the views may query the new state and update
 * themselves."
 *
 * @class ControlelrView
 */

// import CalculatorStore from '../stores/calculator_store';

class ControlelrView {
  constructor() {
    this.resultContainer = window.document.querySelector('.display .result');
    // CalculatorStore.register(this);
  }

  render(action, value) {
    if (action === 'UPDATE_VIEW') {
      this.resultContainer.innerHTML = value;
    } else {
      // placeholder
    }
  }
}

// Is singleton necessary here? will brand new instance everytime work the same?
export default new ControlelrView();
