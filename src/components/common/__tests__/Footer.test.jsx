/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sinon from 'sinon';
import { store } from '../../../store';
import UnityFooter from '../Footer';
import { REDUX_TYPES } from '../../../constants';
import * as ProposalApi from '../../../api/proposal';
import { updateSwitchInProgress } from '../../../redux/actions/proposal-actions';
import * as datajson from '../../../components/screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../components/views/modals/__test__/tabdata.json';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import cloneDeep from 'lodash/cloneDeep';
import { SocketContext } from '../../../context/SocketContext';

const oppTypeList = {
  data: {
    'Opportunity Type': [
      'Core Opportunity Launch Call (AMR/EMEA)',
      'Core Opportunity Launch Call (APAC)',
      'Non-Core Clinical Studies',
      'Ballpark',
      'IQB Template',
      'PILOT - DO NOT USE: PROGRAMS',
      'Default Type'
    ],
    'Publish Version': 'v2023.423'
  }
};

const FooterWithRedux = props => (
  <Provider store={store}>
    <Router>
      <UnityFooter {...props} />
    </Router>
  </Provider>
);

describe('Test Footer Component', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Load footer component', async () => {
    jest.spyOn(ProposalApi, 'getOTListData').mockRejectedValue({
      data: { message: 'rejected' },
      status: 400
    });
    const { container } = render(
      <FooterWithRedux
        questionTemplateVersionNumber="version-0.29"
        opportunityType="Core Clinical"
      />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Update Template')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Question Template Version: version-0.29 - Core Clinical'
      )
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alert')).toBeInTheDocument();
    });
  });

  test('Refresh button disable and able to change the opportunity type', async () => {
    jest.spyOn(ProposalApi, 'getOTListData').mockResolvedValue(oppTypeList);
    const { queryByTestId } = render(
      <FooterWithRedux
        questionTemplateVersionNumber="version-0.29"
        opportunityType="Default Type"
      />
    );
    expect(queryByTestId('sync-icon')).toBeInTheDocument();
    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(queryByTestId('update-triangle')).not.toBeInTheDocument();
    });
    act(() => {
      fireEvent.click(queryByTestId('sync-icon'));
    });
    expect(screen.getByText('Opportunity Type Override')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Default Type')).toBeInTheDocument();
      screen.debug(undefined, Infinity);
      expect(
        screen.getByRole('button', { name: /cancel/i })
      ).toBeInTheDocument();
      expect;
      expect(screen.getByRole('button', { name: /change/i })).toBeDisabled();
    });
  });

  test('test for update template in progess and got error', async () => {
    store.dispatch(updateSwitchInProgress(true));
    render(<FooterWithRedux />);
    expect(screen.getByText('Opportunity Type Update')).toBeInTheDocument();

    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: {
        data: 'error',
        proposalId: 'ed090ac8-3902-46cc-9530-73797cc78308'
      }
    });
    // expect(
    //   await screen.findByText('Operation failed due to error')
    // ).toBeInTheDocument();
  });

  test('switch template success test', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router'),
      useParams: jest.fn().mockReturnValue({ id: '123' })
    }));
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(datajson);
    cloneData.proposal.switchTempCallStatus = {
      data: 'success'
    };
    cloneData.proposal.switchTempInProgress = {
      proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
      status: true
    };
    cloneData.proposal.unityTabQuestionLoading = Map({
      questionId: '',
      value: false
    });
    cloneData.proposal.opportunityData = Map({});
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      ssoAuth: Map(cloneData.ssoAuth),
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
      },
      tasks: {
        tasks: [],
        loading: false,
        error: '',
        taskHistory: [],
        taskHistoryLoading: false,
        showMine: true,
        canReorder: false
      }
    };
    const sectionStore = mockStore(initialState);
    const props = {
      questionTemplateVersionNumber: 'v2023.12',
      opportunityType: 'Opportunity Launch Call (Pilot)'
    };

    ProposalApi.getAllProposals = jest.fn().mockResolvedValue([
      {
        isCurrent: true,
        proposal: {
          proposalId: '123',
          bidType: 'Clinical_Bid',
          proposalDetails: {
            bidNo: 1
          }
        },
        proposalQuestion: [],
        proposalUser: []
      }
    ]);
    ProposalApi.getPaginateProposal = jest.fn().mockResolvedValue([
      {
        isCurrent: true,
        proposal: {
          proposalId: '123',
          bidType: 'Clinical_Bid',
          proposalDetails: {
            bidNo: 1
          }
        },
        proposalQuestion: [],
        proposalUser: []
      }
    ]);

    await render(
      <>
        <Provider store={sectionStore}>
          <Router>
            <SocketContext.Provider
              value={{ getTaskLockDetailsWrapper: jest.fn() }}
            >
              <UnityFooter {...props} />
            </SocketContext.Provider>
          </Router>
        </Provider>
      </>
    );
  });

  test('switch template error test', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router'),
      useParams: jest.fn().mockReturnValue({ id: '123' })
    }));
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(datajson);
    cloneData.proposal.switchTempCallStatus = {
      data: 'error'
    };
    cloneData.proposal.switchTempInProgress = {
      proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
      status: true
    };
    cloneData.proposal.unityTabQuestionLoading = Map({
      questionId: '',
      value: false
    });
    cloneData.proposal.opportunityData = Map({});
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      ssoAuth: Map(cloneData.ssoAuth),
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
      },
      tasks: {
        tasks: [],
        loading: false,
        error: '',
        taskHistory: [],
        taskHistoryLoading: false,
        showMine: true,
        canReorder: false
      }
    };
    const sectionStore = mockStore(initialState);
    const props = {
      questionTemplateVersionNumber: 'v2023.12',
      opportunityType: 'Opportunity Launch Call (Pilot)'
    };

    await render(
      <>
        <Provider store={sectionStore}>
          <Router>
            <SocketContext.Provider
              value={{ getTaskLockDetailsWrapper: jest.fn() }}
            >
              <UnityFooter {...props} />
            </SocketContext.Provider>
          </Router>
        </Provider>
      </>
    );
  });
});
