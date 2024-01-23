/**
 * jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {
  fireEvent,
  render,
  cleanup,
  screen,
  setup
} from '@testing-library/react';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import QuestionItem from '../QuestionItem';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';
import configureStore from 'redux-mock-store';
import { Map, List, fromJS } from 'immutable';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../views/modals/__test__/tabdata.json';
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
cloneData.proposal.approvalQuestionLoading.questionId =
  '86ba5974-f4b1-4598-90ae-a1b476fac829';
cloneData.proposal.approvalQuestionLoading = Map(
  cloneData.proposal.approvalQuestionLoading
);
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
  afterEach(() => {
    cleanup();
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
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
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
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
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
            questionId={'78d11922-bcc8-49b2-a5c2-089ec92f7f69'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'25f590c0-cb53-4b91-bd3c-e02898708a7f'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'78d11922-bcc8-49b2-a5c2-089ec92f7f69'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'a2e764e7-e068-470b-b5dd-8f0187eaac68'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={mockSocket}>
          <QuestionItem
            questionId={'3065f3b8-2540-48f8-937f-cd6ae377426a'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );

    expect(container).toBeInTheDocument();
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
            questionId={'78d11922-bcc8-49b2-a5c2-089ec92f7f69'}
            socketContext={socketContextObj}
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    // fireEvent.click(await screen.getByText('awdawd'));
    // waitFor(
    //   async () => {
    //     fireEvent.click(await getByText('test'));
    //   },
    //   { timeout: 100 }
    // );
    // waitFor(
    //   async () => {
    //     fireEvent.click(await getByTestId('calendar'));
    //   },
    //   { timeout: 100 }
    // );
  });

  test('Question Item checkLastAnswerOfQuestionVisibility', async () => {
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={mockstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'86ba5974-f4b1-4598-90ae-a1b476fac829'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="86ba5974-f4b1-4598-90ae-a1b476fac829"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(
      await screen.findByText(
        'Recent / relevant opportunities with similar indication'
      )
    );
    fireEvent.click(await screen.getByTestId('answer-actions'));
  });

  test('Question Item Date test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '0c7c273a-4442-494b-8302-bc21f014ab9d'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'0c7c273a-4442-494b-8302-bc21f014ab9d'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="0c7c273a-4442-494b-8302-bc21f014ab9d"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Team to return budget revisions'));
  });

  test('Question Item Radio test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'bfaeb699-ad10-4d68-acdb-2195f58d2ed2'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'bfaeb699-ad10-4d68-acdb-2195f58d2ed2'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="bfaeb699-ad10-4d68-acdb-2195f58d2ed2"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Radio'));
  });

  test('Question Item Select test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'c0a77004-ecbe-4bd4-98e9-b7b8aa542197'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'c0a77004-ecbe-4bd4-98e9-b7b8aa542197'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="c0a77004-ecbe-4bd4-98e9-b7b8aa542197"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(
      await screen.findByText('Does DIPA add value to this opportunity?')
    );
  });

  test('Question Item Picklist test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'c30cad80-d74c-4a7b-8503-76b79ed2718b'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'c30cad80-d74c-4a7b-8503-76b79ed2718b'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="c30cad80-d74c-4a7b-8503-76b79ed2718b"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Parent Account'));
  });

  test('Question Item yes/no test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'ce73b86a-a641-4dc2-bfdf-f883ad95b8e6'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'ce73b86a-a641-4dc2-bfdf-f883ad95b8e6'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="ce73b86a-a641-4dc2-bfdf-f883ad95b8e6"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Rare Disease'));
  });

  test('Question Item checkbox test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '5258e656-e695-492c-a01a-d3ccd7480bfe'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'5258e656-e695-492c-a01a-d3ccd7480bfe'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="5258e656-e695-492c-a01a-d3ccd7480bfe"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Checkbox'));
  });

  test('Question Item Table test', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '78b4cdaf-7788-4369-ab01-32a0fa97f2d5'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'78b4cdaf-7788-4369-ab01-32a0fa97f2d5'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="78b4cdaf-7788-4369-ab01-32a0fa97f2d5"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('table check'));
  });
  test('Question Item Table test with answer', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'f454d1e9-2049-4492-8478-80840c5dd1c6'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'f454d1e9-2049-4492-8478-80840c5dd1c6'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="f454d1e9-2049-4492-8478-80840c5dd1c6"
          />
        </SocketContext.Provider>
      </Provider>
    );
    fireEvent.click(await screen.findByText('New Intervention Type'));
    fireEvent.click(await screen.findByText('Edit Table Data'));
  });
  test('Question Item custom question with answer', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '7043a8fd-0eaf-4fa7-9ca4-836ae2cabf04'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'7043a8fd-0eaf-4fa7-9ca4-836ae2cabf04'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="7043a8fd-0eaf-4fa7-9ca4-836ae2cabf04"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Test99'));
    fireEvent.click(await screen.findByTestId('question-edit'));
  });

  test('Question Item Table test with empty answer', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '02b4cbf0-cc13-456c-a6d9-5a2b09d6f19c'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'02b4cbf0-cc13-456c-a6d9-5a2b09d6f19c'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="02b4cbf0-cc13-456c-a6d9-5a2b09d6f19c"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Testing Table Row Col Hide'));
  });
  test('Question Item Table test with picklist answer', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      'Country Strategy-N9P'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'Country Strategy-N9P'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="Country Strategy-N9P"
          />
        </SocketContext.Provider>
      </Provider>
    );

    fireEvent.click(
      await screen.findByText('Which countries did the customer specify?')
    );
  });
  test('Question Item empty type', async () => {
    let proposalObj = cloneDeep(initialState.proposal);
    proposalObj = proposalObj.setIn(
      ['approvalQuestionLoading', 'questionId'],
      '8b257b67-43cb-4d0f-95c0-55dd40755dbd'
    );
    initialState.proposal = proposalObj;
    const updatedstore = mockStore(initialState);
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };

    await render(
      <Provider store={updatedstore}>
        <SocketContext.Provider value={socketContextObj}>
          <QuestionItem
            questionId={'8b257b67-43cb-4d0f-95c0-55dd40755dbd'}
            isQuesFreezed={false}
            socketContext={mockSocket}
            disabled={false}
            archivedQuestion={[]}
            eventCategories={{ crmNo: 'test' }}
            trackEvent={jest.fn()}
            updateQuestionVisibility={jest.fn().mockReturnValue(true)}
            highlightQuestionId="8b257b67-43cb-4d0f-95c0-55dd40755dbd"
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(
      await screen.findByText('Question type not found')
    ).toBeInTheDocument();
  });
});
