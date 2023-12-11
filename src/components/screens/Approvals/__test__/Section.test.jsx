// Q: write unit test case for section.jsx file?
//
// // Path: src\components\screens\Approvals\__test__\Section.test.jsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Section from '../Section';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Map } from 'immutable';
import { SocketContext } from '../../../../context/SocketContext';

const initialState = {
  approvals: {
    allApprovals: [
      {
        ApprovalSectionTitle: 'Budget Sign-Offs',
        ApprovalSectionRightQuestions: [
          '688605ca-05fd-4259-9372-a71ce17172d3',
          '63caf3e9-075c-4d42-888c-675d19c1d6b3'
        ],
        ApprovalSectionId: '06e1ea4c-b60a-4041-8905-85101c39ab84',
        ApprovalSectionOrder: 1,
        ApprovalSectionLeftQuestions: [
          'Opportunity Overview-Z4X',
          'd0b52140-0d00-4cd5-a613-caa815d94ab8',
          '127585af-daaa-4a04-a047-217b43dfbfde',
          '831e7437-0614-42ee-91b4-ecfac299bdeb',
          'b10c53ee-5f6c-4f1f-a77c-92dc60781105',
          '1cc4581d-f994-460c-8cef-3fac2fa8a66e',
          'd9d947a6-fc0b-4045-8227-722b53be97c9'
        ],
        ArchivedData: [],
        key: '06e1ea4c-b60a-4041-8905-85101c39ab84-1701942855291'
      },
      {
        ApprovalSectionTitle: 'testsapthmi',
        ApprovalSectionRightQuestions: [
          'Opportunity Overview-H1X',
          'd9307977-2ce0-4b75-b733-3be9d64d8431',
          '32d45245-1acf-4db8-a139-11295813d7aa',
          '12c97e1c-0719-47ee-89f5-1bafcf65685e'
        ],
        ApprovalSectionId: '68513de6-87cc-45cd-884d-029eb761167d',
        ApprovalSectionOrder: 10,
        ApprovalSectionLeftQuestions: [
          'Proposal Team-P0X',
          '06369a60-5886-410e-adae-8f6d4ada2af7',
          'a967a538-7d53-46d2-961a-3229bf22585c',
          '73f58b28-a59c-4187-b351-59efbc0d48f1',
          'f6f993a8-a32a-4072-99e1-6987a769bdf5'
        ],
        ArchivedData: [],
        key: '68513de6-87cc-45cd-884d-029eb761167d-1701938460453'
      },
      {
        ApprovalSectionTitle: 'UPA and BL Test',
        ApprovalSectionRightQuestions: [
          'a7393aee-fa23-4361-baf2-2693c371b92b',
          'd527dd7b-dcf1-43c2-b9c5-20428d22d02e'
        ],
        ApprovalSectionId: 'ffc0e94b-1725-462a-a89b-ce7797efdfcc',
        ApprovalSectionOrder: 15,
        ApprovalSectionLeftQuestions: [
          '3477fbc7-09fa-4859-ad98-14cb8db6bfa6',
          '28c3f5a3-afdc-4584-9150-85730be20463',
          'f3ccc0f9-2e67-46a8-a3df-d90a561d0744'
        ],
        ArchivedData: [],
        key: 'ffc0e94b-1725-462a-a89b-ce7797efdfcc-1701942855291'
      }
    ],
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
    query: null,
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
    selectedBid: Map({
      isCurrent: true,
      id: '764a8ac5-43a0-469e-9054-03e51189633b'
    }),
    proposalQuestions: [
      {
        '803b33d5-8cd9-4211-95de-89b121d06aa1': {
          proposalId: '764a8ac5-43a0-469e-9054-03e51189633b',
          questionId: '803b33d5-8cd9-4211-95de-89b121d06aa1',
          section: {
            sectionOrder: 20,
            sectionName: 'Approvals'
          },
          questionText: 'Supporting material URL',
          answerConfiguration: {
            type: 'text',
            options: []
          },
          roleNames: ['Proposal Developer'],
          answers: [
            {
              user: 'varsha.kumari2@iqvia.com',
              userName: 'Varsha Kumari',
              userRole: 'Proposal Developer',
              date: '2023-12-07T09:09:15.033Z',
              answer: 'test',
              formattedAnswer: {
                value: {
                  blocks: [
                    {
                      key: 'cnsat',
                      text: 'test',
                      type: 'unstyled',
                      depth: 0,
                      inlineStyleRanges: [],
                      entityRanges: [],
                      data: {}
                    }
                  ],
                  entityMap: {}
                },
                html:
                  '<div data-contents="true"><div data-block="true" data-editor="b9nni" data-offset-key="cnsat-0-0"><div data-offset-key="cnsat-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cnsat-0-0"><span data-text="true">test</span></span></div></div></div>'
              },
              proposalId: '764a8ac5-43a0-469e-9054-03e51189633b',
              updatedInPG: true
            }
          ],
          questionOrder: 4,
          visible: true,
          locked: true,
          sfObject: 'n/a',
          sfField: 'n/a',
          milestoneNew: [],
          interestedParties:
            'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Feasibility,Global Site Activation (GSA),Medical Strategy Lead,Project Lead,Proposal Developer,Site Analytics,Therapeutic Strategy Lead,Global Analytics',
          opportunityType:
            'Default Type,Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
          hasDifferentSFanswer: false,
          isCustomQuestion: false,
          questionJSON:
            '{"blocks":[{"key":"est6j","text":"Supporting material URL","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionHTML:
            '<div data-contents="true"><div data-block="true" data-editor="1vpm6" data-offset-key="est6j-0-0"><div data-offset-key="est6j-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="est6j-0-0"><span data-text="true"> Strategy: Supporting material URL</span></span></div></div></div>',
          questionHintJSON: '',
          questionHintHTML: '',
          active: true,
          integration: '',
          events: '',
          notApplicable: false,
          questionApproval: true,
          bidAnswerCopy: false,
          latestAnsweredBidNo: null,
          bidType: 'Clinical_Bid'
        }
      }
    ],
    opportunityData: Map({
      '764a8ac5-43a0-469e-9054-03e51189633b': {
        proposal: {
          proposalId: '764a8ac5-43a0-469e-9054-03e51189633b',
          approvals: {
            ApprovalSectionTitle: 'Budget Sign-Offs',
            ApprovalSectionRightQuestions: [
              '688605ca-05fd-4259-9372-a71ce17172d3',
              '63caf3e9-075c-4d42-888c-675d19c1d6b3'
            ],
            ApprovalSectionId: '06e1ea4c-b60a-4041-8905-85101c39ab84',
            ApprovalSectionOrder: 1,
            ApprovalSectionLeftQuestions: [
              'Opportunity Overview-Z4X',
              'd0b52140-0d00-4cd5-a613-caa815d94ab8',
              '127585af-daaa-4a04-a047-217b43dfbfde',
              '831e7437-0614-42ee-91b4-ecfac299bdeb',
              'b10c53ee-5f6c-4f1f-a77c-92dc60781105',
              '1cc4581d-f994-460c-8cef-3fac2fa8a66e',
              'd9d947a6-fc0b-4045-8227-722b53be97c9'
            ],
            ArchivedData: [],
            key: '06e1ea4c-b60a-4041-8905-85101c39ab84-1701942855291'
          }
        },
        proposalQuestions: [
          {
            '803b33d5-8cd9-4211-95de-89b121d06aa1': {
              proposalId: '764a8ac5-43a0-469e-9054-03e51189633b',
              questionId: '803b33d5-8cd9-4211-95de-89b121d06aa1',
              section: {
                sectionOrder: 20,
                sectionName: 'Approvals'
              },
              questionText: 'Supporting material URL',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              roleNames: ['Proposal Developer'],
              answers: [
                {
                  user: 'varsha.kumari2@iqvia.com',
                  userName: 'Varsha Kumari',
                  userRole: 'Proposal Developer',
                  date: '2023-12-07T09:09:15.033Z',
                  answer: 'test',
                  formattedAnswer: {
                    value: {
                      blocks: [
                        {
                          key: 'cnsat',
                          text: 'test',
                          type: 'unstyled',
                          depth: 0,
                          inlineStyleRanges: [],
                          entityRanges: [],
                          data: {}
                        }
                      ],
                      entityMap: {}
                    },
                    html:
                      '<div data-contents="true"><div data-block="true" data-editor="b9nni" data-offset-key="cnsat-0-0"><div data-offset-key="cnsat-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cnsat-0-0"><span data-text="true">test</span></span></div></div></div>'
                  },
                  proposalId: '764a8ac5-43a0-469e-9054-03e51189633b',
                  updatedInPG: true
                }
              ],
              questionOrder: 4,
              visible: true,
              locked: true,
              sfObject: 'n/a',
              sfField: 'n/a',
              milestoneNew: [],
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Feasibility,Global Site Activation (GSA),Medical Strategy Lead,Project Lead,Proposal Developer,Site Analytics,Therapeutic Strategy Lead,Global Analytics',
              opportunityType:
                'Default Type,Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
              hasDifferentSFanswer: false,
              isCustomQuestion: false,
              questionJSON:
                '{"blocks":[{"key":"est6j","text":"Supporting material URL","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="1vpm6" data-offset-key="est6j-0-0"><div data-offset-key="est6j-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="est6j-0-0"><span data-text="true"> Strategy: Supporting material URL</span></span></div></div></div>',
              questionHintJSON: '',
              questionHintHTML: '',
              active: true,
              integration: '',
              events: '',
              notApplicable: false,
              questionApproval: true,
              bidAnswerCopy: false,
              latestAnsweredBidNo: null,
              bidType: 'Clinical_Bid'
            }
          }
        ],
        proposalUsers: [
          {
            userEmail: 'komalvijaykumar.mulik@iqvia.com',
            userName: 'Komal Vijaykumar Mulik',
            userId: '1148010'
          }
        ],
        isCurrent: true
      }
    })
  })
};

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

