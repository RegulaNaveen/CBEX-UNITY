import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NumberQuestion from '../NumberQuestion';

describe('NumberQuestion', () => {
  const mockQuestion = {
    proposalId: '1',
    questionId: '2',
  };

  const mockLastAnswer = {
    answer: '3',
  };

  const mockUserData = {
    name: 'John Doe',
  };

  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn(),
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

  it.skip('calls the onFocus function when the text area is focused', () => {
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
    const mockEvent = { target: { value: '4' } };
    wrapper
      .find('[data-testid="proposal--text--area"]')
      .simulate('focus', mockEvent);
    expect(mockSocketContext.questionLockWrapper).toHaveBeenCalledWith('2');
  });

  //   it('calls the onBlur function when the text area loses focus', () => {
  //     const mockSetProposalAnswerData = jest.fn();
  //     const mockDispatch = jest.fn(action => {
  //       if (typeof action === 'function') {
  //         return action(mockDispatch);
  //       }
  //     });
  //     jest.mock('../../../../redux/actions/proposal-actions', () => ({
  //       setProposalAnswerData: mockSetProposalAnswerData,
  //     }));
  //     const wrapper = shallow(
  //       <NumberQuestion
  //         question={mockQuestion}
  //         lastAnswer={mockLastAnswer}
  //         userData={mockUserData}
  //         socketContext={mockSocketContext}
  //         trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
  //         checkDisableFlag={mockCheckDisableFlag}
  //       />
  //     );
  //     const mockEvent = { target: { value: '4' } };
  //     wrapper.find('.proposal-text-area').simulate('blur', mockEvent);
  //     expect(mockSetProposalAnswerData).toHaveBeenCalledWith(
  //       mockSocketContext,
  //       '1',
  //       '2',
  //       '4',
  //       mockUserData,
  //       undefined,
  //       true
  //     );
  //     expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledWith('2');
  //     expect(mockTrackMatomoEventSubmitAnswer).toHaveBeenCalledWith('4');
  //   });

  //   it('calls the onBlur function with a space character when the text area is emptied and there was a previous answer', () => {
  //     const mockSetProposalAnswerData = jest.fn();
  //     const mockDispatch = jest.fn(action => {
  //       if (typeof action === 'function') {
  //         return action(mockDispatch);
  //       }
  //     });
  //     jest.mock('../../../../redux/actions/proposal-actions', () => ({
  //       setProposalAnswerData: mockSetProposalAnswerData,
  //     }));
  //     const wrapper = shallow(
  //       <NumberQuestion
  //         question={mockQuestion}
  //         lastAnswer={{ answer: '4' }}
  //         userData={mockUserData}
  //         socketContext={mockSocket
});
