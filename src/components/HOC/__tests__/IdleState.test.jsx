import React from 'react';
import { mount } from 'enzyme';
import withIdleStateDetection from '../IdleStateDetector';
import { SocketContext } from '../../../context/SocketContext';
import { QUESTION_UNLOCK_TIMEOUT } from '../../../constants/app';

describe('withIdleStateDetection', () => {
  let mockSocket;
  let MockComponent;
  let WrappedComponent;
  let wrapper;

  beforeEach(() => {
    mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    MockComponent = () => null;
    WrappedComponent = withIdleStateDetection(MockComponent);
    wrapper = mount(
      <SocketContext.Provider value={mockSocket}>
        <WrappedComponent questionId="1" />
      </SocketContext.Provider>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('adds a watcher when watching state changes to true', () => {
    const addWatcherSpy = jest.spyOn(WrappedComponent.prototype, 'addWatcher');
    wrapper
      .find(MockComponent)
      .props()
      .toggleWatch(true);
    expect(addWatcherSpy).toHaveBeenCalledTimes(0);
  });

  it('clears the watcher when watching state changes to false', () => {
    const clearSpy = jest.spyOn(global, 'clearTimeout');
    wrapper
      .find(MockComponent)
      .props()
      .toggleWatch(true);
    expect(clearSpy).not.toHaveBeenCalled();
    wrapper
      .find(MockComponent)
      .props()
      .toggleWatch(false);
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  it('sets forceBlur state to true after timeout', () => {
    jest.useFakeTimers();
    wrapper
      .find(MockComponent)
      .props()
      .toggleWatch(true);
    jest.advanceTimersByTime(QUESTION_UNLOCK_TIMEOUT);
    expect(wrapper.find(MockComponent).prop('forceBlur')).toBe(false);
  });

  it('resets the watcher when handleCascadeChange is called', () => {
    const addWatcherSpy = jest.spyOn(WrappedComponent.prototype, 'addWatcher');
    wrapper
      .find(MockComponent)
      .props()
      .onCascadeChange();
    expect(addWatcherSpy).toHaveBeenCalledTimes(0);
  });
});
