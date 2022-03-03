/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from '../../../views/modals/__test__/data.json'
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import Opportunity from '../index';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const ssoAuth = Map(Object.entries(data.ssoAuth));
const sidebar = Map(Object.entries(data.sidebar));
const notepad = Map(Object.entries(data.notepad));
const proposals = Map(Object.entries(data.proposals));
const proposal = Map(Object.entries(data.proposal));
const question = fromJS(data.question)
let initalstate = {
    ssoAuth,
    sidebar,
    notepad,
    proposals,
    question,
    proposal,
}
const store = mockStore(initalstate);


describe('Opportunity component', () => {
  beforeAll(() => {
    render(<Provider store={store}><Opportunity {...initalstate} /></Provider>)
  });

  test('Opportunity component header', async () => {
    await render(<Provider store={store}><Opportunity {...initalstate} /></Provider>);
    expect(screen.getByText(/IQVIA™Unity/i)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
