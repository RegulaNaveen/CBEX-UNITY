import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddNewTask from '../AddTaskItem';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import * as TaskListAction from '../../../../../api/tasksList';

describe('Add Task Unit Tests', () => {
  const setAreButtonsDisabled = jest.fn();
  const props = {
    day: 1,
    proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
    setAreButtonsDisabled
  };

  test('renders Add new task button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddNewTask {...props} />
      </Provider>
    );
    const button = getByText(/Add new task/i);
    expect(button).toBeInTheDocument();
  });

  test('shows text field when Add new task button is clicked', () => {
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <AddNewTask {...props} />
      </Provider>
    );
    const button = getByText(/Add new task/i);
    fireEvent.click(button);
    const textField = queryByRole('textbox');
    // const onchange = jest.fn();
    fireEvent.change(textField, { target: { value: 'New Task' } });
    fireEvent.blur(textField);
  });

  test('hides text field when input is empty and blurred', () => {
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <AddNewTask {...props} />
      </Provider>
    );
    const button = getByText(/Add new task/i);
    fireEvent.click(button);
    const textField = queryByRole('textbox');
    fireEvent.blur(textField);
    expect(textField).not.toBeInTheDocument();
  });

  test('check Add Owner button', async () => {
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <AddNewTask {...props} />
      </Provider>
    );
    const button = getByText(/Add new task/i);
    fireEvent.click(button);
    const textField = queryByRole('textbox');
    const addOwnerButton = getByText(/Add Owner/i);
    expect(addOwnerButton).toBeInTheDocument();
    fireEvent.click(addOwnerButton);
  });

  test(' text field have less then 3 chaharcter', () => {
    TaskListAction.setTaskDataApi = jest.fn().mockResolvedValue({
      result: {
        id: 123,
        proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
        task_id: 'f03d3660-9d84-4297-92a4-264b9d0465f1',
        description: 'test-1',
        primary_condition: 'Bid History Creation',
        operator: 'addition',
        unit_type: 'Business Days',
        no_of_units: 1,
        opportunity_types: 'Core Opportunity Launch Call (AMR/EMEA)',
        order: 2,
        is_completed: false,
        is_modified: false,
        is_deleted: false,
        is_custom: true,
        is_freezed: false,
        updated_by: 'Srinivas Manchikatla',
        updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
        created_date: '2024-02-26T06:29:35.964Z',
        updated_date: '2024-03-01T13:06:38.537Z',
        task_role: [],
        task_history: []
      }
    });
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <AddNewTask
          {...props}
          openModal={jest.fn()}
          setIsNewTask={jest.fn()}
          setAddOwnerBtn={jest.fn()}
        />
      </Provider>
    );
    const button = getByText(/Add new task/i);
    fireEvent.click(button);
    const textField = queryByRole('textbox');
    // const onchange = jest.fn();
    fireEvent.change(textField, { target: { value: 'the' } });
    fireEvent.blur(textField);
  });
});
