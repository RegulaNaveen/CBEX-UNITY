import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from '../../../../store';
import UnityTabIndex from '../index';
import { REDUX_TYPES } from '../../../../constants';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
import { SocketContext } from '../../../../context/SocketContext';
import cloneDeep from 'lodash/cloneDeep';
import { Map } from 'immutable';
import * as utils from '../utils';
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

describe('Unity Section Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <UnityTabIndex />
      </Provider>
    );
  });

  test('render index component', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should check add new questions ', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findByText(/Add New Question/i)).toBeTruthy();
  });
  it('should check add new question on click event ', () => {
    window.history.pushState(
      {},
      '',
      '/opportunities/UZA89257?bidNo=1&bidType=Clinical_Bid&viewType=questions'
    );
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [
        {
          id: 1,
          isCurrent: true,
          proposal: {
            bidType: 'Clinical_Bid',
            proposalDetails: { bidNo: 1 },
            opportunityOverview: {},
            proposalDate: '',
            typeOfWidget: '',
            nextMilestone: ''
          }
        }
      ]
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UnityTabIndex />
        </Provider>
      </BrowserRouter>
    );
    const iconButton = screen.getByTestId('selectedbid-testid');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
  });

  it('check filter on when isShowFilter is true ', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <UnityTabIndex isShowFilters={true} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/ Filters/i)).toBeTruthy();
  });

  it('test unity tab index', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    jest.spyOn(utils, 'shouldShowSection').mockReturnValue(true);
    const { container, findByTestId, findByText } = render(
      <BrowserRouter>
        <Provider store={sectionStore}>
          <SocketContext.Provider value={mockSocket}>
            <UnityTabIndex
              isShowFilters={true}
              tabId="04bb872c-9d48-4514-be16-fba5eb7fd789"
            />
          </SocketContext.Provider>
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/ Filters/i)).toBeTruthy();
    fireEvent.click(await findByTestId('expand-all'));
    fireEvent.click(await findByText('Filter'));
    waitFor(
      async () => {
        fireEvent.click(await findByText('Close'));
      },
      { timeout: 1000 }
    );
  });
});
