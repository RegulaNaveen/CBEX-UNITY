import React from 'react';
import {
  fireEvent,
  waitFor,
  render,
  waitForElementToBeRemoved
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
});
