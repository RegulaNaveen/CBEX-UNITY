/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import Documents from '../Documents';
import data from './mockdata/document.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
data.proposal.selectedBid = Map(data.proposal.selectedBid);
data.proposal = Map(data.proposal);
const initalstate = {
  ...data,
  ...{ updateBoxId: jest.fn() }
};
const store = mockStore(initalstate);
const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89103',
      search: '?viewType=documents'
    }
  ]
});
describe('Documents component render', () => {
  test('Documents box location header', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Documents {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText(/Box Locations/i)).toBeInTheDocument();
    expect(
      getByText(/Welcome to the Opportunity Documents section/i)
    ).toBeInTheDocument();
  });

  test('Documents box current bid', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Documents {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText(/- Bid 1/i)).toBeInTheDocument();
  });

  test('Documents box aditional links', async () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents {...initalstate} />
        </Provider>
      </BrowserRouter>
    );
    expect(
      container.getElementsByClassName('additionalink-document').length
    ).toBeGreaterThan(0);
    expect(getByText(/Budget Templates/i)).toBeInTheDocument();
  });

  test('Documents box no links available', async () => {
    initalstate.proposal = initalstate.proposal.toJS();
    initalstate.proposal.boxId = '';
    initalstate.proposal = Map(initalstate.proposal);
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents {...initalstate} />
        </Provider>
      </BrowserRouter>
    );
    screen.debug();
    expect(
      getByText(/No documents available for this proposal/i)
    ).toBeInTheDocument();
  });

  afterAll(cleanup);
});
