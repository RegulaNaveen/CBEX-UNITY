import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TextQuestion from '../InputComponents/TextQuestion';
import { first } from 'lib0/set';

describe('TextQuestion', () => {
  let wrapper;

  const question = { questionId: 1, text: 'What is your name?' };
  const lastAnswer = { answer: 'John' };
  const userData = { id: 1, name: 'Test User' };
  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const trackEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn().mockReturnValue(false);
  const initState = {
    question,
    lastAnswer,
    userData,
    socketContext,
    trackEventSubmitAnswer,
    checkDisableFlag
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initState);

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <TextQuestion {...initState} />
      </Provider>
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(
      wrapper
        .find('.approval-text-question')
        .first()
        .simulate('blur')
    );
  });
});
