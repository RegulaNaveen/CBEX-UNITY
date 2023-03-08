import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CheckBoxQuestion from '../InputComponents/CheckBoxQuestion';

import {
  getCountriesNameForCode,
  getCountryOptions
} from '../../../../utils/utils';
import ANSWER_TYPES from '../../../../constants/answerTypes';

const mockStore = configureMockStore([thunk]);

describe('CheckBoxQuestion', () => {
  let question,
    lastAnswer,
    userData,
    socketContext,
    trackMatomoEventSubmitAnswer,
    checkDisableFlag,
    store;

  beforeEach(() => {
    question = {
      questionId: '1234',
      answerConfiguration: {
        type: ANSWER_TYPES.PICKLIST,
        options: ['option1', 'option2']
      },
      sfObject: 'Object__c',
      sfField: 'Field__c'
    };
    lastAnswer = { answer: [] };
    userData = { userId: '123' };
    socketContext = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    trackMatomoEventSubmitAnswer = jest.fn();
    checkDisableFlag = jest.fn();
    store = mockStore({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
  });

  it('calls questionLockWrapper when CheckBoxQuestions opens', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );

    wrapper.find('CheckBoxQuestions').prop('onOpen')();
    expect(socketContext.questionLockWrapper).toHaveBeenCalledWith('1234');
  });

  it('calls questionUnlockWrapper when CheckBoxQuestions closes', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );

    wrapper.find('CheckBoxQuestions').prop('onClose')();
    expect(socketContext.questionUnlockWrapper).toHaveBeenCalledWith('1234');
  });

  it('calls setProposalAnswerData when answer is changed', async () => {
    const proposalId = '5678';
    question.proposalId = proposalId;
    const wrapper = mount(
      <Provider store={store}>
        <CheckBoxQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
  });
});
