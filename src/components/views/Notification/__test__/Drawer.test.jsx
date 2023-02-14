import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Drawer from '../Drawer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Drawer component', () => {
  let store;
  let history;
  let unreadNotifications;

  beforeEach(() => {
    history = createMemoryHistory();
    unreadNotifications = [
      {
        id: 1,
        opportunity_no: '123456',
        body: 'Test notification 1',
        created_date: '2022-01-01',
        read: false,
        url: 'test_url_1',
      },
      {
        id: 2,
        opportunity_no: '654321',
        body: 'Test notification 2',
        created_date: '2022-02-01',
        read: false,
        url: 'test_url_2',
      },
    ];
    store = mockStore({
      notification: {
        unreadNotifications,
      },
    });
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Drawer />
        </Router>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  //   it('displays the number of unread notifications in the badge', () => {
  //     render(
  //       <Provider store={store}>
  //         <Router history={history}>
  //           <Drawer />
  //         </Router>
  //       </Provider>
  //     );
  //     const badge = screen.getByTestId('badge');
  //     expect(badge).toHaveTextContent('2');
  //   });

  it('opens the drawer when the bell icon is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Drawer />
        </Router>
      </Provider>
    );
    const drawer = getByTestId('drawer');
    fireEvent.click(drawer);
    expect(drawer).toHaveClass('toolbar-account-notification');
  });

  it('closes the drawer when clicking outside the drawer', () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Drawer />
        </Router>
      </Provider>
    );
    const drawer = getByTestId('drawer');
    fireEvent.click(drawer);
    act(() => {
      fireEvent.click(container);
    });
    expect(drawer).not.toHaveClass('expanded');
  });
});
