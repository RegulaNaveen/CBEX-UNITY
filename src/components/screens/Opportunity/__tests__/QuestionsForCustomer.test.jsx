/* eslint-disable no-unused-expressions */
import React from 'react';
import '@testing-library/jest-dom';
import { Map, OrderedMap } from 'immutable';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import proposalData from './mockdata/eventlauncher.json';
import MockState from './mockdata/indexQCT.json';
import Index from '../QuestionsForCustomerTab/index';
import * as proposalActions from '../../../../redux/actions/proposal-actions';

const initialState = {
  userData: MockState.userData,
  allFlags: MockState.allFlags,
  isCurrentBid: MockState.isCurrentBid,
  questionsList: MockState.questionsList,
  proposal: Map(Object.entries(proposalData.proposal)),
  selectedBid: Map(Object.entries(MockState.selectedBid)),
  sections: OrderedMap(Object.entries(MockState.sections)),
  deleteProposalQuestion: jest.fn(),
  setNewEntry: jest.fn()
};

const QuestionsForCustomer = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={{ 
        questionLockWrapper: jest.fn(), 
        questionUnlockWrapper: jest.fn() 
      }}>
        <Index {...initialState} />
      </SocketContext.Provider>
    </Provider>
  );
};

describe('test question for customer tab', () => {
  it('Render question for customer tab', () => {
    const { queryByTestId, getByText } = render(<QuestionsForCustomer />);
    expect(queryByTestId('question-customer-tab')).toBeInTheDocument();
    expect(getByText('No questions added to this opportunity')).toBeInTheDocument();
  });

  it('test for adding new question', () => {
    const mockReturnValue = {
      "proposalId": "be9414f5-c475-47ab-9eeb-dde1a1598d03",
      "questionText": " ",
      "questionJSON": "",
      "questionHTML": "",
      "section": {
          "sectionOrder": 199,
          "sectionName": "Questions_for_the_Customer_left_panel"
      },
      "answerType": "text",
      "options": [],
      "roleNames": [
          "Business Developer"
      ]
    };
    jest.spyOn(proposalActions, 'setProposalQuestion').mockReturnValue(mockReturnValue);
    const { getByText, debug } = render(<QuestionsForCustomer />);
    const addNewQues = getByText(/Add New/i);
    fireEvent.click(addNewQues);
    expect(addNewQues).toBeDisabled();
  });

  it('check for copy to clipboard', async () => {
    const { getByText } = render(
      <QuestionsForCustomer />
    );
    expect(getByText(/Copy to clipboard/i)).toBeInTheDocument();
    const clipboardButton = screen.getByRole('button', {
      name: 'Copy to clipboard'
    });
    expect(clipboardButton).toBeInTheDocument();

    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        copy: () => { }
      }
    });
    jest.spyOn(navigator.clipboard, 'copy');
    fireEvent.click(clipboardButton);
  });

  it('check for show delete modal', async () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.showDeleteModal, () => { }]);
    React.useState = setHookState({
      questions: new OrderedMap(),
      showDeleteModal: true,
      questionToDelete: { questionId: 'cd7a84bb-8a85-4e7d-9bf7-31f9a93c5276' }
    });
    const { getByTestId } = render(<QuestionsForCustomer />);
    const deleteModal = getByTestId('delete-modal');
    expect(deleteModal).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Yes, Delete' });
    await fireEvent.click(button);
  });
});
