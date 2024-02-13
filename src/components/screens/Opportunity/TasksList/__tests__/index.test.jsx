import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import TasksList from '..';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { REDUX_TYPES } from '../../../../../constants';
import mockData from '../../../../views/__tests__/Search/data.json';
import { TASKS } from '../../../../../constants/types';
import moment from 'moment';

const { LOADING_TASKS, SET_TASKS } = TASKS;

const TasksListWithRedux = props => (
  <Provider store={store}>
    <TasksList {...props} />
  </Provider>
);

describe('TasksList Unit Tests', () => {
  beforeAll(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID,
      payload: {
        ...mockData,
        proposalDetails: {
          proposal: {
            ...mockData.proposal,
            proposalDate: moment().subtract(1, 'days')
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
    const { getByText } = render(<TasksListWithRedux />);
    expect(getByText('Day 1')).toBeTruthy();
    expect(getByText('Day 2')).toBeTruthy();
    expect(getByText('Day 3')).toBeTruthy();
    expect(getByText('Day 4')).toBeTruthy();
    expect(getByText('Day 5')).toBeTruthy();
    expect(getByText('Day 6')).toBeTruthy();
    expect(getByText('Day 7')).toBeTruthy();
    expect(getByText('Day 8')).toBeTruthy();
    expect(getByText('Day 9')).toBeTruthy();
    expect(getByText('Day 10')).toBeTruthy();
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
            proposalDate: moment().subtract(2, 'days')
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
});
