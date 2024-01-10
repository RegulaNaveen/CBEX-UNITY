import React from 'react';
import {
  cleanup,
  fireEvent,
  getByText,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { Map, List } from 'immutable';
import { store } from '../../../../store';
import { BrowserRouter } from 'react-router-dom';
import AddQuestionModal from '../AddQuestionModal';
import configureStore from 'redux-mock-store';
import * as data from '../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from './tabdata.json';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';

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
cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
cloneData.proposal.editQuestionsData = editquestion;
cloneData.proposal.getAnswerTypesDataF = jest.fn();
cloneData.proposal.getRolesInfoF = jest.fn();
cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
const initialState = {
  proposal: Map(cloneData.proposal),
  selectedBid: Map(cloneData.selectedBid),
  proposalQuestion: Map(cloneData.proposal.proposalQuestions),
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
  unitytab: {
    fetching: false,
    allTabs: {
      '73b4e93b-d678-4244-9732-0fd533723baf': [
        {
          UnityTabSectionOrder: 1,
          UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
          UnityTabSectionQuestions: [
            '9a8c020c-0e54-412c-af8d-88650e48d5c6',
            '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
            'Opportunity Overview-H1X',
            'b7186e4c-962f-4886-9f83-d3e0f99b5986',
            '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
            '9835edd4-922b-458e-b90f-424c7f0bbaa4',
            '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
            '5958e559-0514-495a-8c40-f67db1e16a8f',
            '6252734c-9e1b-496f-ab1e-8e010844ee3a',
            '1c16e233-06a7-40d2-9e70-830c8a64f218',
            'Study Challenges-G0H',
            '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
            'e9902a38-a4be-496b-abd4-88097174bd36',
            'd050363a-24c5-4a73-af78-95bd8f27bdb4'
          ],
          UnityTabSectionTitle: 'Overviews',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        }
      ]
    },
    canSendEmail: false,
    tabRefresh: `Refresh${Date.now().toString()}`,
    isSetQuestionLoading: false,
    setQuestionError: undefined,
    filters: [
      {
        name: 'answered',
        displayName: 'Answered',
        group: 'answer',
        value: false
      },
      {
        name: 'unanswered',
        displayName: 'Unanswered',
        group: 'answer',
        value: false
      },
      {
        name: 'verificationRequired',
        displayName: 'Verification Required',
        group: 'verification',
        value: false
      },
      {
        name: 'responsible',
        displayName: 'Responsible',
        group: 'roles',
        value: false
      },
      {
        name: 'informed',
        displayName: 'Informed',
        group: 'roles',
        value: false
      }
    ]
  },
  approvals: {
    fetching: false,
    allApprovals: [
      {
        ApprovalSectionTitle: 'Strategy Approvals',
        ApprovalSectionRightQuestions: [
          '86ba5974-f4b1-4598-90ae-a1b476fac829',
          '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
          '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
          '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
          'a932540b-b6ec-4182-82fb-aae5b7e0d027'
        ],
        ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
        ApprovalSectionOrder: 1,
        ApprovalSectionLeftQuestions: [
          '8d41dd0f-3140-412c-9fd8-a17116d30800',
          'Proposal Team-O0Z',
          'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
          '722f9c3c-5538-4b64-bda5-76604d61da46',
          'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
          '3106acc8-d688-465f-907c-13d890870b43'
        ]
      }
    ],
    canSendEmail: false,
    filters: [
      {
        name: 'answered',
        displayName: 'Answered',
        group: 'answer',
        value: false
      },
      {
        name: 'unanswered',
        displayName: 'Unanswered',
        group: 'answer',
        value: false
      },
      {
        name: 'verificationRequired',
        displayName: 'Verification Required',
        group: 'verification',
        value: false
      },
      {
        name: 'responsible',
        displayName: 'Responsible',
        group: 'roles',
        value: false
      },
      {
        name: 'informed',
        displayName: 'Informed',
        group: 'roles',
        value: false
      }
    ]
  }
};
const mockstore = mockStore(initialState);
describe('Add Question Modal component', () => {
  afterEach(() => {
    cleanup();
  });
  test('render question component without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddQuestionModal />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test('show Edit Question when isEditMode is true', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddQuestionModal isEditMode={true} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/Edit Question/i)).toBeTruthy();
  });

  test('check editQuestionsData Save', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={mockstore}>
            <AddQuestionModal />
          </Provider>
        </BrowserRouter>
      );
    });
    await expect(screen.findByText(/Edit Question/i)).toBeTruthy();
    fireEvent.click(await screen.findByText('Save'));
  });

  test('check editQuestionsData Delete', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={mockstore}>
            <AddQuestionModal />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.findByText('Delete'));
  });

  test('check editQuestionsData section change', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={mockstore}>
            <AddQuestionModal />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.getByText('BD Leadership'));
    fireEvent.click(await screen.getAllByText('Select')[1]);
    fireEvent.click(await screen.getAllByText('Select')[0]);
    waitFor(async () => {
      screen.debug();
      fireEvent.click(await screen.getByText('Program Details - COMING SOON'));
      fireEvent.click(await screen.getByText('text'));
    }, 1000);
  });

  test('check editQuestionsData Cancel', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={mockstore}>
            <AddQuestionModal onClose={jest.fn()} />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.findByText('Cancel'));
  });
  test('check editQuestionsData custom tab flag save', async () => {
    let objProposal = initialState.proposal.toJS();
    objProposal.selectedBid = Map(objProposal.selectedBid);
    let newData = objProposal.editQuestionsData;
    newData.tabFlag = 'customTab';
    newData.roleNames = List(['BD Leadership']);
    objProposal.editQuestionsData = Map(newData);
    initialState.proposal = Map(objProposal);
    initialState.unitytab = tabdata.unitytab;
    const tabStore = mockStore(initialState);
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={tabStore}>
            <AddQuestionModal onClose={jest.fn()} tabFlag="customTab" />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.getByText('BD Leadership'));
    fireEvent.click(await screen.getAllByText('Select')[1]);
    fireEvent.click(await screen.getAllByText('Select')[0]);
    waitFor(async () => {
      fireEvent.click(await screen.getByText('Program Details - COMING SOON'));
      fireEvent.click(await screen.getByText('text'));
    }, 1000);
    fireEvent.click(await screen.findByText('Save'));
  });

  test('check editQuestionsData custom tab flag Delete', async () => {
    let newData = initialState.proposal.get('editQuestionsData');
    newData.tabFlag = 'customTab';
    initialState.proposal.editQuestionsData = Map(newData);
    const tabStore = mockStore(initialState);
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={tabStore}>
            <AddQuestionModal onClose={jest.fn()} tabFlag="customTab" />
          </Provider>
        </BrowserRouter>
      );
    });

    fireEvent.click(await screen.findByText('Delete'));
  });

  test('check editQuestionsData custom approval flag save', async () => {
    let objProposal = initialState.proposal.toJS();
    objProposal.selectedBid = Map(objProposal.selectedBid);
    let newData = objProposal.editQuestionsData;
    newData.tabFlag = 'Approvals';
    newData.roleNames = List(['BD Leadership']);
    objProposal.editQuestionsData = Map(newData);
    initialState.proposal = Map(objProposal);
    initialState.approvals = tabdata.approvals;
    const tabStore = mockStore(initialState);

    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={tabStore}>
            <AddQuestionModal onClose={jest.fn()} tabFlag="Approvals" />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.getByText('BD Leadership'));
    fireEvent.click(await screen.getAllByText('Select')[1]);
    fireEvent.click(await screen.getAllByText('Select')[0]);
    waitFor(async () => {
      screen.debug();
      fireEvent.click(await screen.getByText('Program Details - COMING SOON'));
      fireEvent.click(await screen.getByText('text'));
    }, 1000);
    fireEvent.click(await screen.findByText('Save'));
  });

  test('check editQuestionsData custom approval flag Delete', async () => {
    let newData = initialState.proposal.get('editQuestionsData');
    newData.tabFlag = 'Approvals';
    initialState.proposal.editQuestionsData = Map(newData);
    const tabStore = mockStore(initialState);
    await act(async () => {
      render(
        <BrowserRouter>
          <Provider store={tabStore}>
            <AddQuestionModal onClose={jest.fn()} tabFlag="Approvals" />
          </Provider>
        </BrowserRouter>
      );
    });
    fireEvent.click(await screen.findByText('Delete'));
  });
  test('show Edit Question when isEditMode is false', async () => {
    const newState = cloneDeep(initialState);
    newState.isQuestionSectionLoading = false;
    newState.isQuestionSectionLoading = false;
    newState.isAnswerTypesLoading = false;
    newState.isRolesLoading = false;
    const data = newState.proposal.toJS();
    data.editQuestionsData = Map({});
    newState.proposal = Map(data);
    const addnewQuestionStore = mockStore(newState);

    await act(async () => {
      await render(
        <BrowserRouter>
          <Provider store={addnewQuestionStore}>
            <AddQuestionModal isEditMode={false} />
          </Provider>
        </BrowserRouter>
      );
    });
    expect(await screen.findByText(/Add New Question/i)).toBeInTheDocument();
  });
});
