import React from 'react';
import { Provider } from 'react-redux';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react';
import { mount } from 'enzyme';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from '../../../../store';
import ApprovalIndex from '../index';
import { REDUX_TYPES } from '../../../../constants';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
import { SocketContext } from '../../../../context/SocketContext';
import cloneDeep from 'lodash/cloneDeep';
import { Map } from 'immutable';
import * as utils from '../utils';
function createstore() {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cloneData = cloneDeep(data);

  cloneData.proposal.unityTabQuestionLoading = Map({
    questionId: '',
    value: false
  });
  cloneData.proposal.opportunityData = Map({});
  cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
  cloneData.proposal.editQuestionsData = Map({});
  cloneData.proposal.getAnswerTypesDataF = jest.fn();
  cloneData.proposal.getRolesInfoF = jest.fn();
  cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
  const initialState = {
    ssoAuth: Map(data.ssoAuth),
    proposal: Map(cloneData.proposal),
    selectedBid: Map(cloneData.selectedBid),
    proposalQuestion: cloneData.proposal.proposalQuestions,
    currentsection: '',
    onClose: jest.fn(),
    sidebar: Map({
      isOpen: true
    }),
    notepad: {
      proposalID: '',
      notes: [],
      fetchingNotes: false,
      fetchNotesErrorMsg: '',
      uploadingNote: false,
      uploadNoteErrorMsg: '',
      notepadMode: 'notepad_mode_default'
    },
    unitytab: tabdata.unitytab,
    approvals: tabdata.approvals,
    search: {
      query: null,
      isOpen: false,
      currentResultIndex: -1,
      prevResult: null,
      totalResultsFound: 0,
      searching: false,
      searchResults: [],
      autoNavigatedToCurrentResult: true,
      clearInputFlag: false,
      showModal: false,
      modalTitle: '',
      modalContent: ''
    }
  };
  const sectionStore = mockStore(initialState);
  return sectionStore;
}

describe('Unity Section Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('check filter on when isShowFilter is true ', async () => {
    const sectionStore = createstore();
    const { container } = render(
      <BrowserRouter>
        <Provider store={sectionStore}>
          <ApprovalIndex isShowFilters={true} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/Filter/i)).toBeTruthy();
    fireEvent.click(await screen.findByText('Filter'));
    waitFor(async () => {
      fireEvent.click(await screen.findByText('Close'));
    }).catch(err => {
      console.log(err);
    });
  });

  test('check Expend All Button on click ', async () => {
    const sectionStore = createstore();
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn(),
      questionLockDetailsWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { container } = render(
      <BrowserRouter>
        <Provider store={sectionStore}>
          <SocketContext.Provider value={socketContextObj}>
            <ApprovalIndex socketContextObj={mockSocket} />
          </SocketContext.Provider>
        </Provider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/Expand All/i)).toBeTruthy();
    fireEvent.click(await screen.findByText('Expand All'));
  });

  test('test Approval tab index', async () => {
    const sectionStore = createstore();
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn(),
      questionLockDetailsWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    jest.spyOn(utils, 'shouldShowSection').mockReturnValue(true);
    const { container } = await render(
      <BrowserRouter>
        <Provider store={sectionStore}>
          <SocketContext.Provider value={socketContextObj}>
            <ApprovalIndex isShowFilters={true} socketContextObj={mockSocket} />
          </SocketContext.Provider>
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/Filter/i)).toBeTruthy();
    fireEvent.click(await screen.findByText('Filter'));
    await expect(screen.findByText(/Add New Question/i)).toBeTruthy();
  });
});
