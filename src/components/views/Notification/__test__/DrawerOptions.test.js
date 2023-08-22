import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import DrawerOptions from '../DrawerOptions';

const history = createMemoryHistory();
const rootReducer = jest.fn();
const store = createStore(rootReducer, {}, applyMiddleware(thunk));

describe('DrawerOptions component', () => {
  test('it should display options when isShow prop is true', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <DrawerOptions
            isShow={true}
            closeIsDrawerOptions={() => {}}
            setSeenBatch={() => {}}
          />
        </Router>
      </Provider>
    );

    const viewAllOption = getByText('View all');
    expect(viewAllOption).toBeInTheDocument();

    const markAsReadOption = getByText('Mark all as read');
    expect(markAsReadOption).toBeInTheDocument();
  });

  test('it should redirect to recent activity page when view all option is clicked', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <DrawerOptions
            isShow={true}
            closeIsDrawerOptions={() => {}}
            setSeenBatch={() => {}}
          />
        </Router>
      </Provider>
    );

    const viewAllOption = getByText('View all');
    fireEvent.click(viewAllOption);
    await waitFor(() =>
      expect(history.location.pathname).toBe('/recent-activity')
    );
  });

  test('it should not display options when is show prop is false', async () => {
    const { queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <DrawerOptions
            isShow={false}
            closeIsDrawerOptions={() => {}}
            setSeenBatch={() => {}}
          />
        </Router>
      </Provider>
    );
  });
});
