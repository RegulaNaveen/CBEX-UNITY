import React from 'react';
import { shallow } from 'enzyme';
import YesNoQuestion from '../YesNoQuestion';

describe('YesNoQuestion component', () => {
  let wrapper;
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
  const mockTrackMatomoEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <YesNoQuestion
        question={mockQuestion}
        lastAnswer={mockLastAnswer}
        userData={mockUserData}
        socketContext={mockSocketContext}
        trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
        checkDisableFlag={mockCheckDisableFlag}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
