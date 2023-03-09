import React from 'react';
import { useDispatch } from 'react-redux';
import { shallow } from 'enzyme';
import AutoComplete from '../../../common/atoms/inputs/AutoComplete';
import ProposalTeamQuestion from '../InputComponents/ProposalTeamQuestion';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('ProposalTeamQuestion component', () => {
  let wrapper;
  const dispatchMock = jest.fn();
  const mockQuestion = {
    questionId: 1,
    section: {
      sectionName: 'Section 1',
      sectionOrder: 1
    }
  };
  const mockLastAnswer = {
    answer: 'user@example.com, user2@example.com'
  };
  const mockUserData = {
    id: 1,
    email: 'user@example.com'
  };
  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const mockTrackMatomoEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatchMock);
    wrapper = shallow(
      <ProposalTeamQuestion
        question={mockQuestion}
        lastAnswer={mockLastAnswer}
        userData={mockUserData}
        socketContext={mockSocketContext}
        trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
        checkDisableFlag={mockCheckDisableFlag}
      />
    );
  });

  it('should render an AutoComplete component', () => {
    expect(wrapper.find(AutoComplete)).toHaveLength(1);
  });

  it('should call questionLockWrapper on AutoComplete focus', () => {
    wrapper.find(AutoComplete).simulate('focus');
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalledWith(
      mockQuestion.questionId
    );
  });

  it('should call questionUnlockWrapper on AutoComplete blur', () => {
    wrapper.find(AutoComplete).simulate('blur');
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      mockQuestion.questionId
    );
  });

  it('should call setProposalAnswerData on AutoComplete change', () => {
    const mockTextValue =
      'user@example.com, user2@example.com, user3@example.com';
    const mockLastValue = 'user@example.com, user2@example.com';
    const mockReason = 'add-option';
    wrapper
      .find(AutoComplete)
      .simulate('change', mockTextValue, mockLastValue, mockReason);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      mockQuestion.questionId
    );
  });

  it('should call deleteProposalUserFromDB on remove-option change', () => {
    const mockTextValue = 'user@example.com';
    const mockLastValue = 'user@example.com, user2@example.com';
    const mockReason = 'remove-option';
    wrapper
      .find(AutoComplete)
      .simulate('change', mockTextValue, mockLastValue, mockReason);
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call trackMatomoEventSubmitAnswer on AutoComplete change', () => {
    const mockTextValue =
      'user@example.com, user2@example.com, user3@example.com';
    const mockLastValue = 'user@example.com, user2@example.com';
    const mockReason = 'add-option';
    wrapper
      .find(AutoComplete)
      .simulate('change', mockTextValue, mockLastValue, mockReason);
  });
});
