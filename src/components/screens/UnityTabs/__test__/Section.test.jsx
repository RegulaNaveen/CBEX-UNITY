import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { UnityTabContext } from '../Section';
import Section from '../Section';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Map } from 'immutable';

const initialState = {
  unitytab: {
    fetching: false,
    allTabs: {
      '66d7fad9-7e46-4590-8c57-e9991e82dbb1': [
        {
          UnityTabSectionOrder: 1,
          UnityTabSectionId: '42e7cf75-e173-4769-8247-6b3a243bbdfa',
          UnityTabSectionQuestions: ['2b660f6f-f888-43b7-9650-66e6aa8f22f5'],
          UnityTabSectionTitle: 'testt5362',
          TabID: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabOrder: 3,
          UnityTabId: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabTitle: 'Testing5362'
        }
      ]
    },
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
      }
    ]
  },
  search: {
    autoNavigatedToCurrentResult: true
  },
  proposal: Map({
    eventflag: {
      RFIInBidHistory: true,
      answerUserTagFlag: true,
      approvalSendMailFlag: true,
      approvalsFlag: true,
      bidCostDetail: true,
      canLinkOpportunityNo: true,
      carryForwardAnswerFlag: true,
      customOpportunityNameFlag: true,
      earlyEngagementInBidHistory: true,
      emailTemplatesFlag: true,
      eventLauncher: true,
      favouriteFlag: true,
      isQuestionForCustomerEditable: true,
      notepad: true,
      notepadLinker: true,
      notesUserTag: true,
      postAwardInBidHistory: true,
      proposalTeamTab: true,
      questionsForCustomerTab: true,
      'schedule-events': false,
      searchFlag: true,
      showTimelineFlag: true,
      verticalTab: true
    },
    proposalQuestions: [
      {
        proposalId: '0e75d317-da43-48ca-ace9-ecd11cb2dfa4',
        questionId: '2b660f6f-f888-43b7-9650-66e6aa8f22f5',
        section: {
          sectionOrder: 35,
          sectionName: 'Testing5362'
        },
        questionText: 'TestingCustomTab',
        answerConfiguration: {
          type: 'text',
          options: []
        },
        roleNames: ['Data Management'],
        answers: [],
        questionOrder: 1,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [
          {
            Name: 'Follow-Up',
            Color: '#df216d'
          }
        ],
        opportunityType:
          'Default Type,Clinical (APAC),Clinical (AMR/EMEA),Early Engagement',
        businessRule:
          '{"conditions":[{"operator":"Or","condition":[{"fieldName":"b7186e4c-962f-4886-9f83-d3e0f99b5986","fieldValue":["testqa"],"answerRelationship":"Or","Operator":"Equal"}],"action":[{"fieldName":"2b660f6f-f888-43b7-9650-66e6aa8f22f5","fieldValue":["testqa"],"fieldAction":"Equal","action":"setAnswer"}]}]}',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"2381f","text":"TestingCustomTab","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="e367t" data-offset-key="2381f-0-0"><div data-offset-key="2381f-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="2381f-0-0"><span data-text="true">TestingCustomTab</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'RFI_Request'
      }
    ]
  })
};

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const store = mockStore(initialState);
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

describe('Section Component', () => {
  const defaultProps = {
    sectionId: '42e7cf75-e173-4769-8247-6b3a243bbdfa',
    title: 'Testing5362',
    tabId: '66d7fad9-7e46-4590-8c57-e9991e82dbb1'
  };

  it('renders without crashing', async () => {
    const { container } = render(
      <Provider store={store}>
        <UnityTabContext.Provider value={{ dispatchLoadingEvent: jest.fn() }}>
          <Section {...defaultProps} />
        </UnityTabContext.Provider>
      </Provider>
    );
    screen.debug(undefined, Infinity);

    expect(container).toBeTruthy();
  });
});
