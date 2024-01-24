import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CheckBoxQuestion from '../CheckBoxQuestion';

describe('CheckBoxQuestion', () => {
  const question = {
    answerConfiguration: {
      type: 'CHECKBOX',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    },
    sfObject: 'Bid_History__c',
    sfField: 'Targeted_Countries__c',
    proposalId: 'proposal123',
    questionId: 'question123'
  };
  const lastAnswer = {
    answer: ['option1']
  };
  const disabled = false;
  const userData = {};
  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const trackEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn().mockReturnValue(false);

  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should render correctly with default props', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly with disabled prop', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={true}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should check answer type as picklist', () => {
    const newQuestion = {
      answerConfiguration: {
        type: 'picklist',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      },
      sfObject: 'Apttus__APTS_Agreement__c',
      sfField: 'Targeted_Countries__c',
      proposalId: 'proposal123',
      questionId: 'question123'
    };
    const lastAnswer = {
      answer: ''
    };
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={newQuestion}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
