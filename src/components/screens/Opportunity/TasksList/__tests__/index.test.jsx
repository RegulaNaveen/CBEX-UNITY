import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import TasksList from '..';
import { Provider } from 'react-redux';
import { store, axiosInstance } from '../../../../../store';
import { REDUX_TYPES } from '../../../../../constants';
import mockData from '../../../../views/__tests__/Search/data.json';
import { TASKS } from '../../../../../constants/types';
import { API } from '../../../../../constants';
import moment from 'moment';
import { SocketContext } from '../../../../../context/SocketContext';
import data from '../../../../views/modals/__test__/data.json';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import * as datajson from '../../../../screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../../views/modals/__test__/tabdata.json';
import cloneDeep from 'lodash/cloneDeep';
const { LOADING_TASKS, SET_TASKS } = TASKS;
const { TASKSLIST_API_URL } = API.TASKSLIST;
const TasksListWithRedux = props => (
  <>
    <Provider store={store}>
      <SocketContext.Provider value={{ getTaskLockDetailsWrapper: jest.fn() }}>
        <TasksList {...props} />
      </SocketContext.Provider>
    </Provider>
  </>
);

describe('TasksList Unit Tests', () => {
  beforeAll(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-wrapper');
    document.body.appendChild(modalRoot);
    const tasklistRoot = document.createElement('div');
    tasklistRoot.setAttribute('id', 'tasklist-modal-wrapper');
    document.body.appendChild(tasklistRoot);
    store.dispatch({
      type: SET_TASKS,
      payload: [
        {
          id: 1,
          no_of_units: 1,
          description: 'task 1',
          order: 1,
          opportunity_types: 'Default Type',
          proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
          task_role: [
            {
              task_list_id: 20,
              proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
              task_id: '4d1b5820-cd8b-417e-8b64-5a8bfe91b842',
              question_id: null,
              name: 'RAHUL TIWARI',
              email: 'rahul.tiwari@iqvia.com',
              type: 'user'
            },
            {
              id: 1390,
              task_list_id: 20,
              proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
              task_id: '4d1b5820-cd8b-417e-8b64-5a8bfe91b842',
              question_id: null,
              name: 'Varsha Agarwal',
              email: 'varsha.goyal@iqvia.com',
              type: 'user'
            },
            {
              id: 24,
              task_list_id: 20,
              proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
              task_id: '4d1b5820-cd8b-417e-8b64-5a8bfe91b842',
              question_id: 'd7f00e27-409d-4220-af5d-a015f189a5f5',
              name: null,
              email: null,
              type: 'roles'
            }
          ]
        },
        {
          no_of_units: 1,
          description: 'task 1.1',
          order: 2,
          opportunity_types: 'Default Type'
        },
        {
          no_of_units: 2,
          description: 'task 2',
          order: 2,
          opportunity_types: 'Default Type'
        },
        {
          no_of_units: 3,
          description: 'task 3',
          order: 3,
          opportunity_types: 'Default Type'
        }
      ]
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID,
      payload: {
        ...mockData,
        proposalDetails: {
          proposal: {
            ...mockData.proposal,
            proposalDate: moment('2024-02-16').subtract(1, 'days')
          },
          proposalQuestions: [data.proposalTeamQuestion]
        },
        bid: {
          bidId: '',
          isCurrent: true,
          isEditable: true,
          pertinentDetails: null,
          bidName: 'Bid'
        }
      }
    });
  });

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));

  axiosInstance.put = jest.fn().mockImplementation(url => {
    switch (url) {
      case `${TASKSLIST_API_URL}/roles/a49ed80a-d782-40c0-9ff4-bbe35eb0e904/1`:
        return Promise.resolve({
          status: 200,
          data: {
            result: [
              {
                task_list_id: 20,
                proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
                task_id: '4d1b5820-cd8b-417e-8b64-5a8bfe91b842',
                question_id: null,
                name: 'RAHUL TIWARI',
                email: 'rahul.tiwari@iqvia.com',
                type: 'user'
              },
              {
                id: 1390,
                task_list_id: 20,
                proposal_id: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
                task_id: '4d1b5820-cd8b-417e-8b64-5a8bfe91b842',
                question_id: null,
                name: 'Varsha Agarwal',
                email: 'varsha.goyal@iqvia.com',
                type: 'user'
              }
            ]
          }
        });
      default:
        return Promise.reject({ status: 404 });
    }
  });

  test('render Task list component', async () => {
    const { getByText } = render(<TasksListWithRedux />);
    expect(getByText('Task List')).toBeTruthy();
  });

  test('render day 1 to 10', async () => {
    const { getAllByText, debug, container } = render(<TasksListWithRedux />);
    debug(container, Infinity);
    expect(getAllByText(/Day 1$/)).toBeTruthy();
    expect(getAllByText(/Day 2/)).toBeTruthy();
    expect(getAllByText(/Day 3/)).toBeTruthy();
  });

  test('render loader while fetching tasks', async () => {
    store.dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    const { container } = render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(
          container.querySelector('.MuiCircularProgress-root')
        ).not.toBeNull();
      },
      { timeout: 3000 }
    );
    store.dispatch({
      type: LOADING_TASKS,
      payload: false
    });
    await waitFor(
      () => {
        expect(container.querySelector('.MuiCircularProgress-root')).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  test('day should be expandable/collapsible', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID,
      payload: {
        ...mockData,
        proposalDetails: {
          proposal: {
            ...mockData.proposal,
            proposalDate: moment('2024-02-16').subtract(2, 'days')
          }
        },
        bid: {
          bidId: '',
          isCurrent: true,
          isEditable: true,
          pertinentDetails: null,
          bidName: 'Bid'
        }
      }
    });
    const { getByText, container, findAllByText } = await render(
      <TasksListWithRedux />
    );
    const expandToggle = container.querySelector(
      '.MuiAccordion-root > .MuiButtonBase-root'
    );
    fireEvent.click(expandToggle);
    await waitFor(() => {
      expect(getByText('task 1')).toBeInTheDocument();
    }).then(async () => {
      const element = await findAllByText('Add new task');
      fireEvent.click(element[0]);
    });
  });

  test('see owners of task', async () => {
    render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const expandToggle = screen.getByTestId('ellipsis-vertical-1');
    fireEvent.click(expandToggle);
    const seeOwners = screen.getByText('See Owners (0)');
    fireEvent.click(seeOwners);
    expect(screen.getByText('Task Owners')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
  });

  test('see owners of task || add new owner', async () => {
    render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const expandToggle = screen.getByTestId('ellipsis-vertical-1');
    fireEvent.click(expandToggle);
    const seeOwners = screen.getByText('See Owners (0)');
    fireEvent.click(seeOwners);
    expect(screen.getByText('Task Owners')).toBeInTheDocument();

    const addOwner = screen.getByText('Add Owner');
    fireEvent.click(addOwner);
    expect(screen.getByText('Add Owner')).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText('Add user');
    fireEvent.change(emailInput, { target: { value: 'owner' } });

    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                first_name: 'new',
                last_name: 'owner',
                email: 'newowner@test.com'
              }
            ]
          })
      })
    );

    fireEvent.change(emailInput, { target: { value: 'new owner' } });
    await waitFor(
      () => {
        // fireEvent.click(screen.getByText('new owner(newowner@test.com)'));
      },
      { timeout: 7000 }
    );
  }, 7000);

  test('see owners of task || with owner', async () => {
    render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const expandToggle = screen.getAllByTestId('ellipsis-vertical-0');
    fireEvent.click(expandToggle[0]);
    const seeOwners = screen.getByText('See Owners (0)');
    fireEvent.click(seeOwners);

    // Delete a task owner
    const deleteOwner = screen.getAllByTestId('trash-icon');
    fireEvent.click(deleteOwner[0]);
    fireEvent.click(deleteOwner[1]);

    fireEvent.click(screen.getAllByText('Cancel')[1]);
  });

  test('see owners of task || with proposal team owner', async () => {
    render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const expandToggle = screen.getAllByTestId('ellipsis-vertical-0');
    fireEvent.click(expandToggle[0]);
    const seeOwners = screen.getByText('See Owners (0)');
    fireEvent.click(seeOwners);
    expect(screen.getByText('Task Owners')).toBeInTheDocument();
    expect(screen.getByText('Sushil Munda')).toBeInTheDocument();

    // Delete a task owner
    const deleteOwner = screen.getAllByTestId('trash-icon');
    fireEvent.click(deleteOwner[2]);

    expect(
      screen.getByText(
        'This Task will no longer reflect the settings in the Teams section'
      )
    ).toBeVisible();
    fireEvent.click(screen.getByText('Continue'));

    const saveBtn = screen.getByRole('button', { name: 'Save' });
    expect(saveBtn).toBeEnabled();
    fireEvent.click(saveBtn);
  });

  test('see owners selecting user from AD', async () => {
    render(<TasksListWithRedux />);
    await waitFor(
      () => {
        expect(screen.getByText('task 1')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const expandToggle = screen.getByTestId('ellipsis-vertical-1');
    fireEvent.click(expandToggle);
    const seeOwners = screen.getByRole('menuitem', {
      name: /see owners \(0\)/i
    });
    fireEvent.click(seeOwners);
    expect(screen.getByText('Task Owners')).toBeInTheDocument();
    expect(screen.getByText('Users assigned this task')).toBeInTheDocument();
    const addOwner = screen.getByText('Add Owner');
    fireEvent.click(addOwner);
    const autocompleteField = screen.getByPlaceholderText('Add user');
    expect(autocompleteField).toBeInTheDocument();
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, {
      target: { value: 'Varsha Kumari' }
    });
    expect(screen.findByText('Varsha Kumari(varsha.kumari2@iqvia.com)'));
    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);
  });

  test('drag and drop task', async () => {
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
    const sectionStore = mockStore(initialState);
    const fakeLocalStorage = (function () {
      let store = {
        userName: 'RAHUL TIWARI'
      };

      return {
        getItem: function (key) {
          return store[key] || null;
        },
        setItem: function (key, value) {
          store[key] = value.toString();
        },
        removeItem: function (key) {
          delete store[key];
        },
        clear: function () {
          store = {};
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage
    });
    jest.mock('react-beautiful-dnd', () => ({
      Droppable: ({ children }) =>
        children(
          {
            draggableProps: {
              style: {}
            },
            innerRef: jest.fn()
          },
          {}
        ),
      Draggable: ({ children }) =>
        children(
          {
            draggableProps: {
              style: {}
            },
            innerRef: jest.fn()
          },
          {}
        ),
      DragDropContext: ({ children }) => children
    }));
    const { container } = await render(
      <>
        <Provider store={sectionStore}>
          <SocketContext.Provider
            value={{ getTaskLockDetailsWrapper: jest.fn() }}
          >
            <TasksList />
          </SocketContext.Provider>
        </Provider>
      </>
    );

    const element1 = container.querySelector(
      '[data-rbd-draggable-id="drag-group-1-item-0"]'
    );
    const element2 = container.querySelector(
      '[data-rbd-draggable-id="drag-group-1-item-1"]'
    );
    fireEvent.keyDown(element1, { key: ' ', code: 'Space' });
    fireEvent.dragStart(element1);
    fireEvent.dragEnter(element2);
    fireEvent.dragOver(element2);
    fireEvent.drop(element2, {
      dataTransfer: {
        source: {
          droppableId: 0
        },
        destination: {
          droppableId: 1
        }
      }
    });
  });
});
