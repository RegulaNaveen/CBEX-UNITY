/* eslint-disable no-unused-expressions */
import React from 'react';
import '@testing-library/jest-dom';
import { Map, OrderedMap } from 'immutable';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store'
import { SocketContext } from '../../../../context/SocketContext';
import proposalData from './mockdata/eventlauncher.json'
import MockState from './mockdata/indexQCT.json'
import Index from '../QuestionsForCustomerTab/index';

const initialState = {
  userData: MockState.userData,
  allFlags: MockState.allFlags,
  SocketContext: SocketContext,
  isCurrentBid: MockState.isCurrentBid,
  questionsList: MockState.questionsList,
  proposal: Map(Object.entries(proposalData.proposal)),
  selectedBid: Map(Object.entries(MockState.selectedBid)),
  sections: OrderedMap(Object.entries(MockState.sections)),
  deleteProposalQuestion: jest.fn(),
  setNewEntry: jest.fn()
};

const QuestionsForCustomer = () => {
  return(
    <Provider store={store}>
      <Index {...initialState} />
    </Provider>
  ) 
};

describe('test question for customer tab', () => {

  it('Render question for customer tab', () => {
    const setHookState = newState => jest.fn().mockImplementation(() => [newState, () => {}]);
    React.useState = setHookState({
      showDeleteModal: false,
      questionToDelete: null,
      showScroll: null,
      newEntry: null,
    })
    const { queryByTestId, getByText } = render(<QuestionsForCustomer />);
    expect(queryByTestId('question-customer-tab')).toBeInTheDocument(); 
  });

  it.skip('check for copy to clipboard', async() => {
    const setHookState = newState => jest.fn().mockImplementation(() => [newState.questions, () => {}]);
    React.useState = setHookState({
      questions: new OrderedMap(),
      howDeleteModal: false,
      questionToDelete: null,
      showScroll: null,
      newEntry: null,
    })
    const { getByText, container, getByTestId } = render(<QuestionsForCustomer />);
    expect(getByText(/Copy to clipboard/i)).toBeInTheDocument();
    const clipboardButton = screen.getByRole('button', { name: 'Copy to clipboard'});
    expect(clipboardButton).toBeInTheDocument();

    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        copy: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'copy');
    fireEvent.click(clipboardButton);

  })

  it('test for adding new question', async() => {
    const setHookState = newState => jest.fn().mockImplementation(() => [newState.questions, () => {}]);
    React.useState = setHookState({
      questions: new OrderedMap(),
      showDeleteModal: false,
      questionToDelete: null,
      showScroll: null,
      newEntry: null,
    })
    const { getByText } = render(<QuestionsForCustomer />);
    // expect(getByText(/Add New/i)).toBeInTheDocument();
    
    const addNewQues = getByText(/Add New/i);
    await fireEvent.click(addNewQues);
    expect(addNewQues).toBeInTheDocument();
  })

  it.skip('check for show delete modal', async() => {
    const setHookState = newState => jest.fn().mockImplementation(() => [newState.showDeleteModal, () => {}]);
    React.useState = setHookState({
      questions: new OrderedMap(),
      showDeleteModal: true,
      questionToDelete: { "questionId": "cd7a84bb-8a85-4e7d-9bf7-31f9a93c5276"},
    })
    const { queryByTestId } = render(<QuestionsForCustomer />);
    const deleteModal = queryByTestId('delete-modal');
    expect(deleteModal).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Yes, Delete'});
    await fireEvent.click(button);
    expect(screen.getByText(/Are you sure?/i)).not.toBeInTheDocument();  
  })
});
