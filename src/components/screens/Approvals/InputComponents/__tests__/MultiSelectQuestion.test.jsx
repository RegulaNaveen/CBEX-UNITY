import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MultiSelectQuestion from '../MultiSelectQuestion';

describe('MultiSelectQuestion', () => {
  const question = {
    questionId: '1',
    proposalId: '2',
    answerConfiguration: {
      type: 'PICKLIST',
      options: ['Option 1', 'Option 2', 'Option 3']
    },
    sfObject: 'Object',
    sfField: 'Field'
  };
  const lastAnswer = {
    answer: ['Option 1']
  };
  const disabled = false;
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
        <MultiSelectQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={disabled}
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

  it('calls changeHandler function when value is changed', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiSelectQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={disabled}
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

    const changeHandler = wrapper
      .find('AutoCompleteWithAddOption')
      .prop('onChange');
    await changeHandler(['Option 1', 'Option 2']);
  });

  it('calls questionLockWrapper function when input is focused', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiSelectQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={disabled}
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

    const onFocus = wrapper.find('AutoCompleteWithAddOption').prop('onFocus');
    onFocus();
  });

  it('calls questionUnlockWrapper function when input is blurred', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiSelectQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={disabled}
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

    const onBlur = wrapper.find('AutoCompleteWithAddOption').prop('onBlur');
    onBlur();
  });
});
