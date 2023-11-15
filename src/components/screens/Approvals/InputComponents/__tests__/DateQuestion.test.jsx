import React from 'react';
import { shallow, mount } from 'enzyme';
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
  const socketContext = {};
  const trackEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn(() => false);
  const mockStore = configureStore([]);
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
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
