import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import SelectQuestion from '../InputComponents/SelectQuestion';

describe('SelectQuestion', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  const props = {
    question: {
      proposalId: '1',
      questionId: '2',
      sfObject: 'Account',
      sfField: 'Name',
      answerConfiguration: {
        options: [
          { label: 'Option 1', value: 'Option 1' },
          { label: 'Option 2', value: 'Option 2' },
          { label: 'Option 3', value: 'Option 3' }
        ]
      }
    },
    lastAnswer: {
      answer: ''
    },
    disabled: false,
    userData: {},
    socketContext: {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    },
    trackMatomoEventSubmitAnswer: jest.fn(),
    checkDisableFlag: jest.fn(() => false)
  };

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <SelectQuestion {...props} />
      </Provider>
    );
  });
});
