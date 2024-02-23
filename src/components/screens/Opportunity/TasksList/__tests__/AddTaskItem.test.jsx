import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AddNewTask from '../AddTaskItem';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { REDUX_TYPES } from '../../../../../constants';
import { TASKS } from '../../../../../constants/types';
import moment from 'moment';

describe('Add Task Unit Tests', () => {
  const props = {
    day: 1,
    proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904'
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

  test('check Add Owner button', () => {
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
  });

  test(' text field have less then 3 chaharcter', () => {
    const { getByText, queryByRole } = render(
      <Provider store={store}>
        <AddNewTask {...props} />
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
