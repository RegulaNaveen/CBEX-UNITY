import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProposalTeamQuestion from '../ProposalTeamQuestion';

const mockSocketContext = {
  questionLockWrapper: jest.fn(),
  questionUnlockWrapper: jest.fn(),
};

const mockQuestion = {
  questionId: 1,
  section: {
    sectionName: 'team',
    sectionOrder: 2,
  },
};

const mockLastAnswer = {
  answer: 'john@example.com, jane@example.com',
};

const mockUserData = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
};

const mockTrackMatomoEventSubmitAnswer = jest.fn();

const mockDeleteProposalUserFromDB = jest.fn();

const mockStore = configureStore()({
  proposal: {},
});

describe('ProposalTeamQuestion', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <ProposalTeamQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
        />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it.skip('handles answer change', async () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <ProposalTeamQuestion
          question={mockQuestion}
          lastAnswer={mockLastAnswer}
          userData={mockUserData}
          socketContext={mockSocketContext}
          trackMatomoEventSubmitAnswer={mockTrackMatomoEventSubmitAnswer}
          deleteProposalUserFromDB={mockDeleteProposalUserFromDB}
        />
      </Provider>
    );

    const input = getByTestId('proposal-team-section-id');
    fireEvent.change(input, {
      target: { value: 'jane@example.com, jake@example.com' },
    });

    await waitFor(() => {
      expect(mockSocketContext.questionLockWrapper).toHaveBeenCalledTimes(1);
      expect(mockSocketContext.questionUnlockWrapper).toHaveBeenCalledTimes(1);
      expect(mockTrackMatomoEventSubmitAnswer).toHaveBeenCalledTimes(1);
      expect(mockDeleteProposalUserFromDB).toHaveBeenCalledTimes(1);
      expect(mockDeleteProposalUserFromDB).toHaveBeenCalledWith(
        mockQuestion.section.sectionOrder,
        mockQuestion.section.sectionName,
        mockUserData,
        mockLastAnswer.answer.split(',')[0]
      );
    });
  });
});
