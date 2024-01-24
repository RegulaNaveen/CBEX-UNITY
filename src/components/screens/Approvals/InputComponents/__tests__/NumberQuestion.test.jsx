import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NumberQuestion from '../NumberQuestion';

describe('NumberQuestion', () => {
  const mockQuestion = {
    proposalId: '1',
    questionId: '2'
  };

  const mockLastAnswer = {
    answer: '3'
  };

  const mockUserData = {
    name: 'John Doe'
  };

  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };

  const mockTrackEventSubmitAnswer = jest.fn();

  const mockCheckDisableFlag = jest.fn(() => false);
  const mockStore = configureStore([]);
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <NumberQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    expect(component.exists()).toBe(true);
  });

  it('should check onfocus', () => {
    const component = mount(
      <Provider store={store}>
        <NumberQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    component.find('input').simulate('focus');
    component.find('input').simulate('blur');
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalled();
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalled();
  });
  it('should check answer is empty', () => {
    const mockLastAnswer = {
      answer: ''
    };
    const component = mount(
      <Provider store={store}>
        <NumberQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    component.find('input').simulate('focus');
    component.find('input').simulate('blur');
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalled();
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalled();
  });
});
