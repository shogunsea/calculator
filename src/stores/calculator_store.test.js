'use strict';

import CalculatorStore from './calculator_store';
import Dispatcher from '../dispatcher';
import ControllerView from '../views/controller_view';
import ActionTypes from '../actions/action_types';

describe('Calculator store', () => {
  describe('instance attributes', () => {
    test('.dispatcher to be Dispatcher instance', () => {
      expect(CalculatorStore.dispatcher).toBe(Dispatcher.getInstance());
    });

    test('.view to be ControllerView', () => {
      expect(CalculatorStore.view).toBe(ControllerView);
    });

    test('.currentValue and .lastValue to be null', () => {
      expect(CalculatorStore.currentValue).toBe(null);
      expect(CalculatorStore.lastValue).toBe(null);
    });

    test('.result to be 0', () => {
      expect(CalculatorStore.result).toBe(0);
    });

    test('.currentOperator to be empty', () => {
      expect(CalculatorStore.currentOperator).toBe('');
    });

    test('.lastInputType to be empty', () => {
      expect(CalculatorStore.lastInputType).toBe('');
    });
  });

  describe('#reduce', () => {
    beforeAll(() => {
      CalculatorStore._receiveOperand = jest.fn();
      CalculatorStore._receiveOperator = jest.fn();
      CalculatorStore._evaluate = jest.fn();
      CalculatorStore._displayResult = jest.fn();
      CalculatorStore._modifyResult = jest.fn();
    });

    describe('ActionTypes.OPERAND_INPUT', () => {
      test('calls _receiveOperand', () => {
        const testValue = Math.random();
        CalculatorStore.reduce(ActionTypes.OPERAND_INPUT, testValue);

        expect(CalculatorStore._receiveOperand.mock.calls.length).toBe(1);
        expect(CalculatorStore._receiveOperand.mock.calls[0][0]).toBe(testValue);
      });
    });

    describe('ActionTypes.OPERATOR_INPUT', () => {
      test('calls _receiveOperator', () => {
        const testValue = Math.random();
        CalculatorStore.reduce(ActionTypes.OPERATOR_INPUT, testValue);

        expect(CalculatorStore._receiveOperator.mock.calls.length).toBe(1);
        expect(CalculatorStore._receiveOperator.mock.calls[0][0]).toBe(testValue);
      });
    });

    describe('ActionTypes.EVALUATE', () => {
      test('calls _evaluate', () => {
        const testValue = undefined;
        CalculatorStore.reduce(ActionTypes.EVALUATE, testValue);

        expect(CalculatorStore._evaluate.mock.calls.length).toBe(1);
        expect(CalculatorStore._evaluate.mock.calls[0][0]).toBe(testValue);
      });
    });

    describe('ActionTypes.DISPLAY_RESULT', () => {
      test('calls _displayResult', () => {
        const testValue = undefined;
        CalculatorStore.reduce(ActionTypes.DISPLAY_RESULT, testValue);

        expect(CalculatorStore._displayResult.mock.calls.length).toBe(1);
        expect(CalculatorStore._displayResult.mock.calls[0][0]).toBe(testValue);
      });
    });

    describe('ActionTypes.MODIFY', () => {
      test('calls _modifyResult', () => {
        const testValue = Math.random();
        CalculatorStore.reduce(ActionTypes.MODIFY, testValue);

        expect(CalculatorStore._modifyResult.mock.calls.length).toBe(1);
        expect(CalculatorStore._modifyResult.mock.calls[0][0]).toBe(testValue);
      });
    });
  });
});
