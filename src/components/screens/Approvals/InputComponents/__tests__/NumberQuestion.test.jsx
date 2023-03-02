import React from 'react';
import { shallow } from 'enzyme';
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

  const mockTrackMatomoEventSubmitAnswer = jest.fn();

  const mockCheckDisableFlag = jest.fn(() => false);
  const mockStore = configureStore([]);
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        {' '}
        <NumberQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
