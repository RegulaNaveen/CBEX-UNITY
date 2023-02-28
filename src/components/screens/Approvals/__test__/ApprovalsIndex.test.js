import React from 'react';
import '@testing-library/jest-dom';
import * as ReactDOM from 'react-dom';
import {
  render as reactTestingRender
} from '@testing-library/react';
import { Map, fromJS } from 'immutable';
import { Provider } from 'react-redux';
import Sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../../store';
import Approvals from '../index';
import * as data from '../../Proposal/__tests__/data.json';
import { allApprovals, quesHashData } from './data';
import * as ApprovalActions from '../../../../redux/actions/approval-actions';
import * as ProposalActions from '../../../../redux/actions/proposal-actions';

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
const userRole = fromJS(data.userRole);
const sections = fromJS(data.sections);
const approvals = {
  allApprovals,
  quesHashData,
  filters: [
    {
      name: 'answered',
      displayName: 'Answered',
      group: 'answer',
      value: false
    },
    {
      name: 'unanswered',
      displayName: 'Unanswered',
      group: 'answer',
      value: false
    },
    {
      name: 'responsible',
      displayName: 'Responsible',
      group: 'roles',
      value: false
    },
    {
      name: 'informed',
      displayName: 'Informed',
      group: 'roles',
      value: false
    }
  ]
};

let initialState = {
  ssoAuth,
  sidebar,
  approvals,
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
  userRole,
  onAddQuestion: jest.fn(),
  expandAll: jest.fn(),
  AddNewQuestion: jest.fn(),
  RefreshProposal: jest.fn(),
  getBidList: jest.fn(),
  currentTab: null
};
describe('Testing approvals', () => {
  let sinonSandbox;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
    sinonSandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  test('render Approval component', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn()
    };

    sinonSandbox
      .stub(ApprovalActions, 'fetchAllApprovals')
      .returns({ type: 'FETCH_ALL_APPROVALS' });
    sinonSandbox
      .stub(ApprovalActions, 'fetchApprovalSendEmailFlag')
      .returns({ type: 'fetchApprovalSendEmailFlag' });
    sinonSandbox
      .stub(ProposalActions, 'getPriceModelerData')
      .returns({ type: 'GET_PRICE_MODELERDATA' });
    const { queryAllByTestId } = reactTestingRender(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    await expect(queryAllByTestId('bid-history')).toBeTruthy();
  });
  test.skip('Test filter function', () => {
    const renderFilterFunc = jest.fn();
    const mockFunc = renderFilterFunc();
    expect(mockFunc).toBeUndefined();
    expect(renderFilterFunc).toHaveBeenCalledTimes(1);
    expect(renderFilterFunc).toHaveBeenCalledWith();
  });

  test('test component when there is no approval', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn()
    };
    const renderFilterFunc = jest.fn();
    const mockFunc = renderFilterFunc();
    expect(mockFunc).toBeUndefined();
    sinonSandbox
      .stub(ApprovalActions, 'fetchAllApprovals')
      .returns({ type: 'FETCH_ALL_APPROVALS' });
    sinonSandbox
      .stub(ApprovalActions, 'fetchApprovalSendEmailFlag')
      .returns({ type: 'fetchApprovalSendEmailFlag' });
    sinonSandbox
      .stub(ProposalActions, 'getPriceModelerData')
      .returns({ type: 'GET_PRICE_MODELERDATA' });
    const { queryAllByTestId } = reactTestingRender(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    await expect(queryAllByTestId('No_approvals')).toBeTruthy();
  });

  test('Click event ', async () => {
    const props = {
      applyQuestionsFilter: jest.fn(),
      clearQuestionsFilter: jest.fn(),
      selectQuestionsFilters: jest.fn(),
      getSelectedBid: jest.fn(),
      getOpportunityData: jest.fn()
    };
    sinonSandbox
      .stub(ApprovalActions, 'fetchAllApprovals')
      .returns({ type: 'FETCH_ALL_APPROVALS' });
    sinonSandbox
      .stub(ApprovalActions, 'fetchApprovalSendEmailFlag')
      .returns({ type: 'fetchApprovalSendEmailFlag' });
    sinonSandbox
      .stub(ProposalActions, 'getPriceModelerData')
      .returns({ type: 'GET_PRICE_MODELERDATA' });
    reactTestingRender(
      <Provider store={store}>
        <Router>
          <Approvals {...props} />
        </Router>
      </Provider>
    );
    expect('.filter-icon').toBeTruthy();
    expect('.no-approval-wrapper').toBeTruthy();
  });
});
