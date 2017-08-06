'use strict';

import Dispatcher from './index';

describe('Dispatcher', () => {
  test('is a singleton', () => {
    const instanceA = Dispatcher.getInstance();
    const instanceB = Dispatcher.getInstance();
    expect(instanceA.getSeed()).toBe(instanceB.getSeed());
  });

  describe('#subscribe', () => {
    it('can register handler to actionType', () => {
      expect(1).toBe(1);
    });

    it('can register different handlers to same actionType', () => {
      expect(1).toBe(1);
    });

    it('can register different handlers to different actionTypes', () => {
      expect(1).toBe(1);
    })
  });

  describe('#dispatch', () => {
    test('warns if actionType hasnt been registered', () => {
      expect(1).toBe(1);
    });

    test('warns if actionType doesnt have handler', () => {
      expect(1).toBe(1);
    });

    test('calls all registered handlers with action and value', () => {
      expect(1).toBe(1);
    });
  });
});
