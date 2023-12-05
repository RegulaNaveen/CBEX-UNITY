/* eslint-disable no-unused-expressions */
import React from 'react';
import '@testing-library/jest-dom';
import { Map } from 'immutable';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SocketContext } from '../../../../../context/SocketContext';
import MockState from '../mockdata/indexQCT.json';
import Index from '../../QuestionsForCustomerTab/index';
import * as ProposalActions from '../../../../../redux/actions/proposal-actions';

const initialState = {
  proposal: Map({
    eventflag: MockState.allFlags,
    selectedBid: Map(MockState.selectedBid),
    proposalQuestions: MockState.proposalQuestions
  }),
  search: { query: null }
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);
const QuestionsForCustomer = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider
        value={{
          questionLockWrapper: jest.fn(),
          questionUnlockWrapper: jest.fn()
        }}
      >
        <Index />
      </SocketContext.Provider>
    </Provider>
  );
};

describe('test question for customer tab', () => {
  jest.spyOn(ProposalActions, 'setProposalQuestion').mockResolvedValue({});
  jest.spyOn(ProposalActions, 'deleteProposalQuestion').mockResolvedValue({
    message: 'Successfully deleted da23d5a3-912c-438c-ba3f-0b7a97b7cae8'
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  xit('Render question for customer tab', () => {
    const { queryByTestId, getByText } = render(<QuestionsForCustomer />);
    expect(queryByTestId('question-customer-tab')).toBeInTheDocument();
    expect(
      getByText('No questions added to this opportunity')
    ).toBeInTheDocument();
  });

  it('test for adding new question', () => {
    const { getByText } = render(<QuestionsForCustomer />);
    const addNewQues = getByText(/Add New/i);
    fireEvent.keyDown(addNewQues, { key: 'Enter', code: 'Enter' });
  });

  it('check for copy to clipboard', () => {
    const { getByText } = render(<QuestionsForCustomer />);
    expect(getByText(/Copy to clipboard/i)).toBeInTheDocument();
    const clipboardButton = screen.getByRole('button', {
      name: 'Copy to clipboard'
    });
    expect(clipboardButton).toBeInTheDocument();

    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        copy: () => {},
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'copy');
    fireEvent.click(clipboardButton);
  });

  it('check for question and answer input', () => {
    render(<QuestionsForCustomer />);
    const questionInput = screen.getAllByText('test quick thrrjjjjj');
    fireEvent.focus(questionInput[0]);
    fireEvent.paste(questionInput[0], {
      clipboardData: {
        getData: () => 'test question input'
      }
    });
    fireEvent.blur(questionInput[0]);
    //expect(screen.getByText('test question input')).toBeInTheDocument();

    const answerInput = screen.getAllByText('test answer one');
    fireEvent.focus(answerInput[0]);
    fireEvent.paste(answerInput[0], {
      clipboardData: {
        getData: () => 'test answer input'
      }
    });
    fireEvent.blur(answerInput[0]);
  });

  // it('check for show delete modal', () => {
  //   render(<QuestionsForCustomer />);
  //   const deleteBtn = screen.getAllByTestId('delete-question');
  //   fireEvent.click(deleteBtn[0]);
  //   expect(screen.getByText('Are you sure?')).toBeInTheDocument();

  //   fireEvent.click(screen.getByText('Cancel'));
  //   expect(screen.getByText('Are you sure?')).not.toBeVisible();

  //   fireEvent.click(deleteBtn[0]);
  //   const button = screen.getByRole('button', { name: 'Yes, Delete' });
  //   fireEvent.click(button);
  //   expect(screen.getByText('Are you sure?')).not.toBeVisible();
  // });

  it('check for deleting question without answer', () => {
    render(<QuestionsForCustomer />);
    const deleteBtn = screen.getAllByTestId('delete-question');
    fireEvent.click(deleteBtn[1]);
    expect(deleteBtn[1]).toBeInTheDocument();
  });
});
