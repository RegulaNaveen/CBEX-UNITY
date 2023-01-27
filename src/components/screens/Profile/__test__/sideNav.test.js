/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter, Router } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { useDispatch, Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import 'regenerator-runtime/runtime';
import SideNav from '../ProfileLayout/SideNav';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initalstate = {
  name: 'test 123',
  role: 'Business Developer'
};
const store = mockStore(initalstate);
const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89103',
      search: ''
    }
  ]
});
describe('Side Navbar Component is rendered in Dom', () => {
  test('Render Side Navbar', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <SideNav {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText(/test 123/)).toBeInTheDocument();
  });

  test('Side Navbar Component logout click', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <SideNav {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText(/Log Out/)).toBeInTheDocument();
    fireEvent.click(getByText(/Log Out/));
  });
  afterAll(cleanup);
});
