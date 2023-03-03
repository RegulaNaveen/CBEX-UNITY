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
        { value: 'option3', label: 'Option 3' },
      ],
    },
    sfObject: 'Some_Object__c',
    sfField: 'Some_Field__c',
    proposalId: 'proposal123',
    questionId: 'question123',
  };
  const lastAnswer = {
    answer: ['option1'],
  };
  const disabled = false;
  const userData = {};
  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn(),
  };
  const trackMatomoEventSubmitAnswer = jest.fn();
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
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
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
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should call the changeHandler function when a checkbox is clicked', () => {
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
    wrapper
      .find('input[value="option2"]')
      .simulate('change', { target: { checked: true } });
    expect(socketContext.questionLockWrapper).toHaveBeenCalledWith(
      'question123'
    );
    expect(socketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      'question123'
    );
    expect(trackMatomoEventSubmitAnswer).toHaveBeenCalledWith([
      'option1',
      'option2',
    ]);
  });
});
