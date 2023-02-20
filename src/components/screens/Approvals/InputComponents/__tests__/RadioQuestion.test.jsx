import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RadioQuestionInput from '../RadioQuestion';
import RadioQuestion from '../../../../common/atoms/inputs/RadioQuestion';
import { setProposalAnswerData } from '../../../../../redux/actions/proposal-actions';

const question = {
  questionId: 1,
  answerConfiguration: {
    options: ['Yes', 'No'],
  },
};
const lastAnswer = {
  answer: 'Yes',
};
const userData = {
  id: 1,
  name: 'John Doe',
};
const socketContext = {
  questionLockWrapper: jest.fn(),
  questionUnlockWrapper: jest.fn(),
};
const trackMatomoEventSubmitAnswer = jest.fn();
const checkDisableFlag = jest.fn();

const initState = {
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);
describe('<RadioQuestionInput />', () => {
  it('should render without throwing an error', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <RadioQuestionInput {...initState} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it.skip('should call dispatch when the answer changes', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <RadioQuestionInput
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    wrapper.instance().changeHandler('No', 'Yes');
    expect(dispatch).toHaveBeenCalledWith(
      setProposalAnswerData(socketContext, question.questionId, 'No', userData)
    );
  });

  it.skip('should call questionLockWrapper when the input is focused', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <RadioQuestionInput
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    wrapper.find(RadioQuestion).simulate('focus');
    expect(socketContext.questionLockWrapper).toHaveBeenCalledWith(
      question.questionId
    );
  });

  it.skip('should call questionUnlockWrapper when the input is blurred', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <RadioQuestionInput
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    wrapper.find(RadioQuestion).simulate('blur');
    expect(socketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      question.questionId
    );
  });
});
