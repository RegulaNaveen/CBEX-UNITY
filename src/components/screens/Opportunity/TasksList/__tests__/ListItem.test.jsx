import React from 'react';
import {
  fireEvent,
  waitFor,
  render,
  waitForElementToBeRemoved,
  getByTestId,
  screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import Sinon from 'sinon';
import { store } from '../../../../../store';
import { SocketContext } from '../../../../../context/SocketContext';
import ListItem from '../ListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as TaskApis from '../../../../../api/tasksList';

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
    fireEvent.click(checkBox);
  });
});
