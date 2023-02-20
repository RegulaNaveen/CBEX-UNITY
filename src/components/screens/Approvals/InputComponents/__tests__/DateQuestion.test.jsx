import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DateQuestion from '../DateQuestion';

describe('DateQuestion', () => {
  const question = {
    questionId: '1',
    proposalId: '2',
  };
  const lastAnswer = {
    answer: '2023-02-16',
  };
  const userData = {};
  const socketContext = {};
  const trackMatomoEventSubmitAnswer = jest.fn();
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
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('calls resetDate when reset button is clicked', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    const resetButton = wrapper.find('[resetDate="resetDate"]');
    resetButton.simulate('click');
    expect(trackMatomoEventSubmitAnswer).toHaveBeenCalledWith(' ');
  });

  it.skip('calls handleDayChange when date is selected', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={socketContext}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    const datePicker = wrapper.find('[data-test="date-picker"]');
    datePicker.simulate('dayChange', '2023-02-17', '2023-02-16');
    expect(trackMatomoEventSubmitAnswer).toHaveBeenCalledWith('2023-02-17');
  });

  it.skip('calls questionLockWrapper when input is focused', () => {
    const questionLockWrapper = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={{ questionLockWrapper }}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    const datePicker = wrapper.find('[data-test="date-picker"]');
    datePicker.simulate('focus');
    expect(questionLockWrapper).toHaveBeenCalledWith('1');
  });

  it.skip('calls questionUnlockWrapper when input is blurred', () => {
    const questionUnlockWrapper = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <DateQuestion
          question={question}
          lastAnswer={lastAnswer}
          userData={userData}
          socketContext={{ questionUnlockWrapper }}
          trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
          checkDisableFlag={checkDisableFlag}
        />
      </Provider>
    );
    const datePicker = wrapper.find('[data-test="date-picker"]');
    datePicker.simulate('blur');
    expect(questionUnlockWrapper).toHaveBeenCalledWith('1');
  });
});
