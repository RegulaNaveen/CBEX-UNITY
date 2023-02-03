/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from 'enzyme';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import Adapter from 'enzyme-adapter-react-16';
import * as data from '../../screens/Proposal/__tests__/data.json';
import UnityFooter from '../Footer';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const ssoAuth = Map(Object.entries(data.ssoAuth));
const sidebar = Map(Object.entries(data.sidebar));
const notepad = Map(Object.entries(data.notepad));
const proposals = Map(Object.entries(data.proposals));
const proposalDetail = Map(Object.entries(data.proposalDetail));
const eventCategories = Map(Object.entries(data.eventCategories));

const questionFilters = fromJS(data.questionFilters);
const userActions = fromJS(data.userActions);
const selectedBid = fromJS(data.selectedBid);
const milestones = fromJS(data.milestones);
const proposalID = fromJS(data.proposalID);
const userRole = fromJS(data.useRoles);
const proposal = fromJS(data.proposal);
const sections = fromJS(data.sectios);
const details = fromJS(data.details);

const initialState = {
  ssoAuth,
  sidebar,
  notepad,
  proposals,
  proposalDetail,
  eventCategories,
  questionFilters,
  userActions,
  selectedBid,
  milestones,
  proposalID,
  userRole,
  proposal,
  sections,
  details,
  setQuestion: jest.fn(),
  hasQuestionError: jest.fn(),
  editQuestionsData: jest.fn(),
  getProposalInfoUpdated: jest.fn(),
  fetchUsers: jest.fn(),
  applyQuestionsFilter: jest.fn(),
  handleIsCheckedAll: jest.fn(),
  setTabFromQuestionNotes: jest.fn(),
  onClose: jest.fn(),
  clearQuestionsFilter: jest.fn(),
  expandAllSections: jest.fn(),
  getQuestionsFilters: jest.fn(),
  getSelectedBid: jest.fn(),
  getOpportunityData: jest.fn(),
  getPriceModuler: jest.fn(),
  onAddQuestion: jest.fn(),
  expandAll: jest.fn(),
  AddNewQuestions: jest.fn(),
  RefreshProposal: jest.fn(),
  getBidList: jest.fn(),
  switchTempStatus: jest.fn(),
  currentTab: null
};

const props = {
  selectQuestionsFilters: jest.fn(),
  applyQuestionsFilter: jest.fn(),
  getOpportunityData: jest.fn(),
  getSelectedBid: jest.fn(),
  switchTempStatus: jest.fn()
};

describe('Test Footer Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('Load footer component', async () => {
    const { container } = await render(
      <Provider store={store}>
        <Router>
          <UnityFooter
            {...props}
            questionTemplateVersionNumber="version-0.29"
            opportunityType="Core Clinical"
          />
        </Router>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('Check click event on footer', async () => {
    const { queryByTestId } = await render(
      <Provider store={store}>
        <Router>
          <UnityFooter {...props} />
        </Router>
      </Provider>
    );
    expect(queryByTestId('sync-icon')).toBeInTheDocument();

    fireEvent.click(await queryByTestId('sync-icon'));
    expect(queryByTestId('switch-template')).toBeInTheDocument();
  });
});
