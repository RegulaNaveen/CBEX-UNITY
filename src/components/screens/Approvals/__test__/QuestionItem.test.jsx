/**
 * jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import QuestionItem from '../QuestionItem';

import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';
import { Map, List } from 'immutable';
import * as sectionUtil from '../utils';
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
const mockstore = mockStore(initialState);

const props = {
  questionId: '3065f3b8-2540-48f8-937f-cd6ae377426a',
  approvalSectionTitle: 'new section',
  disabled: false,
  isQuesFreezed: true,
  archivedQuestion: {
    proposalId: '',
    questionId: '',
    questionText: 'Data Business Rule',
    answerConfiguration: {
      type: 'number'
    },
    answers: [],
    visible: true,
    active: true,
    questionHint: 'Adding the tool tip',
    questionHintJSON:
      '{"blocks":[{"key":"8eoaj","text":"Adding the tool tip","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  },
  eventCategories: {
    dp: 'Unity Dashboard',
    plainPd: 'Proposal Detail',
    tb: 'ToolBar Menu',
    pg: 'Pagination',
    crmNo: 'Proposal Detail (CRM#: HAB72371)'
  },
  highlightQuestionId:
    '3065f3b8-2540-48f8-937f-cd6ae377426a-approval-91ecf807-94cd-4fb2-86db-9dd16172a3c2-left-ques'
};

describe('testing question item component in approval', () => {
  test('render the component without crashing without props', async () => {
    const { container } = await render(
      <Provider store={store}>
        <QuestionItem />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('render the component without crashing with props', async () => {
    const { container, getByTestId } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <QuestionItem {...props} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const iconButton = getByTestId('approval-icon-button');
    expect(iconButton).toBeInTheDocument();

    fireEvent.click(iconButton);
    const popover = getByTestId('popover-approval');
    expect(popover).toBeInTheDocument();
  });

  test('render the component with props', async () => {
    const props = {
      questionId: '016ea6d2-4d60-4b29-8769-f3fb492c610d',
      questionHint: '',
      questionHintJSON: '',
      approvalSectionTitle: 'Site Analytics',
      disabled: false,
      isQuesFreezed: false,
      archivedQuestion: [],
      eventCategories: {
        crmNo: 'UZA89103'
      },
      trackEvent: jest.fn(),
      updateQuestionVisibility: jest.fn(),
      highlightQuestionId: ''
    };
    jest.spyOn(sectionUtil, 'shouldShowQuestion').mockReturnValue(true);
    const { container, debug } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <QuestionItem {...props} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    debug();
  });
});
