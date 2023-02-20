import React from 'react';
import { shallow } from 'enzyme';
import YesNoQuestion from '../YesNoQuestion';

describe('YesNoQuestion component', () => {
  let wrapper;
  const mockQuestion = {
    questionId: 1,
    questionText: 'Do you like pizza?',
  };
  const mockLastAnswer = {
    answer: 'Yes',
  };
  const mockUserData = {
    userId: 1,
  };
  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn(),
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

  it.skip('renders the YNDropdown component with the correct props', () => {
    const dropdown = wrapper.find('YNDropdown');
    // expect(dropdown).toHaveLength(1);
    expect(dropdown.prop('items')).toEqual(['Yes', 'No']);
    expect(dropdown.prop('disabled')).toEqual(false);
    expect(dropdown.prop('questionId')).toEqual(mockQuestion.questionId);
    expect(dropdown.prop('value')).toEqual(mockLastAnswer.answer);
  });

  it.skip('calls the changeHandler function when the YNDropdown is clicked', () => {
    const dropdown = wrapper.find('YNDropdown');
    dropdown.prop('onClick')('No');
    expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      mockQuestion.questionId
    );
    expect(mockTrackMatomoEventSubmitAnswer).toHaveBeenCalledWith('No');
  });

  it.skip('disables the YNDropdown when disabled prop is true', () => {
    wrapper.setProps({ disabled: true });
    const dropdown = wrapper.find('YNDropdown');
    expect(dropdown.prop('disabled')).toEqual(true);
  });

  it.skip('disables the YNDropdown when checkDisableFlag function returns true', () => {
    mockCheckDisableFlag.mockReturnValue(true);
    const dropdown = wrapper.find('YNDropdown');
    expect(dropdown.prop('disabled')).toEqual(true);
  });
});
