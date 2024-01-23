import React from 'react';
import ProposalTeamQuestion from '../ProposalTeamQuestion';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('ProposalTeamQuestion', () => {
  const mockQuestion = {
    questionId: 1,
    proposalId: 1,
    section: {
      sectionName: 'Section 1',
      sectionOrder: 1
    },
    reason: 'remove-option'
  };
  const mockLastAnswer = {
    answer: 'John Doe, jane@example.com'
  };
  const mockDisabled = false;
  const mockUserData = {};
  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const mockTrackEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn();
  const mockStore = configureStore([]);
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  it('should render component', () => {
    const component = mount(
      <Provider store={store}>
        <ProposalTeamQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          disabled={mockDisabled}
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
        <ProposalTeamQuestion
          question={mockQuestion}
          lastAnswer={''}
          disabled={mockDisabled}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    component.find('input').simulate('focus');
    component.find('input').simulate('blur');
    component.find('input').simulate('change');
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalled();
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalled();
  });
});
