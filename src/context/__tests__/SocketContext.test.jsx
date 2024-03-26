import React from 'react';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import { render, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import SocketContext from '../SocketContext';
import { store } from '../../store';
import * as constants from '../../constants/api';
import PriceModeler from '../../components/common/PriceModeler';
import { setSession } from '../../SessionHandler';
import { REDUX_TYPES } from '../../constants';
import proposalData from '../../components/views/__tests__/Search/data.json';
import {
  setProposalAnswerDatafromSocket,
  editProposalQuestionfromSocket,
  deleteProposalQuestionFromSocket,
  updateAnswerFromWebSocket,
  setProposalQuestionFromSocket,
  updateProposalDetailFromWebSocket,
  updatePriceModelerEstimateAction
} from '../../redux/actions/proposal-actions';
import {
  onApprovalSectionDeletingAction,
  onApprovalSectionDuplicatedAction,
  onApprovalSectionDuplicatingAction
} from '../../redux/actions/approval-actions';
import { cloneDeep } from 'lodash';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import * as datajson from '../../components/screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../components/views/modals/__test__/tabdata.json';

const PriceModelerWithSocketContext = () => (
  <Provider store={store}>
    <SocketContext>
      <PriceModeler />
    </SocketContext>
  </Provider>
);

describe('Price Modeler concurrency', () => {
  let ws;
  beforeAll(() => {
    ws = new WS('ws://localhost:8081');
  });

  afterAll(() => {
    WS.clean();
  });

  afterEach(cleanup);

  beforeEach(() => {
    constants.SOCKET_URL = 'ws://localhost:8081';
    setSession(
      'test',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY'
    );
  });

  const renderSocketContext = () => {
    render(
      <Provider store={store}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
  };

  const renderSocketContextWithData = () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(datajson);

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
      },
      tasks: {
        tasks: [
          {
            no_of_units: 1,
            description: 'task 1',
            order: 1,
            opportunity_types: 'Opportunity Launch Call (Pilot)',
            expanded: true,
            task_role: [
              {
                id: 3129,
                task_list_id: 1122,
                proposal_id: '86462966-7e94-4648-b1e7-fb908f48eaf0',
                question_id: 'Proposal Team-A2W',
                task_id: '5251961b-24a0-4762-8449-dade3f6064b4',
                name: 'RAHUL TIWARI',
                email: 'rahul.tiwari@iqvia.com',
                type: 'roles',
                updated_by: 'System',
                updated_by_email: 'System',
                created_date: '2024-03-11T09:18:40.628Z',
                updated_date: '2024-03-11T09:18:40.628Z'
              }
            ]
          },
          {
            no_of_units: 1,
            description: 'task 1.1',
            order: 2,
            expanded: true,
            opportunity_types: 'Opportunity Launch Call (Pilot)',
            task_role: [
              {
                id: 3129,
                task_list_id: 1122,
                proposal_id: '86462966-7e94-4648-b1e7-fb908f48eaf0',
                question_id: 'Proposal Team-A2W',
                task_id: '5251961b-24a0-4762-8449-dade3f6064b4',
                name: 'RAHUL TIWARI',
                email: 'rahul.tiwari@iqvia.com',
                type: 'roles',
                updated_by: 'System',
                updated_by_email: 'System',
                created_date: '2024-03-11T09:18:40.628Z',
                updated_date: '2024-03-11T09:18:40.628Z'
              }
            ]
          }
        ],
        loading: false,
        error: '',
        taskHistory: [],
        taskHistoryLoading: false,
        showMine: true,
        canReorder: false
      }
    };
    const storewithData = mockStore(initialState);
    render(
      <Provider store={storewithData}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
  };

  const data = {
    is_completed: false,
    is_modified: false,
    is_deleted: false,
    is_freezed: false,
    id: 1246,
    proposal_id: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
    description: 'new task',
    no_of_units: 1,
    task_id: 'd0333719-2c3e-4574-b8a8-c36268166071',
    primary_condition: 'Bid History Creation',
    operator: 'addition',
    unit_type: 'Business Days',
    opportunity_types: 'Core Opportunity Launch Call (APAC)',
    order: 5,
    is_custom: true,
    updated_by: 'RAHUL TIWARI',
    updated_by_email: 'rahul.tiwari@iqvia.com',
    updated_date: '2024-03-18T07:21:58.534Z',
    created_date: '2024-03-18T07:21:58.534Z'
  };
  it('should set task', async () => {
    renderSocketContext();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: { data, proposalId: data.proposal_id },
        event: 'TASK_ADD'
      })
    );
  });

  it('should update task', async () => {
    renderSocketContext();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: { data, proposalId: data.proposal_id },
        event: 'TASK_UPDATE'
      })
    );
  });

  it('should role update task', async () => {
    renderSocketContext();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: {
          data: [
            {
              id: 3196,
              task_list_id: 1246,
              proposal_id: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
              task_id: 'd0333719-2c3e-4574-b8a8-c36268166071',
              question_id: 'a3c65fbb-9253-4646-8319-cdd2648e4697',
              name: null,
              email: null,
              type: 'roles',
              updated_by: 'System',
              updated_by_email: 'System',
              created_date: '2024-03-13T13:31:27.031Z',
              updated_date: '2024-03-13T13:31:27.031Z'
            }
          ],
          proposalId: data.proposal_id,
          taskId: data.task_id
        },
        event: 'TASK_ROLE_UPDATE'
      })
    );
  });

  it('task lock', async () => {
    renderSocketContextWithData();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: {
          data
        },
        event: 'TASK_LOCK'
      })
    );
  });

  it('task unlock', async () => {
    renderSocketContextWithData();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: {
          data
        },
        event: 'TASK_UNLOCK'
      })
    );
  });

  it('task reorder', async () => {
    renderSocketContextWithData();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data,
        event: 'TASK_REORDER'
      })
    );
  });

  it('task move', async () => {
    renderSocketContext();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        proposalId: data.proposal_id,
        data: [
          {
            sourceTaskIds: [
              {
                task_id: 1
              }
            ],
            source_no_of_units: [1, 2, 3],
            targetTaskIds: [
              {
                task_id: 1
              }
            ],
            target_no_of_units: [1, 2, 3]
          }
        ],
        event: 'TASK_MOVE'
      })
    );
  });

  it('tasks', async () => {
    const newData = cloneDeep(data);
    newData.task_id = '123';
    const payload = [newData];
    store.dispatch({
      type: REDUX_TYPES.TASKS.ADD_TASK,
      payload: payload
    });
    renderSocketContextWithData();
    await ws.connected;
    await ws.send(
      JSON.stringify({
        data: [
          {
            taskId: data.task_id,
            proposalId: data.proposal_id,
            userId: data.updated_by,
            userEmail: data.updated_by_email,
            userName: data.updated_by
          }
        ],
        event: 'TASK'
      })
    );
  });

  test('shows loading indicator and tooltip on event "COST_ESTIMATE_CALCULATING"', async () => {
    const { getByText, findByTestId } = render(
      <PriceModelerWithSocketContext />
    );
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_CALCULATING" event message on websocket
    await ws.connected;
    await ws.send(
      JSON.stringify({ data: {}, event: 'COST_ESTIMATE_CALCULATING' })
    );
    await waitFor(async () => {
      expect(
        await findByTestId('price-modeler-recalc-loader')
      ).toBeInTheDocument();
    });
  });

  test.skip('hides loading indicator and tooltip on event "COST_ESTIMATE_UPDATE"', async () => {
    const { getByText, getByTestId } = render(
      <PriceModelerWithSocketContext />
    );
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_CALCULATING" event message on websocket
    await ws.connected;
    await ws.send(
      JSON.stringify({ data: {}, event: 'COST_ESTIMATE_CALCULATING' })
    );
    // send "COST_ESTIMATE_UPDATE" event message on websocket
    const data = {
      Cost: 1000000,
      TherapyArea__c: 'Oncology',
      Number_of_Sites__c: '2',
      Phase_P__c: '3',
      Patients_Enrolled__c: '10',
      Potential_Regions__c: 'Asia Pacific'
    };
    await ws.send(JSON.stringify({ data, event: 'COST_ESTIMATE_UPDATE' }));
    waitFor(() => {
      expect(getByTestId('price-modeler-recalc-loader'))
        .not()
        .toBeInTheDocument();
    });
  });

  test.skip('verify UI updates on event "COST_ESTIMATE_UPDATE"', async () => {
    const { getByText, findByText } = render(<PriceModelerWithSocketContext />);
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_UPDATE" event message on websocket
    const data = {
      Cost: 1000000,
      TherapyArea__c: 'Oncology',
      Number_of_Sites__c: '2',
      Phase_P__c: '3',
      Patients_Enrolled__c: '10',
      Potential_Regions__c: 'Asia Pacific'
    };
    await ws.send(JSON.stringify({ data, event: 'COST_ESTIMATE_UPDATE' }));
    await waitFor(async () => {
      expect(await findByText(data.TherapyArea__c)).toBeInTheDocument();
      expect(await findByText(data.Potential_Regions__c)).toBeInTheDocument();
    });
  });

  it.skip('should update proposal detail on WS event "PROPOSAL_DETAIL_UPDATE"', async () => {
    renderSocketContext();
    const data = {
      proposalId: '12345',
      proposalDetails: {
        testKey: 'testValue'
      },
      bidStatusKey: false,
      bidStopStatus: false
    };

    const payload = [{ proposal: { proposalId: '12345' } }];
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: payload
    });

    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'PROPOSAL_DETAIL_UPDATE' }));

    await waitFor(() =>
      expect(
        store.getState().proposal.getIn(['proposalDetails', 'testKey'])
      ).toBe('testValue')
    );
  });

  it('should update next milestone on WS event "NEXT_MILESTONE_UPDATE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    renderSocketContext();
    const data = {
      nextMilestone: [{ name: 'Test milestone', date: '01-Jan-2023' }]
    };
    await ws.connected;
    await ws.send(
      JSON.stringify({ data, event: 'NEXT_MILESTONE_UPDATE', oppId: '12345' })
    );
    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'nextMilestone'])
      ).toEqual(data.nextMilestone)
    );
  });

  it('should update custom name on WS event "CUSTOM_NAME_UPDATE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    renderSocketContext();
    const data = {
      customName: 'Test custom name',
      oppNumber: '12345'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'CUSTOM_NAME_UPDATE' }));

    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'customName'])
      ).toBe('Test custom name')
    );
  });

  it('should update favourite on WS event "FAVOURITE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    renderSocketContext();
    const data = {
      favourite: true,
      oppNumber: '12345',
      favouriteUpdatedDate: new Date()
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'FAVOURITE' }));
    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'isFavourite'])
      ).toBe(true)
    );
  });

  it('should check QUESTION_ANSWER_UPDATE if condition', async () => {
    const dataNew = {
      questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb61',
      answers: [
        {
          answer: 'Yes',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      modifiedQuestions: [
        {
          isCustomQuestion: false,
          roleNames: ['Proposal Developer'],
          answers: [],
          opportunityType: 'Core Opportunity Launch Call (APAC)',
          questionId: 'baaef1cb-f84c-4866-b0cd-1aae1d67f2bd',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      hasDifferentSFanswer: false
    };
    store.dispatch(
      setProposalAnswerDatafromSocket(
        'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
        dataNew,
        'cf7d5e33-2976-4f35-ab13-940279c21ef1'
      )
    );
    renderSocketContext();
    const data = {
      latestAnswer: [
        {
          questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
          answers: [
            {
              answer: 'Yes',
              proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef'
            }
          ]
        },
        {
          questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
          answers: [
            {
              answer: 'No',
              proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef'
            }
          ]
        }
      ],
      questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
      proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_ANSWER_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check QUESTION_ANSWER_UPDATE else condition', async () => {
    const dataNew = {
      questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb61',
      answers: [
        {
          answer: 'Yes',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      modifiedQuestions: [
        {
          isCustomQuestion: false,
          roleNames: ['Proposal Developer'],
          answers: [],
          opportunityType: 'Core Opportunity Launch Call (APAC)',
          questionId: 'baaef1cb-f84c-4866-b0cd-1aae1d67f2bd',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      hasDifferentSFanswer: false
    };
    store.dispatch(
      setProposalAnswerDatafromSocket(
        'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
        dataNew,
        'cf7d5e33-2976-4f35-ab13-940279c21ef1'
      )
    );
    renderSocketContext();
    const data = {
      latestAnswer: {
        questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
        answers: [
          {
            answer: 'Yes',
            proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef'
          }
        ]
      },
      questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
      proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef23'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_ANSWER_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check QUESTION_ANSWER_UPDATE else condition', async () => {
    const dataNew = {
      questionId: 'a64bdf99-60a0-4e39-b986-f645c46c3cb61',
      answers: [
        {
          answer: 'Yes',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      modifiedQuestions: [
        {
          isCustomQuestion: false,
          roleNames: ['Proposal Developer'],
          answers: [],
          opportunityType: 'Core Opportunity Launch Call (APAC)',
          questionId: 'baaef1cb-f84c-4866-b0cd-1aae1d67f2bd',
          proposalId: 'cf7d5e33-2976-4f35-ab13-940279c21ef1'
        }
      ],
      hasDifferentSFanswer: false
    };
    store.dispatch(
      setProposalAnswerDatafromSocket(
        'a64bdf99-60a0-4e39-b986-f645c46c3cb6',
        dataNew,
        'cf7d5e33-2976-4f35-ab13-940279c21ef1'
      )
    );
    renderSocketContext();
    const data = {};
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_ANSWER_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check QUESTION_TEXT_UPDATE if condition', async () => {
    const questionData = {
      isCustomQuestion: true,
      milestoneNew: [],
      visible: true,
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="9tgua" data-offset-key="al7eb-0-0"><div data-offset-key="al7eb-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="al7eb-0-0"><span data-text="true">im adding data updated test datad123</span></span></div></div></div>',
      roleNames: ['Business Developer'],
      answers: [
        {
          user: 'Srinivas.Manchikatla@iqvia.com',
          userName: 'Srinivas Manchikatla',
          userRole: 'Data Management',
          date: '2023-12-05T07:22:01.797Z',
          answer: 'asdads blur out tttt qww',
          formattedAnswer: {
            value: {
              blocks: [
                {
                  key: 'b2f55',
                  text: 'asdads blur out tttt qww',
                  type: 'unstyled',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {}
                }
              ],
              entityMap: {}
            },
            html: '<div data-contents="true"><div data-block="true" data-editor="2fqcf" data-offset-key="b2f55-0-0"><div data-offset-key="b2f55-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b2f55-0-0"><span data-text="true">asdads blur out tttt qww</span></span></div></div></div>',
            htmlExport:
              '<div data-contents="true"><div data-block="true" data-editor="dn82e" data-offset-key="b2f55-0-0"><div data-offset-key="b2f55-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b2f55-0-0"><span data-text="true">asdads blur out tttt qww</span></span></div></div></div>'
          },
          proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
          updatedInPG: true
        }
      ],
      notApplicable: false,
      active: true,
      answerConfiguration: {
        type: 'text',
        options: []
      },
      hasDifferentSFanswer: false,
      questionJSON:
        '{"blocks":[{"key":"al7eb","text":"im adding data updated test datad123","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionText: 'im adding data updated test datad123',
      section: {
        sectionOrder: 199,
        sectionName: 'Questions_for_the_Customer_left_panel'
      },
      questionApproval: false,
      questionOrder: 1,
      locked: false,
      bidAnswerCopy: true
    };
    const propsalId = 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b';
    store.dispatch(editProposalQuestionfromSocket(questionData, propsalId));
    renderSocketContext();
    const data = {
      questionData: questionData,
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
      oppNo: 'JAB52862'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_TEXT_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check QUESTION_TEXT_UPDATE else condition', async () => {
    const questionData = {};
    const propsalId = 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b';
    store.dispatch(editProposalQuestionfromSocket(questionData, propsalId));
    renderSocketContext();
    const data = {
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_TEXT_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check SWITCH_TEMPLATE_IN_PROGRESS', async () => {
    renderSocketContext();
    const data = true;
    await ws.connected;
    await ws.send(
      JSON.stringify({ data, event: 'SWITCH_TEMPLATE_IN_PROGRESS' })
    );
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check SWITCH_TEMPLATE_IN_PROGRESS', async () => {
    renderSocketContext();
    const data = true;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: '' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check SWITCH_TEMPLATE_COMPLETED', async () => {
    renderSocketContext();
    const data = 'success';
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'SWITCH_TEMPLATE_COMPLETED' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check SWITCH_TEMPLATE_ERROR', async () => {
    renderSocketContext();
    const data = false;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'SWITCH_TEMPLATE_ERROR' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check IN_APP_NOTIFICATION_RECEIVED', async () => {
    renderSocketContext();
    await ws.connected;
    await ws.send(JSON.stringify({ event: 'IN_APP_NOTIFICATION_RECEIVED' }));
  });
  it('should check APPROVALS_DUPLICATING', async () => {
    const answerData = {
      sectionId: 'd3c62d16-2023-47d9-9ab2-a436cab8be1a',
      duplicating: true,
      userEmail: 'Srinivas.Manchikatla@iqvia.com',
      userId: '1167288',
      proposalId: 'ac4ac083-8c73-47a0-82f5-4c4613eafe98',
      userName: 'Srinivas Manchikatla',
      oppNo: 'JAB52928'
    };
    store.dispatch(onApprovalSectionDuplicatingAction(answerData));
    renderSocketContext();

    const data = answerData;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'APPROVALS_DUPLICATING' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check APPROVALS_DELETING', async () => {
    const answerData = {
      sectionId: 'd3c62d16-2023-47d9-9ab2-a436cab8be1a',
      deleting: true,
      userEmail: 'Srinivas.Manchikatla@iqvia.com',
      userId: '1167288',
      proposalId: 'ac4ac083-8c73-47a0-82f5-4c4613eafe98',
      userName: 'Srinivas Manchikatla',
      oppNo: 'JAB52928'
    };
    store.dispatch(onApprovalSectionDeletingAction(answerData));
    renderSocketContext();

    const data = answerData;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'APPROVALS_DELETING' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check WIDGET_UPDATE', async () => {
    renderSocketContext();

    const data = {
      proposalId: 'ac4ac083-8c73-47a0-82f5-4c4613eafe98',
      typeOfWidget: 'Bid_Cost'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'WIDGET_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check ANSWER_UPDATE if condition', async () => {
    const answerData = {
      questionId: 'b4737fd2-9d1c-4ba9-bd02-b75cfcfbcb4a',
      answers: [
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-11-30T09:22:19.240Z',
          answer: '33',
          formattedAnswer: '33',
          proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-12-06T09:18:57.933Z',
          answer: '57',
          formattedAnswer: '57',
          proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
          updatedInPG: true
        }
      ],
      modifiedQuestions: [],
      hasDifferentSFanswer: false
    };
    store.dispatch(updateAnswerFromWebSocket(answerData));
    renderSocketContext();

    const data = answerData;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'ANSWER_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check ANSWER_UPDATE else condition', async () => {
    const answerData = {
      questionId: 'b4737fd2-9d1c-4ba9-bd02-b75cfcfbcb4a',
      answers: [
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-11-30T09:22:19.240Z',
          answer: '33',
          formattedAnswer: '33',
          proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-12-06T09:18:57.933Z',
          answer: '57',
          formattedAnswer: '57',
          proposalId: undefined,
          updatedInPG: true
        }
      ],
      modifiedQuestions: [],
      hasDifferentSFanswer: false
    };
    store.dispatch(updateAnswerFromWebSocket(answerData));
    renderSocketContext();

    const data = answerData;
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'ANSWER_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check ADD_QUESTION if condition', async () => {
    const questionData = {
      isCustomQuestion: true,
      milestoneNew: [],
      visible: true,
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="9tgua" data-offset-key="al7eb-0-0"><div data-offset-key="al7eb-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="al7eb-0-0"><span data-text="true">im adding data updated test datad123</span></span></div></div></div>',
      roleNames: ['Business Developer'],
      answers: [
        {
          user: 'Srinivas.Manchikatla@iqvia.com',
          userName: 'Srinivas Manchikatla',
          userRole: 'Data Management',
          date: '2023-12-05T07:22:01.797Z',
          answer: 'asdads blur out tttt qww',
          formattedAnswer: {
            value: {
              blocks: [
                {
                  key: 'b2f55',
                  text: 'asdads blur out tttt qww',
                  type: 'unstyled',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {}
                }
              ],
              entityMap: {}
            },
            html: '<div data-contents="true"><div data-block="true" data-editor="2fqcf" data-offset-key="b2f55-0-0"><div data-offset-key="b2f55-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b2f55-0-0"><span data-text="true">asdads blur out tttt qww</span></span></div></div></div>',
            htmlExport:
              '<div data-contents="true"><div data-block="true" data-editor="dn82e" data-offset-key="b2f55-0-0"><div data-offset-key="b2f55-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b2f55-0-0"><span data-text="true">asdads blur out tttt qww</span></span></div></div></div>'
          },
          proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
          updatedInPG: true
        }
      ],
      notApplicable: false,
      active: true,
      answerConfiguration: {
        type: 'text',
        options: []
      },
      hasDifferentSFanswer: false,
      questionJSON:
        '{"blocks":[{"key":"al7eb","text":"im adding data updated test datad123","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionText: 'im adding data updated test datad123',
      section: {
        sectionOrder: 199,
        sectionName: 'Questions_for_the_Customer_left_panel'
      },
      questionApproval: false,
      questionOrder: 1,
      locked: false,
      bidAnswerCopy: true
    };
    const propsalId = 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b';
    store.dispatch(setProposalQuestionFromSocket(questionData, propsalId));
    renderSocketContext();
    const data = {
      questionData: questionData,
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b',
      oppNo: 'JAB52862'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'ADD_QUESTION' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check ADD_QUESTION else condition', async () => {
    const questionData = {};
    const propsalId = 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b';
    store.dispatch(editProposalQuestionfromSocket(questionData, propsalId));
    renderSocketContext();
    const data = {
      questionId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposalId: 'ba95ac58-7585-4fcf-84aa-e2afd9f0253b'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'ADD_QUESTION' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check APPROVALS_DUPLICATED', async () => {
    const proposalId = 'ac4ac083-8c73-47a0-82f5-4c4613eafe98';
    const email = 'Srinivas.Manchikatla@iqvia.com';
    store.dispatch(onApprovalSectionDuplicatedAction(proposalId, email));
    renderSocketContext();
    const data = {
      sectionId: 'd3c62d16-2023-47d9-9ab2-a436cab8be1a',
      proposalId: 'ac4ac083-8c73-47a0-82f5-4c4613eafe98',
      userEmail: 'Srinivas.Manchikatla@iqvia.com',
      userId: '1167288',
      userName: 'Srinivas Manchikatla',
      oppNo: 'JAB52928'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'APPROVALS_DUPLICATED' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });
  it('should check COMPLETED with bidType Clinical_Bid', async () => {
    renderSocketContext();
    const data = {
      oppId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposal: {
        proposalDetails: {
          bidNo: 123
        },
        bidType: 'Clinical_Bid'
      }
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'COMPLETED' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });
  it('should check COMPLETED with bidType empty', async () => {
    renderSocketContext();
    const data = {
      oppId: '317155b0-8807-4607-bd25-639f0243fb23',
      proposal: {
        proposalDetails: {
          bidNo: 123
        },
        bidType: ''
      }
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'COMPLETED' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });

  it.skip('should check PROPOSAL_DETAIL_UPDATE', async () => {
    const data = {
      proposalId: '12345',
      proposalDetails: {
        testKey: 'testValue',
        describeActivity: 'New Post award',
        typeOfActivity:
          'Post Award - Non-compete strategy development;Post Award - Full Feasibility'
      },
      bidStatusKey: false,
      bidStopStatus: false
    };
    store.dispatch(updateProposalDetailFromWebSocket(data));

    const payload = [{ proposal: { proposalId: '12345' } }];

    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: payload
    });

    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'PROPOSAL_DETAIL_UPDATE' }));

    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(false)
    );
  });

  it('should check SF_PROPOSAL_DETAIL_UPDATE', async () => {
    renderSocketContext();
    const data = {};
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'SF_PROPOSAL_DETAIL_UPDATE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });

  it('should check OPPORTUNITY_UPDATE_DASHBOARD', async () => {
    renderSocketContext();
    const data = {};
    await ws.connected;
    await ws.send(
      JSON.stringify({ data, event: 'OPPORTUNITY_UPDATE_DASHBOARD' })
    );
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });

  it('should check COST_ESTIMATE_UPDATE', async () => {
    const data = {
      Cost: 1000000,
      TherapyArea__c: 'Oncology',
      Number_of_Sites__c: '2',
      Phase_P__c: '3',
      Patients_Enrolled__c: '10',
      Potential_Regions__c: 'Asia Pacific'
    };
    store.dispatch(updatePriceModelerEstimateAction(data));
    const { getByText, findByTestId } = render(
      <PriceModelerWithSocketContext />
    );
    await ws.send(JSON.stringify({ data, event: 'COST_ESTIMATE_UPDATE' }));
    await waitFor(() => {
      expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    });
  });
  it('should check QUESTION_DELETE with questionId', async () => {
    const questionId = '13ea2727-2fd9-45c4-a774-176c1a60dbdb';
    store.dispatch(deleteProposalQuestionFromSocket(questionId));
    renderSocketContext();
    const data = {
      questionId: '13ea2727-2fd9-45c4-a774-176c1a60dbdb'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_DELETE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });
  it('should check QUESTION_DELETE with questionId and tabId', async () => {
    const questionId = '13ea2727-2fd9-45c4-a774-176c1a60dbdb';
    store.dispatch(deleteProposalQuestionFromSocket(questionId));
    renderSocketContext();
    const data = {
      questionId: '13ea2727-2fd9-45c4-a774-176c1a60dbdb',
      sectionName: 'testqa',
      tabId: '943b8c70-1e90-4319-b5fa-728221d1a940'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_DELETE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });
  it('should check QUESTION_DELETE with questionId and approvalSectionName', async () => {
    const questionId = '13ea2727-2fd9-45c4-a774-176c1a60dbdb';
    store.dispatch(deleteProposalQuestionFromSocket(questionId));
    renderSocketContext();
    const data = {
      questionId: '13ea2727-2fd9-45c4-a774-176c1a60dbdb',
      sectionName: 'testqa',
      approvalSectionName: 'testqa'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'QUESTION_DELETE' }));
    await waitFor(() =>
      expect(store.getState().proposal.getIn(['isProposalLoading'])).toBe(true)
    );
  });
});
