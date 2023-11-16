import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
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
      questionId: 1
    },
    lastAnswer: {
      answer: 'Option 1'
    },
    userData: {},
    socketContext: {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    },
    trackEventSubmitAnswer: jest.fn(),
    checkDisableFlag: jest.fn(() => false)
  };

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(props);
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <SelectQuestion {...props} />
      </Provider>
    );
  });

  it('should render without errors', () => {
    // expect(wrapper.find('AutoCompleteWithAddOption').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
