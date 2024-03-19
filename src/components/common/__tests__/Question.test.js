import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { List, Map, OrderedMap } from 'immutable';
import { store } from '../../../store';
import { API } from '../../../constants';
import { axiosInstance } from '../../../store';
import Question from '../Question';
import configureStore from 'redux-mock-store';
import * as data from '../__tests__/data.json';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';
import SocketContext from '../../../context/SocketContext';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cloneData = cloneDeep(data);
const editquestion = Map({
  questionId: 'e256f59e-08d7-4035-abc4-051346138a3d',
  questionAnswered: false,
  section: 'Program Details - COMING SOON',
  questionJSON: '',
  questionHTML: '',
  roleNames: List(['BD Leadership']),
  questionText: 'ADN1',
  questionHintJSON: '',
  answerType: 'number',
  tabId: '04bb872c-9d48-4514-be16-fba5eb7fd789'
});
cloneData.proposal.unityTabQuestionLoading = Map({
  questionId: '',
  value: false
});
cloneData.proposal.opportunityData = Map({});
cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
cloneData.proposal.editQuestionsData = editquestion;
cloneData.proposal.getAnswerTypesDataF = jest.fn();
cloneData.proposal.getRolesInfoF = jest.fn();
cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
cloneData.proposal.questionsFilter = Map({});
const initialState = {
  ssoAuth: Map(data.ssoAuth),
  proposal: Map(cloneData.proposal),
  proposals: Map(cloneData.proposals),
  selectedBid: Map(cloneData.selectedBid),
  proposalQuestion: cloneData.proposal.proposalQuestions,
  currentsection: '',
  onClose: jest.fn(),
  sidebar: Map({
    isOpen: true
  }),
  notepad: {
    proposalID: '',
    notes: [],
    fetchingNotes: false,
    fetchNotesErrorMsg: '',
    uploadingNote: false,
    uploadNoteErrorMsg: '',
    notepadMode: 'notepad_mode_default'
  },
  search: {
    query: null,
    isOpen: false,
    currentResultIndex: 0,
    prevResult: null,
    totalResultsFound: 0,
    searching: false,
    searchResults: [
      {
        searchIndex: 'f67947eb-f1fb-4024-8a27-cb6f9af3d928',
        sectionName: 'RFP & Customer Background'
      }
    ],
    autoNavigatedToCurrentResult: false,
    clearInputFlag: false,
    showModal: false,
    modalTitle: '',
    modalContent: ''
  }
};
const mockstore = mockStore(initialState);

const answersList = List([
  Map({
    user: 'AnswerPulledFromSalesforce',
    userName: 'AnswerPulledFromSalesforce',
    userRole: 'AnswerPulledFromSalesforce',
    date: '2023-02-01T12:56:41.433Z',
    answer: List(['Viral hepatitis C']),
    formattedAnswer: ['Viral hepatitis C'],
    proposalId: '93c77a01-5e31-4191-9b2f-cfac782a21af',
    updatedInPG: false
  })
]);
const answerConfigurationMap = Map({
  type: 'picklist-lookup',
  options: []
});
const milestoneNewList = List([
  {
    Name: 'Overview',
    Color: '#015ff1'
  }
]);
const oppdataOrderedmap = OrderedMap({});
const roleNamesList = List(['Business Developer']);
const selectedBidMap = Map({});
const questionDataMap = Map({});
const proposalDetail = {
  Customer: 'Vamsitest',
  'CRM #': 'UZA89202',
  'Bid due date': '2025-04-01',
  'Line of business': 'Clinical',
  'Is this IQVIA Biotech': 'Yes',
  Phase: 'Phase 3',
  'Verbatim indication': 'chronic hcv',
  'Therapeutic area': 'Endocrinology',
  'Protocol number': 'gs - us - 342 - 1138',
  'Product name': 'gs - 5816',
  BoxId: '193778632818',
  IsFsp: 'No',
  pertinentDetails: 'QA',
  opportunityId: '0060100000BBXHsAAP',
  bidNo: 4
};
const currentSFanswerMap = Map({
  value: ['Diabetes mellitus'],
  time: '2023-02-08T09:47:45.821Z'
});

axiosInstance.put = jest.fn().mockImplementation(url => {
  switch (url) {
    case `${API.PROPOSAL.PROPOSAL_QUESTIONS_API_URL}/4e3e234c-606b-4289-836a-74e396e64f24/5b23339e-c750-4bff-82a8-95930b412733`:
      return Promise.resolve({
        status: 200,
        data: {
          "questionId": "5b23339e-c750-4bff-82a8-95930b412733",
          "answers": [
            {
              "user": "sushil.munda@iqvia.com",
              "userName": "Sushil Munda",
              "userRole": "Bid Grid Analyst",
              "date": "2024-03-18T13:12:46.050Z",
              "answer": "Sushil Munda(sushil.munda@iqvia.com)",
              "proposalId": "4e3e234c-606b-4289-836a-74e396e64f24",
              "updatedInPG": true
            }
          ],
          "modifiedQuestions": [],
          "hasDifferentSFanswer": true
        }
      });
    default:
      return Promise.reject({ status: 404 });
  }
});

