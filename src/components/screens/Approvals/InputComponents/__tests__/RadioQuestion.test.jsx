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
    options: ['Yes', 'No']
  }
};
const lastAnswer = {
  answer: 'Yes'
};
const userData = {
  id: 1,
  name: 'John Doe'
};
const socketContext = {
  questionLockWrapper: jest.fn(),
  questionUnlockWrapper: jest.fn()
};
const trackMatomoEventSubmitAnswer = jest.fn();
const checkDisableFlag = jest.fn();

const initState = {
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag
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
});
