import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import TasksList from '..';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { REDUX_TYPES } from '../../../../../constants';
import mockData from '../../../../views/__tests__/Search/data.json';
import { TASKS } from '../../../../../constants/types';
import moment from 'moment';
import { SocketContext } from '../../../../../context/SocketContext';

const { LOADING_TASKS, SET_TASKS } = TASKS;

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
          no_of_units: 1,
          description: 'task 1',
          order: 1,
          opportunity_types: 'Default Type'
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
  });

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));

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
    expect(getAllByText(/Day 4/)).toBeTruthy();
    expect(getAllByText(/Day 5/)).toBeTruthy();
    expect(getAllByText(/Day 6/)).toBeTruthy();
    expect(getAllByText(/Day 7/)).toBeTruthy();
    expect(getAllByText(/Day 8/)).toBeTruthy();
    expect(getAllByText(/Day 9/)).toBeTruthy();
    expect(getAllByText(/Day 10/)).toBeTruthy();
  });

  test('render loader while fetching tasks', async () => {
    store.dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    const { container } = render(<TasksListWithRedux />);
    await waitFor(() => {
      expect(
        container.querySelector('.MuiCircularProgress-root')
      ).not.toBeNull();
    });
    store.dispatch({
      type: LOADING_TASKS,
      payload: false
    });
    await waitFor(() => {
      expect(container.querySelector('.MuiCircularProgress-root')).toBeNull();
    });
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
    const { getByText, container } = render(<TasksListWithRedux />);
    const expandToggle = container.querySelector(
      '.MuiAccordion-root > .MuiButtonBase-root'
    );
    fireEvent.click(expandToggle);
    await waitFor(() => {
      expect(getByText('task 1')).toBeInTheDocument();
    });
  });

  test('drag and drop task', async () => {
    store.dispatch({
      type: SET_TASKS,
      payload: [
        {
          no_of_units: 1,
          description: 'task 1',
          order: 1,
          opportunity_types: 'Default Type'
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
    render(<TasksListWithRedux />);
    const draggableElement1 = screen.getByTestId('drag-group-1-item-0');
    const droppableElement = screen.getByTestId('droppable-task-group-1');
    const SPACE = { keyCode: 32 };
    const ARROW_DOWN = { keyCode: 40 };
    fireEvent.keyDown(draggableElement1, SPACE); // Begins the dnd
    fireEvent.keyDown(draggableElement1, ARROW_DOWN); // Moves the element
    fireEvent.keyDown(draggableElement1, SPACE); // Ends the dnd
    // Check that the draggable element has been added to the droppable element.
    expect(droppableElement.contains(draggableElement1)).toBe(true);
  });
});
