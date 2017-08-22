'use strict';

import Dispatcher from './index';

let instance = null;

describe('Dispatcher', () => {
  beforeEach(() => {
    instance = Dispatcher.getInstance();
  })

  afterEach(() => {
    instance = null;
  })

  test('is a singleton', () => {
    const instanceB = Dispatcher.getInstance();
    expect(instance.getSeed()).toBe(instanceB.getSeed());
  });

  describe('Instance attribtues', () => {
    test('.subscribers initially to be an object', () => { // or a map
      expect(instance.subscribers).toEqual({});
    });
  });

  describe('#register', () => {
    beforeEach(() => {
      instance.reset();
    });

    it('registers handlers to actionType', () => {
      const fooHandler = () => 'foo';
      instance.register('foo', fooHandler);
      expect(instance.subscribers.foo).toEqual([fooHandler]);
    });

    it('can register different handlers to same actionType', () => {
      const fooHandler = () => 'foo';
      const barhandler = () => 'bar';
      instance.register('foo', fooHandler);
      instance.register('foo', barhandler);
      expect(instance.subscribers.foo).toEqual([fooHandler, barhandler]);
    });

    it('can register different handlers to different actionTypes', () => {
      const fooHandler = () => 'foo';
      const barhandler = () => 'bar';
      instance.register('foo', fooHandler);
      instance.register('bar', barhandler);
      expect(instance.subscribers.foo).toEqual([fooHandler]);
      expect(instance.subscribers.bar).toEqual([barhandler]);
    })
  });

  describe('#dispatch', () => {
    beforeEach(() => {
      instance.reset();
      global.console = {
        warn: jest.fn(),
      }
    })
    test('warns if actionType has not been registered', () => {
      const dummyAction = {action: 'foo', value: 'bar'};
      instance.dispatch(dummyAction);
      const msg = 'No action:foo defined.'
      expect(console.warn).toBeCalledWith(msg);
    });

    test('warns if actionType does not have handler', () => {
      const barhandler = () => 'bar';
      instance.register('bar', barhandler);
      const dummyAction = {action: 'foo', value: 'bar'};
      instance.dispatch(dummyAction);
      const msg = 'No handler found for action:foo.'
      expect(console.warn).toBeCalledWith(msg);
    });

    xtest('calls all registered handlers with action and value', () => {
      expect(1).toBe(1);
    });
  });
});