describe('test for question component', () => {
  window.scrollTo = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const defaultProps = {
    answers: answersList,
    questionText: 'Indication',
    answerConfiguration: answerConfigurationMap,
    milestone: 'Overview',
    milestoneNew: milestoneNewList,
    ismilestoneavailable: true,
    loading: '',
    sfField: 'Indication__c',
    answerValue: '',
    sfObject: 'Opportunity',
    oppdata: oppdataOrderedmap,
    //currentSFanswer: currentSFanswerMap,
    qvidianIntegration: '',
    hasDifferentSFanswer: true,
    questionHint:
      'Note: The information entered here can be pulled into the Challenge Call template in Qvidian.',
    questionHintHTML: '',
    questionHTML:
      '<div data-contents="true"><div data-block="true" data-editor="8vq7g" data-offset-key="fao2w-0-0"><div data-offset-key="fao2w-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fao2w-0-0"><span data-text="true">Indication(</span></span></div></div></div>',
    questionJSON:
      '{"blocks":[{"key":"fao2w","text":"Indication","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    questionHintJSON:
      '{"blocks":[{"key":"fao2w","text":"Indication","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    sectionName: 'Opportunity Information from CRM (for Team review)',
    roleNames: roleNamesList,
    setEditQuestionData: jest.fn(),
    isCustomQuestion: false,
    selectedBid: selectedBidMap,
    proposalInfo: '',
    isNotepadOpen: true,
    questionId: '8959b856-0f49-4c4e-8ec8-f5955320866a',
    events: {},
    integrationsData: '',
    questionData: questionDataMap,
    proposalDetail: proposalDetail,
    eventCategories: '',
    NaLoading: false,
    showNaCheckbox: false
  };

  test('render question component without crashing', async () => {
    const { getByTestId } = await render(
      <Provider store={store}>
        <Question {...defaultProps} />
      </Provider>
    );

    expect(getByTestId('strategy-development-question')).toBeInTheDocument();
    const tooltipButton = getByTestId('question-tooltip-button');
    fireEvent.click(tooltipButton);
    expect(getByTestId('question-popover')).toBeInTheDocument();
  });

  test('renders question text correctly', () => {
    render(
      <Provider store={store}>
        <Question {...defaultProps} />
      </Provider>
    );
    const questionTextElement = screen.getByText('Indication');
    expect(questionTextElement).toBeInTheDocument();
  });

  test('renders milestone tags correctly', () => {
    const mockPropsWithMilestone = { ...defaultProps };
    const { container } = render(
      <Provider store={store}>
        <Question {...mockPropsWithMilestone} />
      </Provider>
    );
    const milestoneTags = container.getElementsByClassName('tag');
    expect(milestoneTags).toHaveLength(1);
  });

  test('test question component', async () => {
    const props = {
      eventCategories: {
        dp: 'Unity Dashboard',
        plainPd: 'Proposal Detail',
        tb: 'ToolBar Menu',
        pg: 'Pagination',
        crmNo: 'Proposal Detail (CRM#: LAB09095)'
      },
      userActions: {
        click: 'Clicked',
        changed: 'Changed',
        submit: 'Submitted',
        scroll: 'Scrolled',
        edit: 'Edited'
      },
      section: Map({
        sectionOrder: 1,
        sectionName: 'RFP & Customer Background'
      }),
      questionData: Map({
        isCustomQuestion: false,
        questionId: 'f67947eb-f1fb-4024-8a27-cb6f9af3d928',
        section: {
          sectionOrder: 1,
          sectionName: 'RFP & Customer Background'
        },
        active: true,
        sfField: 'n/a',
        questionOrder: 35,
        questionApproval: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"Col 1\\\\":"","header":"Row 1","hidden":false,"rowId":1}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1\\\\","header":"Col 1\\\\","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        locked: false,
        opportunityType: 'Default Type',
        proposalId: '0b845c8a-9e31-4e34-92b9-86b8f66ed734',
        questionJSON:
          '{"blocks":[{"key":"4egb7","text":"alksdjf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        bidAnswerCopy: true,
        milestoneNew: Map([]),
        hasDifferentSFanswer: false,
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="6o1vo" data-offset-key="4egb7-0-0"><div data-offset-key="4egb7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4egb7-0-0"><span data-text="true">alksdjf</span></span></div></div></div>',
        roleNames: ['Connected Devices'],
        visible: true,
        notApplicable: false,
        sfObject: 'n/a',
        questionText: 'alksdjf',
        integration: '',
        answers: Map([
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-02-01T12:56:41.433Z',
            answer: List(['Viral hepatitis C']),
            formattedAnswer: ['Viral hepatitis C'],
            proposalId: '93c77a01-5e31-4191-9b2f-cfac782a21af',
            updatedInPG: false
          }
        ]),
        questionHintJSON: '',
        bidType: 'Clinical_Bid',
        questionHintHTML: '',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        events: '',
        latestAnsweredBidNo: null
      }),
      ismilestoneavailable: false,
      milestoneNew: Map([]),
      questionId: 'f67947eb-f1fb-4024-8a27-cb6f9af3d928',
      proposalId: '0b845c8a-9e31-4e34-92b9-86b8f66ed734',
      answers: Map([
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-02-01T12:56:41.433Z',
          answer: List(['Viral hepatitis C']),
          formattedAnswer: ['Viral hepatitis C'],
          proposalId: '93c77a01-5e31-4191-9b2f-cfac782a21af',
          updatedInPG: false
        }
      ]),
      questionText: 'alksdjf',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="6o1vo" data-offset-key="4egb7-0-0"><div data-offset-key="4egb7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4egb7-0-0"><span data-text="true">alksdjf</span></span></div></div></div>',
      questionJSON:
        '{"blocks":[{"key":"4egb7","text":"alksdjf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      answerConfiguration: Map({
        type: 'table',
        options: []
      }),
      qvidianIntegration: '',
      section: {
        sectionOrder: 1,
        sectionName: 'RFP & Customer Background'
      },
      sfObject: 'n/a',
      sfField: 'n/a',
      sectionName: 'RFP & Customer Background',
      loading: false,
      NaLoading: false,
      questionHint: '',
      questionHintHTML: '',
      questionHintJSON: '',
      roleNames: ['Connected Devices'],
      isCustomQuestion: false,
      hasDifferentSFanswer: false,
      isNotepadOpen: true,
      events: {},
      isNotApplicable: false,
      bidAnswerCopy: true,
      bidType: 'Clinical_Bid',
      latestAnsweredBidNo: null,
      oppNo: 'LAB09095',
      tableConfiguration:
        '{"canEditColumn":false,"canAddRow":false,"rows":[{"Col 1\\\\":"","header":"Row 1","hidden":false,"rowId":1}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1\\\\","header":"Col 1\\\\","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
      userData: {
        role: 'Clinical Coder',
        email: 'rahul.tiwari@iqvia.com',
        name: 'RAHUL TIWARI'
      },
      proposalDetail: {
        Customer: 'KomalTest',
        'CRM #': 'LAB09095',
        'Bid due date': '2024-02-29',
        'Line of business': 'Clinical',
        'Is this IQVIA Biotech': 'No',
        Phase: 'Phase 1',
        'Verbatim indication': 'Test 61467',
        'Therapeutic area': 'Oncology',
        'Protocol number': '',
        'Product name': 'CREMTOTAL ULTRA (denture powder)',
        IsFsp: 'No',
        opportunityId: '006Dg00000E6ybeIAB',
        BoxId: '',
        pertinentDetails: 'QA Testing',
        earlyEngagementDevelopmentPlan: '',
        typeOfActivity: '',
        describeActivity: '',
        requestDetail: '',
        bidNo: 2,
        bidType: 'Bid Clinical_Bid'
      },
      integrationsData: {
        data: [
          {
            id: '922354cf-45b9-46bb-9e18-8bfbc00ad565',
            questionId: '07ddfd1c-5058-48cd-82cd-9785d19e9e34',
            questionText: 'Recruitment Strategy',
            destination: ['Qvidian'],
            createdAt: '2023-01-06T15:41:43.707Z',
            updatedAt: '2023-01-06T15:41:43.707Z'
          }
        ]
      },
      selectedBid: Map({
        typeOfActivity: '',
        proposalDate: '2024-01-16T12:53:41.962Z',
        requestDetail: '',
        questionTemplateVersionNumber: 'v2024.50',
        earlyEngagementDevelopmentPlan: '',
        opportunityStatus: '3. Developing Proposal',
        agreementId: 'aNMDg000000CcB1OAK',
        accountId: '001Dg00000hPepUIAS',
        bidName: 'Bid 2',
        opportunityType: 'Default Type',
        isEditable: true,
        opportunityId: '006Dg00000E6ybeIAB',
        isCurrent: true,
        bidStatus: false,
        bidStopStatus: false,
        pertinentDetails: 'QA Testing',
        bidType: 'Bid Clinical_Bid',
        isApprovalCountPresent: true,
        describeActivity: '',
        id: '0b845c8a-9e31-4e34-92b9-86b8f66ed734',
        nextMilestone: [
          {
            name: 'Deliverable due to customer',
            date: '29-Feb-2024'
          },
          {
            name: '2nd draft text revisions due',
            date: '29-Jan-2024'
          }
        ],
        opportunityName: 'NewTestBox09513'
      }),
      oppdata: {
        'a1360255-a80b-4c61-be04-cffe11e78da7': Map({
          proposal: {
            proposalDate: '2024-01-07T06:40:43.055Z',
            opportunityType: 'Default Type',
            accountId: '001Dg00000hPepUIAS',
            proposalId: 'a1360255-a80b-4c61-be04-cffe11e78da7',
            questionTemplateVersionNumber: 'v2024.50',
            inProgress: false,
            agreementId: 'aNMDg000000CbnOOAS',
            isDeleted: false,
            agreementName: 'NewTestBox09513',
            isApprovalCountPresent: true,
            proposalDetails: {
              Customer: 'KomalTest',
              'CRM #': 'LAB09095',
              'Bid due date': '2024-03-27',
              'Line of business': 'Clinical',
              'Is this IQVIA Biotech': 'No',
              Phase: 'Phase 1',
              'Verbatim indication': 'Test 61467',
              'Therapeutic area': 'Oncology',
              'Protocol number': '',
              'Product name': 'CREMTOTAL ULTRA (denture powder)',
              IsFsp: 'No',
              opportunityId: '006Dg00000E6ybeIAB',
              BoxId: '',
              pertinentDetails: 'Custom 65850',
              earlyEngagementDevelopmentPlan: '',
              typeOfActivity: '',
              describeActivity: '',
              requestDetail: '',
              bidNo: 1
            },
            nextMilestone: [
              {
                name: 'Deliverable due to customer',
                date: '27-Mar-2024'
              }
            ],
            bidType: 'Clinical_Bid',
            opportunityTypeLogic:
              '[{"fieldName":"Early Engagement","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Record_Type__c","Sub group":""},"fieldValue":["Early Engagement Bid"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Program (Not-lead Opportunity)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Is_this_part_of_a_Program__c","Sub group":""},"fieldValue":["Yes - not the lead"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Southeast Asia"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Australia & NZ"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["China Region"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["India Region"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Non-Core Clinical Studies (RWE/ECD/etc.)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Ballpark","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Salesforce Data Sources","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["QA Testing"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
            opportunityName: 'NewTestBox09513',
            active: true,
            recordTypeId: '0122K000000sKxGQAU',
            opportunityOverview: {
              'Opportunity Overview-H8Z': 'Malignant tumor of testis',
              'Opportunity Overview-N9U': 'Biologic',
              'Opportunity Overview-H1X': 'Full service RFP',
              'Opportunity Overview-Z4X':
                'Bioavailability/Bioequivalence (BA/BE)',
              'Opportunity Overview-J7C': '',
              OpportunityStatus: '3. Developing Proposal'
            },
            customUnityTabs: [
              {
                UnityTabSectionOrder: 40,
                UnityTabSectionId: '0074ecf4-9212-4cbd-9185-e8db4f3a47aa',
                UnityTabSectionQuestions: [
                  '62853a4c-3781-4682-8ea1-61a92f88ff87',
                  '2302aabf-9754-4df7-bc31-4ddeb313ab0f',
                  'd5e94125-6b09-42ce-ba80-c94f1ec99c20'
                ],
                UnityTabSectionTitle:
                  'Diversity and Inclusion in Clinical Trials',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 41,
                UnityTabSectionId: '034fc1a7-201c-40c0-aa7e-e3034dcf172f',
                UnityTabSectionQuestions: [
                  '362344e8-d9ff-4809-a9c2-0225ca0603b9',
                  '82878dfd-c8fd-4fbe-9440-dae99d46c92c',
                  '5948da59-d639-4ac8-a621-76f40109b5c2'
                ],
                UnityTabSectionTitle: 'Referral Networks',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 37,
                UnityTabSectionId: '0d753560-8617-4a69-96e1-6d69b573fc0f',
                UnityTabSectionQuestions: [
                  '64da6471-205a-4ff5-baf7-27d019ace0c7'
                ],
                UnityTabSectionTitle: 'Standard of Care',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 43,
                UnityTabSectionId: '233d05ae-da13-4b3d-96e6-a922bc965549',
                UnityTabSectionQuestions: [
                  '6a6b7e8e-68d1-429a-9570-3626abf9e053'
                ],
                UnityTabSectionTitle: 'Additional Details',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              }
            ],
            switchTemplateStatus: false,
            approvals: [
              {
                ApprovalSectionTitle: 'Strategy Approval',
                ApprovalSectionRightQuestions: [
                  '69d1f9a6-c21e-4209-a0fc-ecceda468bf5',
                  '0859813c-0ff6-41f7-b2d8-d275d335f486',
                  'acca88ee-1b7f-4b1f-895e-7b9d7c6767f2',
                  '822944af-7fd3-4ecf-8c1e-fe8ded20d3c7'
                ],
                ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
                ApprovalSectionOrder: 1,
                ApprovalSectionLeftQuestions: [
                  '7da9dea4-ace3-4208-849e-a6ecb50d5192',
                  '907f558f-88f9-4969-86a9-835e22ce0ddb',
                  '803b33d5-8cd9-4211-95de-89b121d06aa1',
                  '20adb411-8df3-450f-8e9b-e1634f00a2fc',
                  '0314bfcc-357d-4231-8be4-1ca2461317c5'
                ]
              },
              {
                ApprovalSectionTitle: 'Budget Sign-Off',
                ApprovalSectionRightQuestions: [
                  'e2828f96-b124-4708-a208-85927b52ff4b',
                  '7ea4f444-53e4-486f-82b0-80087fd2de7d',
                  '688605ca-05fd-4259-9372-a71ce17172d3',
                  '63caf3e9-075c-4d42-888c-675d19c1d6b3'
                ],
                ApprovalSectionId: '06e1ea4c-b60a-4041-8905-85101c39ab84',
                ApprovalSectionOrder: 2,
                ApprovalSectionLeftQuestions: [
                  'd0b52140-0d00-4cd5-a613-caa815d94ab8',
                  '831e7437-0614-42ee-91b4-ecfac299bdeb',
                  'b10c53ee-5f6c-4f1f-a77c-92dc60781105'
                ]
              },
              {
                ApprovalSectionTitle: 'Clin tech Removal',
                ApprovalSectionRightQuestions: [
                  'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
                  '78d11922-bcc8-49b2-a5c2-089ec92f7f69',
                  '25f590c0-cb53-4b91-bd3c-e02898708a7f',
                  'a2e764e7-e068-470b-b5dd-8f0187eaac68'
                ],
                ApprovalSectionId: 'dbbbfc93-4429-4154-84f6-c8a2ddca71d0',
                ApprovalSectionOrder: 3,
                ApprovalSectionLeftQuestions: [
                  'f31a6194-d61b-43a4-94d3-4af2c883ff75',
                  'd0a9caa2-f548-4546-8ac9-b5c003be2f70',
                  '658f4990-6174-42d5-8009-506ad9d56b8b',
                  '19073e8c-e17d-4af6-adf3-3d71d161692e',
                  'fd74d306-e6ae-42ca-bd64-b063e849fcc0',
                  '59fa4ae1-ea8c-437a-9815-59fbfcc6a030'
                ]
              },
              {
                ApprovalSectionTitle: 'AutoSap24006',
                ApprovalSectionRightQuestions: [],
                ApprovalSectionId: 'dc74d5b9-338e-48d6-8df3-93c98065cd50',
                ApprovalSectionOrder: 4,
                ApprovalSectionLeftQuestions: []
              }
            ],
            approvalsCount: 8
          },
          isCurrent: false
        })
      },
      noneditableField: [
        {
          questionText: 'Business Developer',
          sfField: 'Owner_Email__c',
          sfObject: 'Opportunity'
        },
        {
          questionText: 'Date risk assessed?',
          sfField: 'Date_Risk_Assessed__c',
          sfObject: 'Account'
        },
        {
          questionText: 'Bid Number',
          sfField: 'Bid_Number__c',
          sfObject: 'Bid_History__c'
        },
        {
          questionText: 'Opportunity Type',
          sfField: 'Opportunity_Type__c',
          sfObject: 'Bid_History__c'
        },
        {
          questionText: 'Executive Sponsor',
          sfField: 'Executive_Sponsor__c',
          sfObject: 'Opportunity'
        },
        {
          questionText: 'Credit assessment score',
          sfField: 'Risk_Rating__c',
          sfObject: 'Account'
        }
      ],
      showNaCheckbox: false,
      canUserTagInQuestion: true,
      allFlags: {
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
      query: null,
      currentSearchResult: null,
      prevSearchResult: null,
      autoNavigatedToCurrentResult: true
    };
    const socketContextObj = {
      questionLockWrapper: jest.fn(),
      questionUnlockWrapper: jest.fn()
    };
    let mockSocket = {
      on: jest.fn(),
      emit: jest.fn()
    };
    const { container, findByText, debug } = render(
      <Provider store={mockstore}>
        <Question {...props} socketContext={socketContextObj} />
      </Provider>
    );
    fireEvent.click(await findByText('alksdjf'));
  });

  test('test question component text type', async () => {
    const props = {
      eventCategories: {
        dp: 'Unity Dashboard',
        plainPd: 'Proposal Detail',
        tb: 'ToolBar Menu',
        pg: 'Pagination',
        crmNo: 'Proposal Detail (CRM#: LAB09095)'
      },
      userActions: {
        click: 'Clicked',
        changed: 'Changed',
        submit: 'Submitted',
        scroll: 'Scrolled',
        edit: 'Edited'
      },
      section: Map({
        sectionOrder: 1,
        sectionName: 'RFP & Customer Background'
      }),
      questionData: Map({
        proposalId: 'a1360255-a80b-4c61-be04-cffe11e78da7',
        questionId: '016ea6d2-4d60-4b29-8769-f3fb492c610d',
        section: {
          sectionOrder: 14,
          sectionName: 'Site Analytics'
        },
        questionText: 'External trials to flag and include ',
        answerConfiguration: Map({
          type: 'text',
          options: []
        }),
        roleNames: ['Therapeutic Analytics Lead'],
        answers: [],
        questionOrder: 5,
        visible: false,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"421e2207-5650-48dd-984e-071e1890179c","fieldValue":"Site List","operator":"Contains"}]}',
        milestoneNew: [],
        interestedParties:
          'Therapeutic Analytics Lead,Medical Strategy Lead,Site Analytics,Therapeutic Strategy Lead,Proposal Developer,Project Lead,Global Site Activation (GSA),Clinical DS&B,Business Developer,Global Analytics,Clinical Coder',
        opportunityType: 'Default Type,Core Opportunity Launch Call (AMR/EMEA)',
        questionHint: ' For Enrollment Rate analysis ',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"efs34","text":"External trials to flag and include ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="85flm" data-offset-key="efs34-0-0"><div data-offset-key="efs34-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="efs34-0-0"><span data-text="true">External trials to flag and include  </span></span></div></div></div>',
        questionHintJSON:
          '{"blocks":[{"key":"q9oj","text":" For Enrollment Rate analysis ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHintHTML:
          '<div data-contents="true"><div data-block="true" data-editor="cneca" data-offset-key="q9oj-0-0"><div data-offset-key="q9oj-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="q9oj-0-0"><span data-text="true"> For Enrollment Rate analysis </span></span></div></div></div>',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'Post_Award_Bid'
      }),
      ismilestoneavailable: false,
      milestoneNew: Map([]),
      questionId: 'f67947eb-f1fb-4024-8a27-cb6f9af3d928',
      proposalId: '0b845c8a-9e31-4e34-92b9-86b8f66ed734',
      answers: Map([
        {
          "user": "AnswerPulledFromSalesforce",
          "userName": "AnswerPulledFromSalesforce",
          "userRole": "AnswerPulledFromSalesforce",
          "date": "2024-01-16T12:54:10.184Z",
          "answer": "Malignant tumor of testis",
          "formattedAnswer": "Malignant tumor of testis",
          "proposalId": "0b845c8a-9e31-4e34-92b9-86b8f66ed734",
          "updatedInPG": false
        }
      ]),
      questionText: 'alksdjf',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="6o1vo" data-offset-key="4egb7-0-0"><div data-offset-key="4egb7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4egb7-0-0"><span data-text="true">alksdjf</span></span></div></div></div>',
      questionJSON:
        '{"blocks":[{"key":"4egb7","text":"alksdjf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      answerConfiguration: Map({
        type: 'text',
        options: []
      }),
      qvidianIntegration: '',
      section: {
        sectionOrder: 1,
        sectionName: 'RFP & Customer Background'
      },
      sfObject: 'n/a',
      sfField: 'n/a',
      sectionName: 'RFP & Customer Background',
      loading: false,
      NaLoading: false,
      questionHint: '',
      questionHintHTML: '',
      questionHintJSON: '',
      roleNames: ['Connected Devices'],
      isCustomQuestion: false,
      hasDifferentSFanswer: false,
      isNotepadOpen: true,
      events: {},
      isNotApplicable: false,
      bidAnswerCopy: true,
      bidType: 'Clinical_Bid',
      latestAnsweredBidNo: null,
      oppNo: 'LAB09095',
      userData: {
        role: 'Clinical Coder',
        email: 'rahul.tiwari@iqvia.com',
        name: 'RAHUL TIWARI'
      },
      proposalDetail: {
        Customer: 'KomalTest',
        'CRM #': 'LAB09095',
        'Bid due date': '2024-02-29',
        'Line of business': 'Clinical',
        'Is this IQVIA Biotech': 'No',
        Phase: 'Phase 1',
        'Verbatim indication': 'Test 61467',
        'Therapeutic area': 'Oncology',
        'Protocol number': '',
        'Product name': 'CREMTOTAL ULTRA (denture powder)',
        IsFsp: 'No',
        opportunityId: '006Dg00000E6ybeIAB',
        BoxId: '',
        pertinentDetails: 'QA Testing',
        earlyEngagementDevelopmentPlan: '',
        typeOfActivity: '',
        describeActivity: '',
        requestDetail: '',
        bidNo: 2,
        bidType: 'Bid Clinical_Bid'
      },
      integrationsData: {
        data: [
          {
            id: '922354cf-45b9-46bb-9e18-8bfbc00ad565',
            questionId: '07ddfd1c-5058-48cd-82cd-9785d19e9e34',
            questionText: 'Recruitment Strategy',
            destination: ['Qvidian'],
            createdAt: '2023-01-06T15:41:43.707Z',
            updatedAt: '2023-01-06T15:41:43.707Z'
          }
        ]
      },
      selectedBid: Map({
        typeOfActivity: '',
        proposalDate: '2024-01-16T12:53:41.962Z',
        requestDetail: '',
        questionTemplateVersionNumber: 'v2024.50',
        earlyEngagementDevelopmentPlan: '',
        opportunityStatus: '3. Developing Proposal',
        agreementId: 'aNMDg000000CcB1OAK',
        accountId: '001Dg00000hPepUIAS',
        bidName: 'Bid 2',
        opportunityType: 'Default Type',
        isEditable: true,
        opportunityId: '006Dg00000E6ybeIAB',
        isCurrent: true,
        bidStatus: false,
        bidStopStatus: false,
        pertinentDetails: 'QA Testing',
        bidType: 'Bid Clinical_Bid',
        isApprovalCountPresent: true,
        describeActivity: '',
        id: '0b845c8a-9e31-4e34-92b9-86b8f66ed734',
        nextMilestone: [
          {
            name: 'Deliverable due to customer',
            date: '29-Feb-2024'
          },
          {
            name: '2nd draft text revisions due',
            date: '29-Jan-2024'
          }
        ],
        opportunityName: 'NewTestBox09513'
      }),
      oppdata: {
        'a1360255-a80b-4c61-be04-cffe11e78da7': Map({
          proposal: {
            proposalDate: '2024-01-07T06:40:43.055Z',
            opportunityType: 'Default Type',
            accountId: '001Dg00000hPepUIAS',
            proposalId: 'a1360255-a80b-4c61-be04-cffe11e78da7',
            questionTemplateVersionNumber: 'v2024.50',
            inProgress: false,
            agreementId: 'aNMDg000000CbnOOAS',
            isDeleted: false,
            agreementName: 'NewTestBox09513',
            isApprovalCountPresent: true,
            proposalDetails: {
              Customer: 'KomalTest',
              'CRM #': 'LAB09095',
              'Bid due date': '2024-03-27',
              'Line of business': 'Clinical',
              'Is this IQVIA Biotech': 'No',
              Phase: 'Phase 1',
              'Verbatim indication': 'Test 61467',
              'Therapeutic area': 'Oncology',
              'Protocol number': '',
              'Product name': 'CREMTOTAL ULTRA (denture powder)',
              IsFsp: 'No',
              opportunityId: '006Dg00000E6ybeIAB',
              BoxId: '',
              pertinentDetails: 'Custom 65850',
              earlyEngagementDevelopmentPlan: '',
              typeOfActivity: '',
              describeActivity: '',
              requestDetail: '',
              bidNo: 1
            },
            nextMilestone: [
              {
                name: 'Deliverable due to customer',
                date: '27-Mar-2024'
              }
            ],
            bidType: 'Clinical_Bid',
            opportunityTypeLogic:
              '[{"fieldName":"Early Engagement","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Record_Type__c","Sub group":""},"fieldValue":["Early Engagement Bid"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Program (Not-lead Opportunity)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Is_this_part_of_a_Program__c","Sub group":""},"fieldValue":["Yes - not the lead"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Southeast Asia"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Australia & NZ"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["China Region"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["India Region"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Non-Core Clinical Studies (RWE/ECD/etc.)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Ballpark","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Salesforce Data Sources","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["QA Testing"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
            opportunityName: 'NewTestBox09513',
            active: true,
            recordTypeId: '0122K000000sKxGQAU',
            opportunityOverview: {
              'Opportunity Overview-H8Z': 'Malignant tumor of testis',
              'Opportunity Overview-N9U': 'Biologic',
              'Opportunity Overview-H1X': 'Full service RFP',
              'Opportunity Overview-Z4X':
                'Bioavailability/Bioequivalence (BA/BE)',
              'Opportunity Overview-J7C': '',
              OpportunityStatus: '3. Developing Proposal'
            },
            customUnityTabs: [
              {
                UnityTabSectionOrder: 40,
                UnityTabSectionId: '0074ecf4-9212-4cbd-9185-e8db4f3a47aa',
                UnityTabSectionQuestions: [
                  '62853a4c-3781-4682-8ea1-61a92f88ff87',
                  '2302aabf-9754-4df7-bc31-4ddeb313ab0f',
                  'd5e94125-6b09-42ce-ba80-c94f1ec99c20'
                ],
                UnityTabSectionTitle:
                  'Diversity and Inclusion in Clinical Trials',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 41,
                UnityTabSectionId: '034fc1a7-201c-40c0-aa7e-e3034dcf172f',
                UnityTabSectionQuestions: [
                  '362344e8-d9ff-4809-a9c2-0225ca0603b9',
                  '82878dfd-c8fd-4fbe-9440-dae99d46c92c',
                  '5948da59-d639-4ac8-a621-76f40109b5c2'
                ],
                UnityTabSectionTitle: 'Referral Networks',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 37,
                UnityTabSectionId: '0d753560-8617-4a69-96e1-6d69b573fc0f',
                UnityTabSectionQuestions: [
                  '64da6471-205a-4ff5-baf7-27d019ace0c7'
                ],
                UnityTabSectionTitle: 'Standard of Care',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              },
              {
                UnityTabSectionOrder: 43,
                UnityTabSectionId: '233d05ae-da13-4b3d-96e6-a922bc965549',
                UnityTabSectionQuestions: [
                  '6a6b7e8e-68d1-429a-9570-3626abf9e053'
                ],
                UnityTabSectionTitle: 'Additional Details',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Analytics (AMR/EMEA)'
              }
            ],
            switchTemplateStatus: false,
            approvals: [
              {
                ApprovalSectionTitle: 'Strategy Approval',
                ApprovalSectionRightQuestions: [
                  '69d1f9a6-c21e-4209-a0fc-ecceda468bf5',
                  '0859813c-0ff6-41f7-b2d8-d275d335f486',
                  'acca88ee-1b7f-4b1f-895e-7b9d7c6767f2',
                  '822944af-7fd3-4ecf-8c1e-fe8ded20d3c7'
                ],
                ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
                ApprovalSectionOrder: 1,
                ApprovalSectionLeftQuestions: [
                  '7da9dea4-ace3-4208-849e-a6ecb50d5192',
                  '907f558f-88f9-4969-86a9-835e22ce0ddb',
                  '803b33d5-8cd9-4211-95de-89b121d06aa1',
                  '20adb411-8df3-450f-8e9b-e1634f00a2fc',
                  '0314bfcc-357d-4231-8be4-1ca2461317c5'
                ]
              },
              {
                ApprovalSectionTitle: 'Budget Sign-Off',
                ApprovalSectionRightQuestions: [
                  'e2828f96-b124-4708-a208-85927b52ff4b',
                  '7ea4f444-53e4-486f-82b0-80087fd2de7d',
                  '688605ca-05fd-4259-9372-a71ce17172d3',
                  '63caf3e9-075c-4d42-888c-675d19c1d6b3'
                ],
                ApprovalSectionId: '06e1ea4c-b60a-4041-8905-85101c39ab84',
                ApprovalSectionOrder: 2,
                ApprovalSectionLeftQuestions: [
                  'd0b52140-0d00-4cd5-a613-caa815d94ab8',
                  '831e7437-0614-42ee-91b4-ecfac299bdeb',
                  'b10c53ee-5f6c-4f1f-a77c-92dc60781105'
                ]
              },
              {
                ApprovalSectionTitle: 'Clin tech Removal',
                ApprovalSectionRightQuestions: [
                  'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
                  '78d11922-bcc8-49b2-a5c2-089ec92f7f69',
                  '25f590c0-cb53-4b91-bd3c-e02898708a7f',
                  'a2e764e7-e068-470b-b5dd-8f0187eaac68'
                ],
                ApprovalSectionId: 'dbbbfc93-4429-4154-84f6-c8a2ddca71d0',
                ApprovalSectionOrder: 3,
                ApprovalSectionLeftQuestions: [
                  'f31a6194-d61b-43a4-94d3-4af2c883ff75',
                  'd0a9caa2-f548-4546-8ac9-b5c003be2f70',
                  '658f4990-6174-42d5-8009-506ad9d56b8b',
                  '19073e8c-e17d-4af6-adf3-3d71d161692e',
                  'fd74d306-e6ae-42ca-bd64-b063e849fcc0',
                  '59fa4ae1-ea8c-437a-9815-59fbfcc6a030'
                ]
              },
              {
                ApprovalSectionTitle: 'AutoSap24006',
                ApprovalSectionRightQuestions: [],
                ApprovalSectionId: 'dc74d5b9-338e-48d6-8df3-93c98065cd50',
                ApprovalSectionOrder: 4,
                ApprovalSectionLeftQuestions: []
              }
            ],
            approvalsCount: 8
          },
          isCurrent: false
        })
      },
      noneditableField: [
        {
          questionText: 'Business Developer',
          sfField: 'Owner_Email__c',
          sfObject: 'Opportunity'
        },
        {
          questionText: 'Date risk assessed?',
          sfField: 'Date_Risk_Assessed__c',
          sfObject: 'Account'
        },
        {
          questionText: 'Bid Number',
          sfField: 'Bid_Number__c',
          sfObject: 'Bid_History__c'
        },
        {
          questionText: 'Opportunity Type',
          sfField: 'Opportunity_Type__c',
          sfObject: 'Bid_History__c'
        },
        {
          questionText: 'Executive Sponsor',
          sfField: 'Executive_Sponsor__c',
          sfObject: 'Opportunity'
        },
        {
          questionText: 'Credit assessment score',
          sfField: 'Risk_Rating__c',
          sfObject: 'Account'
        }
      ],
      showNaCheckbox: false,
      canUserTagInQuestion: true,
      allFlags: {
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
      query: null,
      currentSearchResult: null,
      prevSearchResult: null,
      autoNavigatedToCurrentResult: true
    };
    act(() => {
      render(
        <Provider store={mockstore}>
          <Question {...props} />
        </Provider>
      );
    })
    const textbox = screen.getByRole('textbox');
    act(() => {
      fireEvent.focus(textbox);
      fireEvent.paste(textbox, {
        clipboardData: {
          getData: () => 'https://www.iqvia.com'
        }
      });
      fireEvent.blur(textbox);
    });
  });

  test('test question component proposal team type', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                first_name: 'new',
                last_name: 'owner',
                email: 'newowner@test.com'
              }
            ]
          })
      })
    );
    const props = {
      eventCategories: {
        pd: jest.fn()
      },
      "proposalId": "4e3e234c-606b-4289-836a-74e396e64f24",
      "questionId": "5b23339e-c750-4bff-82a8-95930b412733",
      "section": Map({
        "sectionOrder": 1,
        "sectionName": "Proposal Team"
      }),
      "sectionName": "Proposal Team",
      "questionText": "Global Analytics Lead",
      "answerConfiguration": Map({
        "type": "text",
        "options": []
      }),
      "roleNames": [
        "Executive Oversight"
      ],
      "answers": List([]),
      "questionOrder": 34,
      "visible": true,
      "locked": false,
      "sfObject": "pse__Resource_Request__c",
      "sfField": "pse__Staffer_Resource__c",
      "developerUsageComments": "AND SubGroup__c = 'Global Analytics' AND Regional_Analytics_Country__c='Strategic Analytics'",
      "milestoneNew": List([
        {
          "Name": "Team",
          "Color": "#595959"
        },
        {
          "Name": "test-2",
          "Color": "#008000"
        },
        {
          "Name": "test",
          "Color": "#0CEFC3"
        }
      ]),
      "opportunityType": "Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)",
      "hasDifferentSFanswer": false,
      "currentSFanswer": Map({
        "value": "",
        "time": "2024-03-18T09:58:56.753Z"
      }),
      "isCustomQuestion": false,
      "questionJSON": "{\"blocks\":[{\"key\":\"bbise\",\"text\":\"Global Analytics Lead\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
      "questionHTML": "<div data-contents=\"true\"><div data-block=\"true\" data-editor=\"4ring\" data-offset-key=\"bbise-0-0\"><div data-offset-key=\"bbise-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"bbise-0-0\"><span data-text=\"true\">Global Analytics Lead</span></span></div></div></div>",
      "questionHintJSON": "",
      "questionHintHTML": "",
      "active": true,
      "integration": "",
      "events": "",
      "notApplicable": false,
      "questionApproval": false,
      "bidAnswerCopy": true,
      "questionTableConfig": "{}",
      "latestAnsweredBidNo": null,
      "bidType": "RFI_Request"
    };
    act(() => {
      render(
        <Provider store={mockstore}>
          <Question {...props} />
        </Provider>
      );
    });
    const combobox = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(combobox, { target: { value: 'new' } });
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText('owner(newowner@test.com)'));
    });
  });
});
