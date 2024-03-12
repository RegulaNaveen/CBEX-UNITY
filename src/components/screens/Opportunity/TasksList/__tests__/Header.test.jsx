import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../Header';
import { store } from '../../../../../store';
import { Provider } from 'react-redux';
import { TASKS } from '../../../../../constants/types';

describe('TasksList Header Unit Tests', () => {
  test('should Task list header component', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(getByText('Task List')).toBeTruthy();
  });

  test('toggle showMine on checkbox click', () => {
    store.dispatch({ type: TASKS.TOGGLE_SHOW_MINE, payload: false });
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    screen.debug(undefined, Infinity);
    expect(getByRole('checkbox', { name: /show mine/i })).toBeInTheDocument();
  });

  test('Header renders and toggles showMine on checkbox click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox', { name: /show mine/i });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
