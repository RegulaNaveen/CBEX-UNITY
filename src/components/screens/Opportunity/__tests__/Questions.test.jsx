/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import React, { Suspense } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from '../../../../store';
import Questions from '../Questions';
import data from './mockdata/question.json';
import lazyWithRetry from '../../../../utils/lazy';
import { SocketContext } from '../../../../context/SocketContext';

const Sidebar = React.lazy(() =>
  lazyWithRetry(() =>
    import(/* webpackChunkName: "Sidebar" */ '../../../views/Sidebar')
  )
);

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

data.proposal.editQuestionsData = Map(data.proposal.editQuestionsData);
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
data.sidebar = Map(data.Sidebar);
data.proposal = Map(data.proposal);
data.ssoAuth = Map(data.ssoAuth);
data.selectedBid = Map(data.selectedBid);
data.eventCategories.pd = jest.fn();

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

const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89103'
    }
  ]
});

const QuestionsWReduxAndSocket = () => (
  <BrowserRouter>
    <Router history={history}>
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            socket: null,
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn(),
            questionLockDetailsWrapper: jest.fn()
          }}
        >
          <Questions {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    </Router>
  </BrowserRouter>
);

describe('Questions component', () => {
  afterEach(cleanup);
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  test('Questions component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };

    const { getByText, queryByTestId } = await render(
      <QuestionsWReduxAndSocket />
    );
    expect(getByText('Mark N/A')).toBeInTheDocument();
    expect(getByText('Expand All')).toBeInTheDocument();
    expect(queryByTestId('addquestionbtn')).toBeInTheDocument();
  });

  test.skip('Questions Sidebar component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const { findByText } = await render(<QuestionsWReduxAndSocket />);
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

    const wrapper = shallow(<QuestionsWReduxAndSocket />);

    const component = wrapper.dive();
    component.setState(state);
    expect(wrapper.length).toBeGreaterThan(0);
    expect(component.state().showModal).toBe(false);
  });

  test.skip('Questions component model render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const { getByTestId } = await render(<QuestionsWReduxAndSocket />);
    expect(getByTestId('selectedbid-testid')).toBeInTheDocument();
    fireEvent.click(getByTestId('selectedbid-testid'));
    expect(getByTestId('question-model-testid')).toBeInTheDocument();
  });

  test('Questions component expand all render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const { getByText } = await render(<QuestionsWReduxAndSocket />);
    fireEvent.change(getByText('Expand All'));
    expect(getByText('Expand All')).toBeEnabled();
  });

  test('Questions component filter button render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const { findByText, getByText } = await render(
      <QuestionsWReduxAndSocket />
    );
    await fireEvent.click(getByText('Filter'));
    const filterelem = await findByText('Filters');
    const clearbtn = await findByText('Clear All');
    expect(filterelem).toBeInTheDocument();
    expect(clearbtn).toBeInTheDocument();
    await fireEvent.click(getByText('Clear All'));

    const answeredBtn = getByText('Answered');
    fireEvent.click(answeredBtn);
    expect(answeredBtn).toBeEnabled();
  });

  test('Questions component mark NA render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    const { findByText, getByText, getByTestId } = await render(
      <QuestionsWReduxAndSocket />
    );
    fireEvent.click(getByText('Mark N/A'));

    fireEvent.change(getByTestId('mark-na-btn'));
    expect(getByTestId('mark-na-btn')).toBeEnabled();

    const tooltipButton = getByTestId('questions-tooltip-button');
    fireEvent.click(tooltipButton);
    expect(getByTestId('questions-popover')).toBeInTheDocument();
  });

  test('Questions component Sidebar component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    initalstate.sidebar = initalstate.sidebar.toJS();
    initalstate.sidebar.isOpen = true;
    initalstate.sidebar = Map(initalstate.sidebar);
    const { getByTestId, findByText } = await render(
      <QuestionsWReduxAndSocket />
    );
    const sidebaricon_newQuestionAdd = await getByTestId(
      'sidebar-panel-testid'
    );
    await fireEvent.click(sidebaricon_newQuestionAdd);
    await fireEvent.click(getByTestId('expandall-testid'));
    await fireEvent.click(getByTestId('tab-testid'));
    // expect(await findByText(/Proposal Team/)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
