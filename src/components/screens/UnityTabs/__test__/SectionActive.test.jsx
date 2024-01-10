import React from 'react';
import { Provider } from 'react-redux';
import SectionActive from '../SectionActive';
import thunk from 'redux-thunk';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { SocketContext } from '../../../../context/SocketContext';
import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
import cloneDeep from 'lodash/cloneDeep';
import { Map, List } from 'immutable';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cloneData = cloneDeep(data);
const editquestion = Map({
  questionId: 'e256f59e-08d7-4035-abc4-051346138a3d',
  questionAnswered: false,
  section: 'Program Details - COMING SOON',
  questionJSON: '',
  questionHTML: '',
  roleNames: List(['BD Leadership']),
  questionText: 'ADN1',
  questionHintJSON: '',
  answerType: 'number',
  tabId: '04bb872c-9d48-4514-be16-fba5eb7fd789'
});
cloneData.proposal.unityTabQuestionLoading = Map({
  questionId: '',
  value: false
});
cloneData.proposal.opportunityData = Map({});
cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
cloneData.proposal.editQuestionsData = editquestion;
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

describe('SectionActive component', () => {
  const socketContextObj = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };
  let mockSocket = {
    on: jest.fn(),
    emit: jest.fn()
  };
  test('renders section active component', async () => {
    const props = {
      UnityTabSectionTitle: 'Hellooo',
      UnityTabSectionQuestions: [
        '3106acc8-d688-465f-907c-13d890870b43',
        'Proposal Team-P0X',
        '722f9c3c-5538-4b64-bda5-76604d61da46',
        'Key stakeholders-Y0L',
        'Opportunity Overview-H1X',
        '06820d9a-602f-4402-85a7-f4d496fde054'
      ],
      setIsAllActiveDisplayed: jest.fn()
    };
    const { getByText, container } = render(
      <Provider store={sectionStore}>
        <SocketContext.Provider value={mockSocket}>
          <SectionActive {...props} socketContext={socketContextObj} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    waitFor(
      async () => {
        fireEvent.click(await getByText('Add New Question'));
      },
      { timeout: 1000 }
    );
  });
});
