/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import * as data from '../__tests__/mockdata/document.json';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import Documents from '../Documents';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ssoAuth = Map(Object.entries(data.ssoAuth));
const proposals = Map(Object.entries(data.proposals));
const proposal = Map(Object.entries(data.proposal));
const question = fromJS(data.question);
let initalstate = {
  ssoAuth,
  proposals,
  question,
  proposal
};
const store = mockStore(initalstate);

describe.skip('Documents component', () => {
  beforeAll(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents
            {...initalstate}
            boxLinks={data.boxLinks}
            bids={data.bids}
            match={data.match}
            proposalDetail={data.proposalDetail}
          />
        </Provider>
      </BrowserRouter>
    );
  });

  test('Documents box location header', async () => {
    await render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents
            {...initalstate}
            boxLinks={data.boxLinks}
            bids={data.bids}
            match={data.match}
            proposalDetail={data.proposalDetail}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Box Locations/i).length).toBeGreaterThan(0);
  });

  test('Documents check Bids link', async () => {
    const { container } = await render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents
            {...initalstate}
            boxLinks={data.boxLinks}
            bids={data.bids}
            match={data.match}
            proposalDetail={data.proposalDetail}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(
      container.getElementsByClassName('bidlist-document').length
    ).toBeGreaterThan(0);
  });

  test('Documents check additional link', async () => {
    const { container } = await render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents
            {...initalstate}
            boxLinks={data.boxLinks}
            bids={data.bids}
            match={data.match}
            proposalDetail={data.proposalDetail}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(
      container.getElementsByClassName('additionalink-document').length
    ).toBeGreaterThan(0);
  });

  test('open bid folder', async () => {
    const { container } = await render(
      <BrowserRouter>
        <Provider store={store}>
          <Documents
            {...initalstate}
            boxLinks={data.boxLinks}
            bids={data.bids}
            match={data.match}
            proposalDetail={data.proposalDetail}
          />
        </Provider>
      </BrowserRouter>
    );
    fireEvent.click(
      await container.querySelector('.additionalink-document > li')
    );
  });

  afterAll(cleanup);
});