const store = mockStore(initialState);
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

describe('Section Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    sectionId: '06e1ea4c-b60a-4041-8905-85101c39ab84',
    title: 'Budget Sign-Offs',
    testVisibility: true,
    handleChange: jest.fn(),
    isExpandAll: true
  };

  it('should render section', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ approvalSectionDuplicatingWrapper: jest.fn() }}
        >
          <Section {...props} />
        </SocketContext.Provider>
      </Provider>
    );

    expect(getByTestId('accordion-test')).toBeTruthy();
  });

  it('should render section title', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ approvalSectionDuplicatingWrapper: jest.fn() }}
        >
          <Section {...props} />
        </SocketContext.Provider>
      </Provider>
    );

    screen.debug(undefined, Infinity);
    const accordion = getAllByRole(
      'button',
      { hidden: true },
      {
        name: /budget sign\-offs/i
      }
    )[0];
    expect(accordion).toBeTruthy();
    fireEvent.click(accordion);
    const duplicateBtn = screen.getAllByRole(
      'button',
      { hidden: true },
      { name: /duplicate/i }
    )[1];
    expect(duplicateBtn).toBeTruthy();
    fireEvent.click(duplicateBtn);
  });

  it('should render add new question button', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ approvalSectionDuplicatingWrapper: jest.fn() }}
        >
          <Section {...props} />
        </SocketContext.Provider>
      </Provider>
    );

    const accordion = getAllByRole(
      'button',
      { hidden: true },
      {
        name: /budget sign\-offs/i
      }
    )[0];
    expect(accordion).toBeTruthy();
    fireEvent.click(accordion);
    const addNewQuestionBtn = screen.getByText(/Add New Question/i);
    expect(addNewQuestionBtn).toBeInTheDocument();
  });
});
