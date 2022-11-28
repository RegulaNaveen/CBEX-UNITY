import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow, render } from 'enzyme';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Approvals from '../index';
import getQuestionsFilters from '../../../../redux/selectors';
import { getSelectedBid } from '../../../../redux/selectors/proposal';
import {
  clearQuestionsFilterAction,
  onApplyQuestionsFilter,
} from '../../../../redux/actions/proposal-actions';
// import userEvent from '@testing-library/user-event';
// import { opportunityData } from './opportunityData';

import {
  getOpportunityData,
  getBidList,
} from '../../../../redux/selectors/proposal';
import selectQuestionsFilters from '../../../../redux/selectors/proposal';
import * as data from '../../Proposal/__tests__/data.json';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const ssoAuth = Map(Object.entries(data.ssoAuth));
const sidebar = Map(Object.entries(data.sidebar));
const notepad = Map(Object.entries(data.notepad));
const proposals = Map(Object.entries(data.proposals));
const proposal = fromJS(data.proposal);
const details = fromJS(data.details);

const proposalDetail = Map(Object.entries(data.proposalDetail));
const eventCategories = Map(Object.entries(data.eventCategories));
const questionsFilters = fromJS(data.questionsFilters);
const userActions = fromJS(data.userActions);
const milestones = fromJS(data.milestones);
const proposalID = fromJS(data.proposalID);
const selectedBid = fromJS(data.proposalID);

// const activeQuestionsFilterCount = data.activeQuestionsFilterCount;
// const filterMilestone = data.filterMilestone;
// const filteredSections = data.filteredSections;
// const isQuestionLoading = data.isQuestionLoading;
const userRole = fromJS(data.userRole);
// const allSectionsExpanded = data.allSectionsExpanded;
const sections = fromJS(data.sections);
// const oppData = Map(fromJS(opportunityData));

// const mockDispatch = store.dispatch;
// store.dispatch = jest.fn(mockDispatch);

let initialState = {
  ssoAuth,
  sidebar,
  notepad,
  proposal,
  proposals,
  sections,
  selectedBid,
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
  getQuestionsFilters: jest.fn(),
  getSelectedBid: jest.fn(),
  getOpportunityData: jest.fn(),
  getPriceModuler: jest.fn(),
  eventCategories,
  proposalDetail,
  questionsFilters,
  userActions,
  milestones,
  proposalID,

  // activeQuestionsFilterCount,
  // filterMilestone,
  // details,
  // filteredSections,
  // isQuestionLoading,
  userRole,
  // allSectionsExpanded,
  onAddQuestion: jest.fn(),
  expandAll: jest.fn(),
  AddNewQuestion: jest.fn(),
  RefreshProposal: jest.fn(),
  getBidList: jest.fn(),

  // expandAll: jest.fn(),
  currentTab: null,
};
describe('Testing approvals', () => {
  //   const mock = {
  //     proposalSelectors: jest.fn(),
  //   };
  //   const props = {
  //     applyQuestionsFilter: onApplyQuestionsFilter(),
  //     questionsFilters: getQuestionsFilters(),
  //     clearQuestionsFilter: clearQuestionsFilterAction(),
  //   };
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('render Approval component', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn(),
    };
    render(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    await expect(screen.queryAllByTestId('bid-history')).toBeTruthy();
  });
  test.skip('Test filter function', () => {
    const renderFilterFunc = jest.fn();
    const mockFunc = renderFilterFunc();
    expect(mockFunc).toBeUndefined();
    expect(renderFilterFunc).toHaveBeenCalledTimes(1);
    expect(renderFilterFunc).toHaveBeenCalledWith();
  });

  test('test component rendering', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn(),
    };
    const renderFilterFunc = jest.fn();
    const mockFunc = renderFilterFunc();
    expect(mockFunc).toBeUndefined();
    render(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    await expect(screen.queryAllByTestId('No_approvals')).toBeTruthy();
  });

  test.skip('Click event ', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn(),
    };
    render(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    screen.debug();
    const filterBtn = screen.getByTestId(/filter-btn/);
    expect(filterBtn).toBeTruthy();
    await fireEvent.click(filterBtn);
    screen.debug(filterBtn);
    await waitFor(() => {
      expect(screen.getByText(/Filters/i)).toBeTruthy();
    });
  });
});
