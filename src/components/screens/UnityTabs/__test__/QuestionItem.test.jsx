/**
 * jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import QuestionItem from '../QuestionItem';

import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
import thunk from 'redux-thunk';
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
    currentResultIndex: 2,
    prevResult: null,
    totalResultsFound: 0,
    searching: false,
    searchResults: [
      {
        tab: 2,
        searchIndex: '76aced19-0af2-46a0-b468-f30d05d7ba59-archive-0-left-ques',
        inputText: 'It will kick out at first',
        vTab: null,
        startIndex: 0,
        endIndex: 25,
        matchIndex: 0,
        tabName: 'Approvals',
        sectionName: 'Test_4447'
      },
      {
        tab: 2,
        searchIndex:
          '76aced19-0af2-46a0-b468-f30d05d7ba59-approval-fcd9df2b-5d54-4995-a6c6-f02468eac09a-left-ques',
        inputText: 'It will kick out at first',
        vTab: null,
        startIndex: 0,
        endIndex: 25,
        matchIndex: 0,
        tabName: 'Approvals',
        sectionName: 'Test_4447'
      },
      {
        tab: 6,
        searchIndex: '76aced19-0af2-46a0-b468-f30d05d7ba59',
        inputText: 'It will kick out at first',
        vTab: null,
        startIndex: 0,
        endIndex: 25,
        matchIndex: 0,
        tabName: 'tesqacs34567',
        sectionName: 'testcc'
      }
    ],
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

const socketContextObj = {
  questionLockWrapper: jest.fn(),
  questionUnlockWrapper: jest.fn()
};
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  ...socketContextObj
};

function renderComponent(props) {
  return (
    <Provider store={mockstore}>
      <SocketContext.Provider value={mockSocket}>
        <QuestionItem questionId={props.questionId} />
      </SocketContext.Provider>
    </Provider>
  );
}

describe('testing question item component in custom tab', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('Question Item component', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { container } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'76aced19-0af2-46a0-b468-f30d05d7ba59'}
            socketContext={socketContextObj}
            UnityTabSectionTitle={'testcc'}
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('Question Item component failed answer type', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { container } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'06820d9a-602f-4402-85a7-f4d496fd888'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('Question Item component differ answer type', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { container } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'06820d9a-602f-4402-85a7-f4d496fd888'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'06820d9a-602f-4402-85a7-f4d496fde555'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'bfaeb699-ad10-4d68-acdb-2195f58d2ed2'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'c8940199-749f-4d1c-817d-86d3f745a774'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'5258e656-e695-492c-a01a-d3ccd7480bfe'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'550eed0e-b06d-4fdc-add9-9e5ea03e293e'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'4b770a63-f0be-438b-88e4-f5811d9f26c6'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'550eed0e-b06d-4fdc-add9-9e5ea03e293e'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  test('Question Item component unitypredicted', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      ...socketContextObj
    };
    const { getByText, getByTestId, container } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            tabId="04bb872c-9d48-4514-be16-fba5eb7fd789"
            questionId={'06820d9a-602f-4402-85a7-f4d496fde054'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const textbox = screen.getByRole('textbox');

    fireEvent.click(textbox);
    fireEvent.paste(textbox, {
      clipboardData: {
        getData: () => 'updated text'
      }
    });
    fireEvent.blur(textbox);
    await waitFor(() =>
      expect(screen.getByText('updated texttest')).toBeInTheDocument()
    );
    // fireEvent.click(getByTestId('calendar'));
  });

  test('Question Item component sf question ', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { getByText, getByTestId, container } = await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            tabId="04bb872c-9d48-4514-be16-fba5eb7fd789"
            questionId={'06820d9a-602f-4402-85a7-f4d496fde099'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    fireEvent.click(getByTestId('calendar'));
  });

  test('render the component without crashing without props', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <QuestionItem />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('render the component without crashing with props', async () => {
    const { container } = await render(
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
  });

  test('Error parsing table answer type', async () => {
    // table answer type question
    render(
      renderComponent({
        questionId: 'f454d1e9-2049-4492-8478-80840c5dd1c6'
      })
    );
  });
  test('render table answer type without error', async () => {
    // table answer type question
    render(
      renderComponent({
        questionId: '4f69f106-59d9-46e7-8421-de9f36be6492'
      })
    );
    // get test id togglebtn and fire click event
    fireEvent.click(screen.getByTestId('togglebtn'));
    // get inputbox and fire change event
    const textBox = screen.getAllByRole('textbox')[2];
    fireEvent.change(textBox, {
      target: { value: 'test' }
    });
    fireEvent.blur(textBox);
    // get save button and fire click event
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  });
  test('render table answer type without last answer', async () => {
    // table answer type question
    render(
      renderComponent({
        questionId: '02b4cbf0-cc13-456c-a6d9-5a2b09d6f19c'
      })
    );
    // get test id togglebtn and fire click event
    fireEvent.click(screen.getByTestId('togglebtn'));
    // get inputbox and fire change event
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' }
    });
    // get save button and fire click event
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  });
  test('render table answer type & check tooltip', async () => {
    // table answer type question
    render(
      renderComponent({
        questionId: '088e8e63-0a1a-4167-919e-bc0961954a43'
      })
    );
    // get test id togglebtn and fire click event
    fireEvent.click(screen.getByTestId('togglebtn'));
    // get test id question-tooltip-icon and fire click event
    fireEvent.click(screen.getByTestId('question-tooltip-icon'));
  });
});
