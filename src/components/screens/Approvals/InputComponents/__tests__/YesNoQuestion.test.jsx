import React from 'react';
import { mount } from 'enzyme';
import YesNoQuestion from '../YesNoQuestion';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('YesNoQuestion component', () => {
  const mockQuestion = {
    questionId: 1,
    questionText: 'Do you like pizza?'
  };
  const mockLastAnswer = {
    answer: 'Yes'
  };
  const mockUserData = {
    userId: 1
  };
  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const mockTrackEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn();
  let store;
  const mockStore = configureStore([]);
  beforeEach(() => {
    store = mockStore({});
  });
  it('renders without crashing', () => {
    const component = mount(
      <Provider store={store}>
        <YesNoQuestion
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
  it('should check mount', () => {
    mount(
      <YesNoQuestion
        question={mockQuestion}
        lastAnswer={mockLastAnswer}
        userData={mockUserData}
        socketContext={mockSocketContext}
        trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
        checkDisableFlag={mockCheckDisableFlag}
      />
    );
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalledTimes(0);
  });
});
