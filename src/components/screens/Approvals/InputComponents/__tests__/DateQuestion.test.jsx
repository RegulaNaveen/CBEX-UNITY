import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DateQuestion from '../DateQuestion';

describe('DateQuestion', () => {
  const question = {
    questionId: '1',
    proposalId: '2'
  };
  const lastAnswer = {
    answer: '2023-02-16'
  };
  const userData = {};
  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const trackEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn(() => false);
  const toggleWatch = jest.fn();
  const onCascadeChange = jest.fn();
  const forceBlur = jest.fn();
  const mockStore = configureStore([]);
  const questionLockWrapper = jest.fn();
  const questionUnlockWrapper = jest.fn();
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('calls resetDate function when reset button is clicked', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </Provider>
    );

    const resetButton = wrapper.find('QuestionDatePicker').prop('resetDate');
    await resetButton();
    expect(questionLockWrapper).toHaveBeenCalledTimes(0);
  });

  it('calls handleDayChange function when day is changed', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </Provider>
    );
    const handleDayChange = wrapper
      .find('QuestionDatePicker')
      .prop('handleDayChange');
    await handleDayChange('2023-02-17', '2023-02-16');
    expect(questionLockWrapper).toHaveBeenCalledTimes(0);
  });

  it('calls handleFocus function when input is focused', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </Provider>
    );
    const handleFocus = wrapper.find('QuestionDatePicker').prop('onFocus');
    handleFocus();
    expect(questionLockWrapper).toHaveBeenCalledTimes(0);
  });

  it('calls handleBlur function when input is blurred', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackEventSubmitAnswer={trackEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </Provider>
    );
    const handleBlur = wrapper.find('QuestionDatePicker').prop('onBlur');
    handleBlur();
    expect(questionUnlockWrapper).toHaveBeenCalledTimes(0);
  });
});
