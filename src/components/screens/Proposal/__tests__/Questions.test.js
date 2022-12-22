/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import Proposal from '../index';
// import Questions from '../../../common/Question';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from './data.json';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { BrowserRouter as Router } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ssoAuth = Map(Object.entries(data.ssoAuth));
const sidebar = Map(Object.entries(data.sidebar));
const notepad = Map(Object.entries(data.notepad));
const proposals = Map(Object.entries(data.proposals));
const proposal = fromJS(data.proposal);
const details = fromJS(data.details);

const eventCategories = Map(Object.entries(data.eventCategories));
const proposalDetail = Map(Object.entries(data.proposalDetail));
const questionsFilters = fromJS(data.questionsFilters);
const userActions = fromJS(data.userActions);
const milestones = fromJS(data.milestones);
const proposalID = fromJS(data.proposalID);
const activeQuestionsFilterCount = data.activeQuestionsFilterCount;
const filterMilestone = data.filterMilestone;
const filteredSections = data.filteredSections;
const isQuestionLoading = data.isQuestionLoading;
const userRole = fromJS(data.userRole);
const allSectionsExpanded = data.allSectionsExpanded;
const sections = fromJS(data.sections);

let initalstate = {
  ssoAuth,
  sidebar,
  notepad,
  proposal,
  proposals,
  sections,
  setQuestion: jest.fn(),
  hasQuestionError: jest.fn(),
  editQuestionsData: jest.fn(),
  getProposalInfoUpdated: jest.fn(),
  fetchUsers: jest.fn(),
  applyQuestionsFilter: jest.fn(),
  resetQuestionsFilter: jest.fn(),
  handleIsCheckedAll: jest.fn(),
  setTabFromQuestionNotes: jest.fn(),
  onClose: jest.fn(),
  clearQuestionsFilter: jest.fn(),
  expandAllSections: jest.fn(),
  eventCategories,
  proposalDetail,
  questionsFilters,
  userActions,
  milestones,
  proposalID,
  activeQuestionsFilterCount,
  filterMilestone,
  details,
  filteredSections,
  isQuestionLoading,
  userRole,
  allSectionsExpanded,
  onAddQuestion: jest.fn(),
  expandAll: jest.fn(),
  AddNewQuestion: jest.fn(),
  RefreshProposal: jest.fn(),
  expandAll: jest.fn(),
  currentTab: null
};
const store = mockStore(initalstate);

describe.skip('Questions component', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <Router>
          {/* <Questions proposalID={initalstate.proposalID} {...initalstate} /> */}
        </Router>
      </Provider>
    );
  });

  test.only('Questions component Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <Router>
          {/* <Questions
            proposalID={initalstate.proposalID}
            {...initalstate}
            isQuestionsFiltersEnabled={false}
          /> */}
        </Router>
      </Provider>
    );
    expect(
      container.getElementsByClassName('question-text')
    ).toBeInTheDocument();
  });

  afterAll(cleanup);
});
