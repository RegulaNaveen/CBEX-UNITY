/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from './sidebar.json';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../../views/Sidebar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const eventCategories = Map(data.eventCategories);
const id = data.id;
const sections = fromJS(data.sections);
const notes = jest.fn();
const proposalDetail = jest.fn();
const sidebar = Map(Object.entries(data.sidebar));
const proposal = fromJS(data.proposal);
const notepad = fromJS(data.notepad);
let initalstate = {
  id,
  eventCategories,
  sections,
  currentTab: 0,
  selectedtitle: '',
  heighlightcard: false,
  isOpen: false,
  notepad,
  proposalDetail,
  proposal,
  notes,
  sidebar,
  expandAll: jest.fn(),
  AddNewQuestion: jest.fn(),
  RefreshProposal: jest.fn(),
  setSelectedSection: jest.fn(),
  handleOpenClose: jest.fn(),
  change: jest.fn(),
  setTabFromQuestionNotes: jest.fn()
};
const store = mockStore(initalstate);

describe.skip('Sidebar component', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar {...initalstate} />
        </Router>
      </Provider>
    );
  });

  test.only('Sidebar section Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <Router>
          <Sidebar {...initalstate} />
        </Router>
      </Provider>
    );
    expect(
      container.getElementsByClassName('sidebar-content-list').length
    ).toBeGreaterThan(0);
  });

  afterAll(cleanup);
});
