import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import NumberQuestion from '../InputComponents/NumberQuestion';
import TextArea from '../../../common/atoms/inputs/TextArea';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

jest.mock('../../../../redux/actions/proposal-actions', () => ({
  setProposalAnswerData: jest.fn()
}));

describe('NumberQuestion', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  let wrapper;
  const question = { proposalId: '1', questionId: '2' };
  const lastAnswer = { answer: '3' };
  const disabled = false;
  const userData = {};
  const socketContext = {};
  const trackMatomoEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn(() => false);

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <NumberQuestion
          question={question}
          lastAnswer={lastAnswer}
          disabled={disabled}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch setProposalAnswerData action when text value is not empty and has changed', async () => {
    const instance = wrapper.instance();
    const textValue = '5';
    await instance?.handleTextChange(textValue, lastAnswer.answer);
  });

  it('should not dispatch setProposalAnswerData action when text value is empty', async () => {
    const instance = wrapper.instance();
    const textValue = '';
    await instance?.handleTextChange(textValue, lastAnswer.answer);
    expect(setProposalAnswerData).not.toHaveBeenCalled();
  });

  it('should not dispatch setProposalAnswerData action when text value is the same as the last answer', async () => {
    const instance = wrapper.instance();
    const textValue = lastAnswer.answer;
    await instance?.handleTextChange(textValue, lastAnswer.answer);
    expect(setProposalAnswerData).not.toHaveBeenCalled();
  });
});
