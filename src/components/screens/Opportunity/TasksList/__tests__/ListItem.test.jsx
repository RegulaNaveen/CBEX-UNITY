import React from 'react';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Sinon from 'sinon';
import { store } from '../../../../../store';
import { SocketContext } from '../../../../../context/SocketContext';
import ListItem from '../ListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as TaskApis from '../../../../../api/tasksList';
import * as actionCreators from '../../../../../redux/actions/tasksList-actions';

import SeeOwners from '../SeeOwnersModal';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import * as datajson from '../../../../screens/Opportunity/__tests__/mockdata/document.json';
import cloneDeep from 'lodash/cloneDeep';

const SeeOwnersWithRedux = props => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const cloneData = cloneDeep(datajson);

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
    proposal: Map(cloneData.proposal),
    tasks: {
      tasks: [
        {
          id: 1122,
          is_completed: true,
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
          id: 3129,
          is_completed: true,
          no_of_units: 1,
          description: 'task 1.1',
          order: 2,
          expanded: true,
          opportunity_types: 'Opportunity Launch Call (Pilot)',
          task_role: [
            {
              id: 3130,
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
  return (
    <Provider store={sectionStore}>
      <SocketContext.Provider
        value={{ lockTaskWrapper: jest.fn(), unlockTaskWrapper: jest.fn() }}
      >
        <DragDropContext onDragUpdate={jest.fn()}>
          <Droppable droppableId={`droppable-task-group-1`}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <SeeOwners {...props} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </SocketContext.Provider>
    </Provider>
  );
};

const ListItemWithRedux = props => (
  <Provider store={store}>
    <SocketContext.Provider
      value={{ lockTaskWrapper: jest.fn(), unlockTaskWrapper: jest.fn() }}
    >
      <DragDropContext onDragUpdate={jest.fn()}>
        <Droppable droppableId={`droppable-task-group-1`}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ListItem {...props} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </SocketContext.Provider>
  </Provider>
);

jest.mock('../../../../../redux/actions/tasksList-actions', () => ({
  editTask: jest.fn().mockReturnValue(() => Promise.resolve()),
  updateTaskDesc: jest.fn().mockReturnValue(() => Promise.resolve())
}));

describe('ListItem Unit Tests', () => {
  let sinonSandBox;
  beforeAll(() => {
    sinonSandBox = Sinon.createSandbox();
    const tasklistRoot = document.createElement('div');
    tasklistRoot.setAttribute('id', 'tasklist-modal-wrapper');
    document.body.appendChild(tasklistRoot);
  });

  afterEach(() => {
    sinonSandBox.restore();
  });

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  test('should render task item with task description', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'TASK_ID_1',
        proposal_id: 'PROPOSAL_ID_1',
        index: 1
      }
    };
    const { getByText } = render(<ListItemWithRedux {...props} />);
    expect(getByText('task 1')).toBeInTheDocument();
  });

  test('should edit task description', async () => {
    sinonSandBox.stub(TaskApis, 'updateTaskDescApi').resolves({
      status: 200,
      data: {
        result: {
          description: 'task 1 edited'
        }
      }
    });
    const props = {
      task: {
        description: 'task 1',
        task_id: 'TASK_ID_1',
        proposal_id: 'PROPOSAL_ID_1'
      },
      index: 1,
      editable: true
    };
    const { getByText, container } = render(<ListItemWithRedux {...props} />);
    expect(getByText('task 1')).toBeInTheDocument();
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    await waitFor(() => {
      expect(getByText('Edit')).toBeInTheDocument();
    });
    await fireEvent.click(getByText('Edit').closest('li'));
    await waitFor(() => {
      expect(container.querySelector('.edit-container')).toBeInTheDocument();
    });
    const taskDescinput = container.querySelector('.edit-container input');
    await fireEvent.change(taskDescinput, {
      target: { value: 'task 1 edited' }
    });
    await fireEvent.blur(taskDescinput);
    await waitFor(() => {
      expect(
        container.querySelector('.task-item-drag-container')
      ).toBeInTheDocument();
    });
  });

  test('should delete task', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'TASK_ID_1',
        proposal_id: 'PROPOSAL_ID_1'
      },
      index: 1
    };
    const { getByText, container } = render(<ListItemWithRedux {...props} />);
    expect(getByText('task 1')).toBeInTheDocument();
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    await waitFor(() => {
      expect(getByText('Delete')).toBeInTheDocument();
    });
    await fireEvent.click(getByText('Delete').closest('li'));
    await waitFor(() => {
      expect(
        getByText('Are you sure you want to delete this task item?')
      ).toBeInTheDocument();
    });
    await fireEvent.click(getByText('Cancel'));
  });

  test('should show owners count correctly default to be 0', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'TASK_ID_1',
        proposal_id: 'PROPOSAL_ID_1'
      },
      index: 1
    };
    console.log(undefined, Infinity);
    const { getByText, getByTestId, container } = render(
      <ListItemWithRedux {...props} />
    );

    expect(getByText('task 1')).toBeInTheDocument();
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    await waitFor(() => {
      expect(getByText('See Owners (0)')).toBeInTheDocument();
    });
  });

  test('should show owners count correctly', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
        proposal_id: 'PROPOSAL_ID_1',
        task_role: [
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Varsha Kumari',
            email: 'varsha.kumari2@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          },
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Kunal nigam',
            email: 'kunal.nigam@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          }
        ]
      },
      index: 1
    };
    // console.log(undefined, Infinity);
    const { getByText, getByTestId, container } = render(
      <ListItemWithRedux {...props} />
    );

    expect(getByText('task 1')).toBeInTheDocument();
    const iconMenuButton = getByTestId('ellipsis-vertical-1'); // replace 0 with the actual index
    fireEvent.mouseEnter(iconMenuButton);
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    const seeOwnersText = getByText('See Owners (2)');
    expect(seeOwnersText).toBeInTheDocument();
  });

  test('should be able to check/uncheck the checkbox', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
        proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
        is_completed: false,
        task_role: [
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Varsha Kumari',
            email: 'varsha.kumari2@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          },
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Kunal nigam',
            email: 'kunal.nigam@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          }
        ]
      },
      index: 1
    };

    const { getByText, getByTestId, container } = render(
      <ListItemWithRedux {...props} />
    );

    expect(getByText('task 1')).toBeInTheDocument();
    const checkBox = getByTestId('task-checkbox-1');
    await fireEvent.click(checkBox);
    // Wait for promises to resolve
    await Promise.resolve();

    expect(actionCreators.editTask).toHaveBeenCalledWith(
      props.task.proposal_id,
      props.task.task_id,
      { is_completed: !props.task.is_completed }
    );
  });

  test('should handle see owners and close modal', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
        proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
        is_completed: false,
        task_role: [
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Varsha Kumari',
            email: 'varsha.kumari2@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          },
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Kunal nigam',
            email: 'kunal.nigam@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          }
        ]
      },
      index: 1
    };
    const { getByText, getByTestId, container, getAllByTestId } = render(
      <ListItemWithRedux {...props} />
    );
    expect(getByText('task 1')).toBeInTheDocument();
    const iconMenuButton = getByTestId('ellipsis-vertical-1'); // replace 0 with the actual index
    fireEvent.click(iconMenuButton);
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    const SeeOwnersBtn = getByTestId('task-see-owners-modal-1');
    fireEvent.click(SeeOwnersBtn);
  });

  test('should show History modal', async () => {
    const props = {
      task: {
        description: 'task 1',
        task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
        proposal_id: 'PROPOSAL_ID_1',
        task_role: [
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Varsha Kumari',
            email: 'varsha.kumari2@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          },
          {
            id: 3145,
            task_list_id: 1022,
            proposal_id: '9ec54eac-fe06-48f3-bf98-a26e1b6981e9',
            task_id: 'ff995548-2e25-4b36-a893-38d00139540b',
            question_id: null,
            name: 'Kunal nigam',
            email: 'kunal.nigam@iqvia.com',
            type: 'user',
            updated_by: 'Pooja Chahar',
            updated_by_email: 'pooja.chahar@iqvia.com',
            created_date: '2024-03-12T05:30:45.126Z',
            updated_date: '2024-03-12T05:30:45.126Z'
          }
        ]
      },
      index: 1
    };
    const openHistoryModal = jest.fn();
    // console.log(undefined, Infinity);
    const { getByText, getByTestId, container } = render(
      <ListItemWithRedux {...props} openHistoryModal={openHistoryModal} />
    );

    expect(getByText('task 1')).toBeInTheDocument();
    const iconMenuButton = getByTestId('ellipsis-vertical-1'); // replace 0 with the actual index
    fireEvent.click(iconMenuButton);
    const optionsBtn = container.querySelector('button');
    expect(optionsBtn).toBeInTheDocument();
    await fireEvent.click(optionsBtn);
    const historyButtons = getByTestId('task-history-1');
    fireEvent.click(historyButtons);
    expect(openHistoryModal).toHaveBeenCalledWith(props.task.task_id);
  });

  test('task see owner non editable', async () => {
    const task = {
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
          question_id: '5b23339e-c750-4bff-82a8-95930b412733',
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
    };
    const props = {
      index: 1,
      isModalOpen: true,
      closeModal: jest.fn(),
      setIsModalOpen: jest.fn(),
      ownersCount: 2,
      setIsNewTask: jest.fn(),
      isNewTask: false,
      task,
      setAddOwnerBtn: jest.fn(),
      addOwnerBtn: false,
      editable: false
    };
    const { getByText } = await render(<SeeOwnersWithRedux {...props} />);
    expect(getByText('Add Owner')).toBeDisabled();
    expect(getByText('Global Analytics Lead')).toBeInTheDocument();
    expect(getByText('OK')).toBeInTheDocument();
    fireEvent.click(getByText('OK'));
    expect(getByText('Save')).toBeInTheDocument();
  });
  test('task see owner new task Cancel', async () => {
    const task = {
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
          question_id: '5b23339e-c750-4bff-82a8-95930b412733',
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
    };
    const props = {
      index: 1,
      isModalOpen: true,
      closeModal: jest.fn(),
      setIsModalOpen: jest.fn(),
      ownersCount: 2,
      setIsNewTask: jest.fn(),
      isNewTask: {
        isNew: true,
        result: task
      },
      task: {},
      setAddOwnerBtn: jest.fn(),
      addOwnerBtn: true,
      editable: true
    };
    const { getByText } = await render(<SeeOwnersWithRedux {...props} />);
    fireEvent.click(getByText('Cancel'));
  });
  test('task see owner new task save', async () => {
    const task = {
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
          question_id: '5b23339e-c750-4bff-82a8-95930b412733',
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
    };
    const props = {
      index: 1,
      isModalOpen: true,
      closeModal: jest.fn(),
      setIsModalOpen: jest.fn(),
      ownersCount: 2,
      setIsNewTask: jest.fn(),
      isNewTask: {
        isNew: true,
        result: task
      },
      task: {},
      setAddOwnerBtn: jest.fn(),
      addOwnerBtn: true,
      editable: true
    };
    const { getByText, container } = await render(
      <SeeOwnersWithRedux {...props} />
    );
    fireEvent.click(getByText('Add Owner'));
    const element = container.querySelector(
      "[data-testid='autocomplete-owner'] > div > div > div> input"
    );
    await fireEvent.change(element, {
      target: { value: 'rahul tiwari' }
    });
    fireEvent.click(getByText('Save'));
  });
});
