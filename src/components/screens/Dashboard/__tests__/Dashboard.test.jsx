import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import Dashboard from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard', () => {
  let wrapper;

  beforeEach(() => {
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
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard {...props} />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a Toolbar component', () => {
    expect(wrapper.find('Toolbar')).toHaveLength(1);
  });

  it('renders a Tabbar component with four tabs', () => {
    expect(wrapper.find('Tabbar')).toHaveLength(1);
    expect(wrapper.find('TabItem')).toHaveLength(3);
  });
});
