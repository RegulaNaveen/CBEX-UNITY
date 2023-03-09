import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import MyDocketTab from '../MyDocketTab';

describe('testing my docket tab', () => {
  const props = {
    proposals: [],
    loading: true,
    isFilteringProposals: false,
    filteredProposals: [],
    setPage: jest.fn(),
    setRows: jest.fn(),
    selectedViewType: true,
    allFlags: {}
  };
  test('render the component without being crashed', () => {
    const { container } = render(
      <Provider store={store}>
        <MyDocketTab props={props} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  test('check for filtered proposals', () => {
    const props = {
      proposals: [
        {
          'opportunity number': 'OPP123',
          'opportunity name': 'Test Opportunity',
          'bid due date': '2022-01-01',
          'opportunity status': 'Active'
        },
        {
          'opportunity number': 'OPP456',
          'opportunity name': 'Test Opportunity 2',
          'bid due date': '2022-02-01',
          'opportunity status': 'Inactive'
        }
      ],
      loading: false,
      isFilteringProposals: true,
      filteredProposals: [
        {
          'opportunity number': 'OPP123',
          'opportunity name': 'Test Opportunity',
          'bid due date': '2022-01-01',
          'opportunity status': 'Active'
        },
        {
          'opportunity number': 'OPP456',
          'opportunity name': 'Test Opportunity 2',
          'bid due date': '2022-02-01',
          'opportunity status': 'Inactive'
        }
      ],
      setPage: jest.fn(),
      setRows: jest.fn(),
      selectedViewType: false,
      allFlags: {
        answerUserTagFlag: true,
        approvalSendMailFlag: true,
        approvalsFlag: true,
        bidCostDetail: true,
        canLinkOpportunityNo: true,
        eventLauncher: true,
        isQuestionForCustomerEditable: true,
        notepad: true,
        notesUserTag: true,
        proposalTeamTab: true,
        questionsForCustomerTab: true,
        'schedule-events': false,
        searchFlag: true,
        showTimelineFlag: true,
        verticalTab: true
      }
    };
    const { container } = render(
      <Provider store={store}>
        <MyDocketTab props={props} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
