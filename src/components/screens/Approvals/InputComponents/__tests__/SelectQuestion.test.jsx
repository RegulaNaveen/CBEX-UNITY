import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SelectQuestion from '../SelectQuestion';

describe('SelectQuestion', () => {
  let wrapper;
  let props;

  props = {
    question: {
      sfObject: 'Account',
      sfField: 'Industry',
      answerConfiguration: {
        options: [
          { label: 'Option 1', value: 'Option 1' },
          { label: 'Option 2', value: 'Option 2' }
        ]
      },
      questionId: 1,
      proposalId: 1
    },
    lastAnswer: {
      answer: 'Option 1'
    },
    disabled: false,
    userData: {},
    socketContext: {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    },
    trackEventSubmitAnswer: jest.fn(),
    checkDisableFlag: jest.fn(() => false)
  };

  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore(props);
  });
  it('should render component', () => {
    const component = mount(
      <Provider store={store}>
        <SelectQuestion {...props} />
      </Provider>
    );
    expect(component.exists()).toBe(true);
  });

  it('should check on focus', () => {
    const component = mount(
      <Provider store={store}>
        <SelectQuestion {...props} />
      </Provider>
    );
    component.find('textarea').first().simulate('focus');
    component.find('textarea').first().simulate('blur');
    component.find('textarea').first().simulate('change');
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalledTimes(0);
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledTimes(0);
  });
});
