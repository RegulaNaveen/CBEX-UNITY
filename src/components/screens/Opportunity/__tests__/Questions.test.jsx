/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import Questions from '../Questions';
import data from './mockdata/question.json';
import Sidebar from '../../../views/Sidebar';

configure({ adapter: new Adapter() });

const filterDataMap = {
  answerGroup: {
    answered: Map({
      checked: false,
      label: 'Answered',
      className: 'questions-filter__row1-col1'
    }),
    unanswered: Map({
      checked: false,
      label: 'Unanswered',
      className: 'questions-filter__row1-col1'
    }),
    logic: 'OR'
  },
  rolegroup: {
    myUserRole: Map({
      checked: false,
      label: 'Responsible',
      className: 'questions-filter__row1-col1'
    }),
    interestedParty: Map({
      checked: false,
      label: 'Informed',
      className: 'questions-filter__row2-col1'
    }),
    showInactiveQuestions: Map({
      checked: false,
      label: 'Include N/A Questions',
      className: 'questions-filter__row3-col1'
    }),
    logic: 'AND'
  },
  milestoneGroup: {
    Overview: Map({
      checked: false,
      label: 'Overview',
      className: 'questions-filter__item'
    }),
    'Data Planning': Map({
      checked: false,
      label: 'Data Planning',
      className: 'questions-filter__item'
    }),
    Text: Map({
      checked: false,
      label: 'Text',
      className: 'questions-filter__item'
    }),
    Budget: Map({
      checked: false,
      label: 'Budget',
      className: 'questions-filter__item'
    }),
    Team: Map({
      checked: false,
      label: 'Team',
      className: 'questions-filter__item'
    }),
    'Follow-Up': Map({
      checked: false,
      label: 'Follow-Up',
      className: 'questions-filter__item'
    }),
    logic: 'OR'
  }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
data.proposal.selectedBid = Map(data.proposal.selectedBid);
data.editQuestionsData = Map(data.editQuestionsData);
data.getBid = Map(data.getBid);
data.proposal.questionsFilter.answerGroup = Map(
  data.proposal.questionsFilter.answerGroup
);
data.proposal.questionsFilter.rolegroup = Map(filterDataMap.rolegroup);
data.proposal.questionsFilter.milestoneGroup = Map(
  filterDataMap.milestoneGroup
);
data.proposal.questionsFilter = Map(data.proposal.questionsFilter);
data.setQuestion = Map(data.setQuestion);
data.sidebar = Map(data.sidebar);
data.proposal = Map(data.proposal);
data.ssoAuth = Map(data.ssoAuth);

const initalstate = {
  ...data,
  ...{
    expandAllSections: jest.fn(),
    fetchUsers: jest.fn(),
    applyQuestionsFilter: jest.fn(),
    callPickListLookupSfData: jest.fn(),
    clearQuestionsFilter: jest.fn(),
    fetchUserTagFlagInQuestion: jest.fn(),
    getPriceModeler: jest.fn(),
    getProposalInfoUpdated: jest.fn(),
    handleOpenClose: jest.fn(),
    handleShowNaCheckbox: jest.fn(),
    resetQuestionsFilter: jest.fn()
  }
};
const store = mockStore(initalstate);
const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89103'
    }
  ]
});

describe('Questions component', () => {
  test('Questions component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
    const { getByText, queryByTestId } = await render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Questions {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText('Mark N/A')).toBeInTheDocument();
    expect(getByText('Expand All')).toBeInTheDocument();
    expect(queryByTestId('addquestionbtn')).toBeInTheDocument();
  });

  test('Questions Sidebar component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
    const { findByText } = await render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Questions {...initalstate}>
              <Sidebar {...initalstate} />
            </Questions>
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(await findByText('Controls')).toBeInTheDocument();
  });

  test('Questions Questions component state check', async () => {
    const state = {
      showModal: false,
      selectedQuestionForHistory: '',
      isHistoryModalShown: false,
      currentsection: '',
      currentTab: 0,
      selectedtitle: '',
      heighlightcard: false,
      showFilter: false,
      sidebarscroll: '',
      open: false,
      isNotepadOpen: true,
      totalWidth: 1280,
      proposalNoteRender: true
    };
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));

    const wrapper = shallow(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Questions {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );

    const component = wrapper.dive();
    component.setState(state);
    expect(wrapper.length).toBeGreaterThan(0);
    expect(component.state().showModal).toBe(false);
  });
  afterAll(cleanup);
});
