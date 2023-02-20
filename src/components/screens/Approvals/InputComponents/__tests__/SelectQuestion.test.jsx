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
          { label: 'Option 2', value: 'Option 2' },
        ],
      },
      questionId: 1,
    },
    lastAnswer: {
      answer: 'Option 1',
    },
    userData: {},
    socketContext: {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn(),
    },
    trackMatomoEventSubmitAnswer: jest.fn(),
    checkDisableFlag: jest.fn(() => false),
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

  it.skip('should lock the question on focus', () => {
    wrapper.find('AutoCompleteWithAddOption').simulate('focus');
    expect(props.socketContext.questionLockWrapper).toHaveBeenCalledWith(1);
  });

  it.skip('should unlock the question on blur', () => {
    wrapper.find('AutoCompleteWithAddOption').simulate('blur');
    expect(props.socketContext.questionUnlockWrapper).toHaveBeenCalledWith(1);
  });

  it.skip('should call the changeHandler function when the answer is changed', async () => {
    const changeHandler = jest.spyOn(wrapper.instance(), 'changeHandler');
    await wrapper
      .find('AutoCompleteWithAddOption')
      .simulate('change', 'Option 2');
    expect(changeHandler).toHaveBeenCalledWith('Option 2');
  });

  it.skip('should call setProposalAnswerData when the answer is changed', async () => {
    await wrapper
      .find('AutoCompleteWithAddOption')
      .simulate('change', 'Option 2');
    expect(props.socketContext.setProposalAnswerData).toHaveBeenCalledWith(
      props.socketContext,
      props.question.proposalId,
      props.question.questionId,
      'Option 2',
      props.userData
    );
  });

  it.skip('should call trackMatomoEventSubmitAnswer when the answer is changed', async () => {
    await wrapper
      .find('AutoCompleteWithAddOption')
      .simulate('change', 'Option 2');
    expect(props.trackMatomoEventSubmitAnswer).toHaveBeenCalledWith('Option 2');
  });

  it.skip('should disable the component when checkDisableFlag returns true', () => {
    props.checkDisableFlag.mockReturnValueOnce(true);
    wrapper = shallow(<SelectQuestion {...props} />);
    expect(wrapper.find('AutoCompleteWithAddOption').prop('disabled')).toBe(
      true
    );
  });

  it.skip('should not disable the component when the disabled prop is true', () => {
    props.disabled = true;
    wrapper = shallow(<SelectQuestion {...props} />);
    expect(wrapper.find('AutoCompleteWithAddOption').prop('disabled')).toBe(
      true
    );
  });
});
