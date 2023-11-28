/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmailTemplates from '../EmailTemplates';
import StateData from './mockdata/eventlauncher.json';
import { INITIAL_STATE as searchInitialState } from '../../../../redux/reducers/search';

const proposal = StateData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

const initState = {
  ssoAuth: Map(StateData.ssoAuth),
  proposalDetail: StateData.proposalDetail,
  emailTemplates: StateData.emailTemplates,
  questionData: Map(StateData.questionData),
  proposal: Map(proposal),
  search: searchInitialState
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);

describe('Email Template component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Email Template render component', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    initState.search.searchResults = [
      {
        tab: 0,
        searchIndex: 'c0244c07-1167-4a72-808c-aa5da980cfd2',
        inputText: 'Test Tooltip',
        vTab: 4,
        startIndex: 0,
        endIndex: 12,
        matchIndex: 0,
        tabName: 'Strategy Development',
        sectionName: null
      }
    ];
    initState.search.autoNavigatedToCurrentResult = false;
    initState.search.currentResultIndex = 0;
    const { container, getAllByText } = await render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(await getAllByText(/Email Templates/i)?.[0]).toBeInTheDocument();
  });

  test('should check useEffect with autoNavigatedToCurrentResult is false and searchResults as true', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    initState.search.searchResults = [
      {
        tab: 0,
        searchIndex: 'c0244c07-1167-4a72-808c-aa5da980cfd2',
        inputText: 'Test Tooltip',
        vTab: 4,
        startIndex: 0,
        endIndex: 12,
        matchIndex: 0,
        tabName: 'Strategy Development',
        sectionName: null
      }
    ];
    initState.search.autoNavigatedToCurrentResult = false;
    initState.search.currentResultIndex = 0;
    const { container } = render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('Email Template on load', async () => {
    const { container } = render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const expandButton = screen.getAllByTestId('expand-cell');
    fireEvent.click(expandButton[0]);

    const emailButton = screen.getAllByTestId('email-btn');
    fireEvent.click(emailButton[0]);
  });

  test('Email Template on load else condition', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    initState.search.searchResults = [];
    initState.search.autoNavigatedToCurrentResult = true;
    initState.search.currentResultIndex = -1;
    const { container } = render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const expandButton = screen.getAllByTestId('expand-cell');
    fireEvent.click(expandButton[0]);
    const emailButton = screen.getAllByTestId('email-btn');
    fireEvent.click(emailButton[0]);
  });

  test('should check isLoadingEmailTemplates false condition', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    initState.emailTemplates.emailTemplatesList = [];
    const { container, getByText } = await render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(
      getByText(/No Email Templates available for this Opportunity Type/i)
    ).toBeInTheDocument();
  });

  test('should check isLoadingEmailTemplates true condition', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = true;
    initState.emailTemplates.emailTemplatesList = [];
    const { container, getByText } = await render(
      <Provider store={store}>
        <EmailTemplates />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
