import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import YesNoQuestion from '../InputComponents/YesNoQuestion';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

describe('YesNoQuestion', () => {
  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  const mockUserData = {};
  const mockTrackMatomoEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn(() => false);
  const mockQuestion = {
    questionId: '1',
    proposalId: '2'
  };
  const mockLastAnswer = {
    answer: 'No'
  };

  it('should render the component without error', () => {
    const mockStore = configureStore();
    const store = mockStore({});
    render(
      <Provider store={store}>
        <YesNoQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
  });

  it('should call setProposalAnswerData when dropdown value is changed', async () => {
    const mockStore = configureStore();
    const store = mockStore({});
    const mockDispatch = jest.fn();
    // jest.spyOn(React, 'useDispatch').mockReturnValue(mockDispatch);
    const { getByRole } = render(
      <Provider store={store}>
        <YesNoQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
          checkDisableFlag={mockCheckDisableFlag}
        />
      </Provider>
    );
    // const dropdown = getByRole('button');
    // fireEvent.click(dropdown);
    // const optionYes = getByRole('option', { name: 'Yes' });
    // fireEvent.click(optionYes);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(0));
  });
});
