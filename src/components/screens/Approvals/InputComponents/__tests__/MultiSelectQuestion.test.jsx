import React from 'react';
import { shallow } from 'enzyme';
import { Provider, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AutoCompleteWithAddOption from '../../../../views/modals/AutoCompleteWithAddOption';
import MultiSelectQuestion from '../MultiSelectQuestion';

const props = {
  question: {
    answerConfiguration: {
      type: 'multi-select',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    sfObject: 'Object',
    sfField: 'Field',
    questionId: 1,
  },
  lastAnswer: { answer: [] },
  disabled: false,
  userData: {},
  socketContext: {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn(),
  },
  trackMatomoEventSubmitAnswer: jest.fn(),
  checkDisableFlag: jest.fn(),
};

// useDispatch.mockReturnValue(jest.fn());
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(props);
describe.skip('MultiSelectQuestion', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AutoCompleteWithAddOption component with correct props', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MultiSelectQuestion {...props} />
      </Provider>
    );
    const autoComplete = wrapper.find(AutoCompleteWithAddOption);

    expect(autoComplete).toHaveLength(1);
    expect(autoComplete.prop('sfObject')).toEqual(props.question.sfObject);
    expect(autoComplete.prop('sfField')).toEqual(props.question.sfField);
    expect(autoComplete.prop('lov')).toEqual(
      props.question.answerConfiguration.options
    );
    expect(autoComplete.prop('disabled')).toEqual(false);
    expect(autoComplete.prop('multiple')).toEqual(true);
    expect(autoComplete.prop('answer')).toEqual(props.lastAnswer.answer);
  });

  it('calls questionLockWrapper on focus and questionUnlockWrapper on blur', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MultiSelectQuestion {...props} />
      </Provider>
    );
    const autoComplete = wrapper.find(AutoCompleteWithAddOption);

    autoComplete.simulate('focus');
    expect(props.socketContext.questionLockWrapper).toHaveBeenCalledWith(
      props.question.questionId
    );

    autoComplete.simulate('blur');
    expect(props.socketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      props.question.questionId
    );
  });

  it('calls setProposalAnswerData and trackMatomoEventSubmitAnswer on change', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MultiSelectQuestion {...props} />
      </Provider>
    );
    const autoComplete = wrapper.find(AutoCompleteWithAddOption);

    await autoComplete.prop('onChange')(['Option 1', 'Option 2']);

    expect(useDispatch).toHaveBeenCalled();
    expect(props.socketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      props.question.questionId
    );
    expect(props.trackMatomoEventSubmitAnswer).toHaveBeenCalledWith([
      'Option 1',
      'Option 2',
    ]);
  });

  it('handles error by rendering error message', () => {
    const consoleError = console.error;
    console.error = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <MultiSelectQuestion {...props} />
      </Provider>
    );
    wrapper.setState({ hasError: true });
    expect(
      wrapper.contains(<p>Error rendering Multi select question</p>)
    ).toEqual(true);
    console.error = consoleError;
  });
});
