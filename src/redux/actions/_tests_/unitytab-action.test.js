import {
  deleteUnityQuestion,
  editUnityQuestion,
  resetFiltersAction,
  resetSingleTabFiltersAction,
  setAllUnityTab,
  setTabRefresh,
  setUnityQuestion,
  updateFilters,
  updateNewFilters
} from '../unitytab-action';
import { store } from '../../../store';
import axios from 'axios';
import * as unitytabApi from '../../../api/unityTab';
import { updateQuerySearchAction } from '../search-actions';
import * as oppApi from '../../../api/proposal';
import { getOpportunity } from '../proposal-actions';
// import tabdata from '../../../components/views/modals/__test__/tabdata.json';
// import * as dataSource from '../../../components/screens/Opportunity/__tests__/mockdata/document.json';

jest.mock('axios', () => {
  const jestOriginal = jest.requireActual('axios');
  return {
    __esModule: true,
    ...jestOriginal
  };
});
axios.get = jest.fn(() => Promise.resolve({ data: {} }));

describe('unitytab-actions test', () => {
  const data = {
    isCustomQuestion: true,
    milestoneNew: [],
    visible: true,
    questionId: '06820d9a-602f-4402-85a7-f4d496fde054',
    proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
    roleNames: ['BD Leadership'],
    answers: [
      {
        user: 'rahul.tiwari@iqvia.com',
        userName: 'RAHUL TIWARI',
        userRole: 'Clinical Coder',
        date: '2024-01-07T03:34:18.950Z',
        answer: 'test',
        formattedAnswer: {
          value: {
            blocks: [
              {
                key: 'svqp',
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
          html: '<div data-contents="true"><div data-block="true" data-editor="d62pp" data-offset-key="svqp-0-0"><div data-offset-key="svqp-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="svqp-0-0"><span data-text="true">test</span></span></div></div></div>'
        },
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        updatedInPG: true
      }
    ],
    notApplicable: false,
    active: true,
    answerConfiguration: {
      type: 'text',
      options: []
    },
    hasDifferentSFanswer: false,
    questionText: 'awdawd1',
    section: {
      sectionOrder: 1,
      sectionName: 'Hellooo',
      tabID: '04bb872c-9d48-4514-be16-fba5eb7fd789'
    },
    questionApproval: false,
    questionOrder: 1,
    locked: true,
    bidAnswerCopy: true
  };
  const proposalData = {
    proposal: {
      proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
      accountId: '0017A00000yjoWDQAY',
      opportunityName: 'Testing4968',
      agreementId: 'aNM7A0000008SyzWAE',
      agreementName: 'Testing4968',
      proposalDate: '2023-12-15T11:11:31.595Z',
      proposalDetails: {
        Customer: 'Test Account 1',
        'CRM #': 'JAB53166',
        'Bid due date': '2024-01-19',
        'Line of business': 'Allscripts Data',
        'Is this IQVIA Biotech': 'Yes',
        Phase: 'Phase 1',
        'Verbatim indication': 'test',
        'Therapeutic area': 'Hepatology',
        'Protocol number': '',
        'Product name': 'drugg',
        IsFsp: 'No',
        opportunityId: '0067A00000DMzxgQAD',
        BoxId: '',
        pertinentDetails: null,
        earlyEngagementDevelopmentPlan: '',
        typeOfActivity: 'Post Award - Non-compete strategy development',
        describeActivity: 'Testt',
        requestDetail: '',
        bidNo: 1
      },
      opportunityOverview: {
        'Opportunity Overview-H8Z': 'Test Indication List',
        'Opportunity Overview-N9U': 'Device',
        'Opportunity Overview-H1X': '',
        'Opportunity Overview-Z4X': '',
        'Opportunity Overview-J7C': '',
        OpportunityStatus: '5. Finalizing Deal'
      },
      active: true,
      bidType: 'Post_Award_Bid',
      recordTypeId: '0122K000000sKxLQAU',
      opportunityTypeLogic:
        '[{"fieldName":"Non-Core Clinical Studies","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["lkjk"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["lkj"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Core Opportunity Launch Call (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Core Opportunity Launch Call (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Ballpark OT","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"IQB Template OT","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["Yes"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"PILOT - DO NOT USE: PROGRAMS","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["hello"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
      opportunityType: 'Default Type',
      questionTemplateVersionNumber: 'v2024.19',
      inProgress: false,
      isDeleted: false,
      approvals: [
        {
          ApprovalSectionTitle: 'Strategy Approvals',
          ApprovalSectionRightQuestions: [
            '86ba5974-f4b1-4598-90ae-a1b476fac829',
            '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
            '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
            '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
            'a932540b-b6ec-4182-82fb-aae5b7e0d027'
          ],
          ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
          ApprovalSectionOrder: 1,
          ApprovalSectionLeftQuestions: [
            '8d41dd0f-3140-412c-9fd8-a17116d30800',
            'Proposal Team-O0Z',
            'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
            '722f9c3c-5538-4b64-bda5-76604d61da46',
            'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
            '3106acc8-d688-465f-907c-13d890870b43'
          ]
        },
        {
          ApprovalSectionTitle: 'Test 156890',
          ApprovalSectionRightQuestions: [
            '9a8c020c-0e54-412c-af8d-88650e48d5c6'
          ],
          ApprovalSectionId: '406f9e91-c6b2-47ed-99ca-52ecdf866396',
          ApprovalSectionOrder: 2,
          ApprovalSectionLeftQuestions: []
        },
        {
          ApprovalSectionTitle: 'Test 66678',
          ApprovalSectionRightQuestions: ['Proposal Team-Z5P'],
          ApprovalSectionId: 'd3c62d16-2023-47d9-9ab2-a436cab8be1a',
          ApprovalSectionOrder: 3,
          ApprovalSectionLeftQuestions: [
            'Key stakeholders-Y0L',
            'Proposal Team-P0X'
          ]
        },
        {
          ApprovalSectionTitle: 'Test_Sapthmi asdf',
          ApprovalSectionRightQuestions: [
            'Proposal Team-C7E',
            '0c0b2e2b-0914-40c8-90f2-0e585428eb89',
            'Proposal Team-O0Z'
          ],
          ApprovalSectionId: '62152acb-de7f-47eb-aa56-4227018a93d2',
          ApprovalSectionOrder: 4,
          ApprovalSectionLeftQuestions: [
            'Proposal Team-X9E',
            'Proposal Team-Z5P',
            'Proposal Team-L6S'
          ]
        },
        {
          ApprovalSectionTitle: 'New Section _Updated',
          ApprovalSectionRightQuestions: ['Opportunity Overview-H1X'],
          ApprovalSectionId: 'b3be3225-4a4e-4393-82a6-c59a29de51f3',
          ApprovalSectionOrder: 5,
          ApprovalSectionLeftQuestions: [
            'Opportunity Overview-Z4X',
            '9a8c020c-0e54-412c-af8d-88650e48d5c6'
          ]
        },
        {
          ApprovalSectionTitle: 'Test 6789',
          ApprovalSectionRightQuestions: [],
          ApprovalSectionId: 'd945b5b8-f564-4d84-882e-31c94789c2a1',
          ApprovalSectionOrder: 6,
          ApprovalSectionLeftQuestions: ['Proposal Team-P0X']
        },
        {
          ApprovalSectionTitle: 'Test 56778',
          ApprovalSectionRightQuestions: [],
          ApprovalSectionId: '33702a39-5e18-4ddd-b749-7c6082e93c69',
          ApprovalSectionOrder: 7,
          ApprovalSectionLeftQuestions: ['Proposal Team-P0X']
        },
        {
          ApprovalSectionTitle: 'Test 123',
          ApprovalSectionRightQuestions: [
            'Win Strategy-AB9',
            '11f85cab-9163-45c6-86d7-72ae59dc601e',
            'c46b37e1-33a2-430f-af91-f074208247ac',
            '86ba5974-f4b1-4598-90ae-a1b476fac829',
            '0859813c-0ff6-41f7-b2d8-d275d335f486'
          ],
          ApprovalSectionId: '2574ac8c-b6f6-43ee-9777-d9d1a7866114',
          ApprovalSectionOrder: 8,
          ApprovalSectionLeftQuestions: [
            'Win Strategy-U9B',
            '12622ae6-5def-4959-8893-b8535062560b',
            'a656ddee-4592-47d1-8712-7b79d0ceba05',
            '60aa9b44-5c16-452d-ae88-8ce7935fabb1',
            'Award Timelines-N3X'
          ]
        },
        {
          ApprovalSectionTitle: 'new section 122',
          ApprovalSectionRightQuestions: [
            'Key stakeholders-Y0L',
            'e8fd9762-e57f-4822-9f5b-4f94d9d48e92'
          ],
          ApprovalSectionId: '9cb6136d-9720-48fc-9a56-a7984be55658',
          ApprovalSectionOrder: 9,
          ApprovalSectionLeftQuestions: [
            'Opportunity Overview-M9D',
            'Opportunity Overview-H1X'
          ]
        },
        {
          ApprovalSectionTitle: 'Test_4447',
          ApprovalSectionRightQuestions: [
            '944c7148-545a-4ab8-ba39-3b71c6f463b3',
            'c9b640d1-ffe2-4f66-b7c4-5369a2393e78',
            '949ccde4-a09b-4c15-877b-0dfebe17cdc0'
          ],
          ApprovalSectionId: 'fcd9df2b-5d54-4995-a6c6-f02468eac09a',
          ApprovalSectionOrder: 10,
          ApprovalSectionLeftQuestions: [
            '76aced19-0af2-46a0-b468-f30d05d7ba59',
            'Country Strategy-H7V',
            '6213a4bf-de31-4fa0-a80a-97bf72d058f4'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-1',
          ApprovalSectionRightQuestions: [
            'a9538c9b-304f-4960-8224-a92093d27a3d',
            'Opportunity Overview-T1U',
            'Opportunity Overview-I7N'
          ],
          ApprovalSectionId: '37679102-c990-4b86-b31a-0ca431db59ea',
          ApprovalSectionOrder: 11,
          ApprovalSectionLeftQuestions: [
            'Core Information-R4P',
            '737196b5-ba97-4096-a3a6-2b4d9b7babd9',
            'Opportunity Overview-D3B'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-2',
          ApprovalSectionRightQuestions: [
            'Win Strategy-U9B',
            'Win Strategy-AR2',
            'cccd3f9b-ec6e-449e-9174-c573fbef8158'
          ],
          ApprovalSectionId: 'f1387683-db60-4a4c-9c35-ec0c01a5e22d',
          ApprovalSectionOrder: 12,
          ApprovalSectionLeftQuestions: [
            'a932540b-b6ec-4182-82fb-aae5b7e0d027',
            '2a30b4ac-354e-4168-987a-aa4b70910b77',
            '7ba722f4-8822-4e64-8086-acc8dbc746ab'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-3',
          ApprovalSectionRightQuestions: [
            'Services-P6I',
            '8e89a496-c3c5-47ce-b193-b7406fbf9ae1',
            'Opportunity Overview-R5U'
          ],
          ApprovalSectionId: 'bb7e3395-c6dc-4a7e-a3ad-a6c50be4d0c2',
          ApprovalSectionOrder: 13,
          ApprovalSectionLeftQuestions: [
            'Services-T7E',
            'Pricing-C8T',
            'Opportunity Overview-R4U'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-4',
          ApprovalSectionRightQuestions: [
            '5fc6f56c-e748-4008-bbae-c608670a8810',
            '0c7c273a-4442-494b-8302-bc21f014ab9d',
            '6252734c-9e1b-496f-ab1e-8e010844ee3a',
            'e0ec3346-4363-4323-92ed-20f148514dab'
          ],
          ApprovalSectionId: '7d6fafcd-29dc-4b3a-92f9-0b0ee247f2e7',
          ApprovalSectionOrder: 14,
          ApprovalSectionLeftQuestions: [
            'c46b37e1-33a2-430f-af91-f074208247ac',
            '0314bfcc-357d-4231-8be4-1ca2461317c5',
            '8eaa464b-eb2a-4d3f-9dd8-5f27b9c0c0bc',
            '969e5c16-b77f-4331-bc24-67a60dca8403'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-5',
          ApprovalSectionRightQuestions: [
            '201cc28e-b774-4b81-829f-8e9ac7cb19a5',
            '90bc4699-e83f-4693-867d-8bff2c08a4c6',
            '918e86dc-b8d1-4d78-8cc2-b1cc81102d0d'
          ],
          ApprovalSectionId: 'f60eb2da-70a7-41e5-9fb3-37e02a6194d5',
          ApprovalSectionOrder: 15,
          ApprovalSectionLeftQuestions: [
            '8e89a496-c3c5-47ce-b193-b7406fbf9ae1',
            '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
            '231be643-6814-4059-93bf-c9fb21b658f6'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-6',
          ApprovalSectionRightQuestions: [
            '5258e656-e695-492c-a01a-d3ccd7480bfe',
            '21664eb6-a924-4dad-a49b-cbcb9cad5bd9',
            '944c7148-545a-4ab8-ba39-3b71c6f463b3'
          ],
          ApprovalSectionId: 'ed1d577d-2dfe-4ddd-93d6-8f1b4b7a9047',
          ApprovalSectionOrder: 16,
          ApprovalSectionLeftQuestions: [
            '8d41dd0f-3140-412c-9fd8-a17116d30800',
            'bfaeb699-ad10-4d68-acdb-2195f58d2ed2',
            'b15d1e1f-9bea-447a-afb8-fcdabcfad75e'
          ]
        },
        {
          ApprovalSectionTitle: 'Test-7',
          ApprovalSectionRightQuestions: [
            'Award Timelines-Z4C',
            'Core Information-H8O',
            'Core Information-B4S'
          ],
          ApprovalSectionId: '44439c34-aff1-484b-b324-47918a9e0dcc',
          ApprovalSectionOrder: 17,
          ApprovalSectionLeftQuestions: [
            'Award Timelines-Y8U',
            'Key Budget Specs-AB1',
            'b4737fd2-9d1c-4ba9-bd02-b75cfcfbcb4a'
          ]
        },
        {
          ApprovalSectionTitle: 'TestCRMEE',
          ApprovalSectionRightQuestions: [
            '6939d6ed-4590-4e35-90a9-ebfb89d52f75',
            '86ab41b4-8451-4e6c-93c6-b6b09aa47bac'
          ],
          ApprovalSectionId: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f',
          ApprovalSectionOrder: 18,
          ApprovalSectionLeftQuestions: [
            'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
            '091831ad-3dd6-4e54-a1b1-a39ce5717431'
          ]
        }
      ],
      approvalsCount: 14,
      isApprovalCountPresent: true,
      switchTemplateStatus: false,
      customUnityTabs: [
        {
          UnityTabSectionOrder: 3,
          UnityTabSectionId: 'cb8a7037-baae-40d7-a773-cfe1691f2b7f',
          UnityTabSectionQuestions: [
            'Opportunity Overview-D3B',
            'e72bfc28-93f0-48d7-9d42-09eed99d5313',
            '9b3ef652-3cae-4681-8cd2-5c682bb7e0e7',
            'a3091fa4-1322-4de9-840c-f989934ce94b',
            'Opportunity Overview-Z4X',
            '1ff588a9-3f7f-401f-96a6-3505729195c2'
          ],
          UnityTabSectionTitle: 'testqa',
          TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
          UnityTabOrder: 2,
          UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
          UnityTabTitle: 'new custom tab1'
        },
        {
          UnityTabSectionOrder: 7,
          UnityTabSectionId: 'cf4c49a5-3269-4d3d-8a7f-405cbed8cde0',
          UnityTabSectionQuestions: ['8f8c4242-2010-46b2-b052-23a97c3665f5'],
          UnityTabSectionTitle: 'Incidence and Prevalence',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        },
        {
          UnityTabSectionOrder: 3,
          UnityTabSectionId: 'd3035478-c7b2-456c-bfb1-aae447eea593',
          UnityTabSectionQuestions: [
            '0682d92b-69aa-464e-bb5d-3325a745768b',
            '905cb23f-e869-4fcb-9798-5ee23162f8cc',
            '8eaa464b-eb2a-4d3f-9dd8-5f27b9c0c0bc',
            '8473ffc5-7944-47e6-b3ac-df5c4d1ce8bc'
          ],
          UnityTabSectionTitle: 'Country Outreach',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        },
        {
          UnityTabSectionOrder: 11,
          UnityTabSectionId: 'db7d3b73-329a-42c9-bbdc-4fad9837cc40',
          UnityTabSectionQuestions: [
            'e1a0f168-9370-4150-8637-99a1b1401ae5',
            'ed823024-ce2d-4bd3-bba6-8313c61b4f0a'
          ],
          UnityTabSectionTitle: 'Drug Market Assessment',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        },
        {
          UnityTabSectionOrder: 5,
          UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
          UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
          UnityTabSectionTitle: 'Competitive Landscape',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        },
        {
          UnityTabSectionOrder: 13,
          UnityTabSectionId: 'f9293887-1864-40cb-803e-f13693691935',
          UnityTabSectionQuestions: [
            '64da6471-205a-4ff5-baf7-27d019ace0c7',
            '02feee96-422f-4128-9b3d-e07783eaac04'
          ],
          UnityTabSectionTitle: 'Clinical Patient Journey',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        }
      ],
      bidStopStatus: false,
      nextMilestone: [
        {
          name: 'test- varsha',
          date: '01-Feb-2024'
        }
      ]
    },
    proposalQuestions: [
      {
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        questionId: '016ea6d2-4d60-4b29-8769-f3fb492c610d',
        section: {
          sectionOrder: 14,
          sectionName: 'Site Analytics'
        },
        questionText: 'External trials to flag and include ',
        answerConfiguration: {
          type: 'text',
          options: []
        },
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
      }
    ],
    proposalUsers: [
      {
        userEmail: 'jadhavshubhangi.madan@iqvia.com.invalid',
        userId: ''
      }
    ]
  };
  const resp = [
    {
      isCurrent: true,
      proposal: proposalData.proposal
    }
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('updateFilters', async () => {
    await store.dispatch(updateFilters('name', 'value'));
    expect(store.getState().unitytab.filters).toEqual([
      {
        displayName: 'Answered',
        group: 'answer',
        name: 'answered',
        value: false
      },
      {
        displayName: 'Unanswered',
        group: 'answer',
        name: 'unanswered',
        value: false
      },
      {
        displayName: 'Verification Required',
        group: 'verification',
        name: 'verificationRequired',
        value: false
      },
      {
        displayName: 'Responsible',
        group: 'roles',
        name: 'responsible',
        value: false
      },
      {
        displayName: 'Informed',
        group: 'roles',
        name: 'informed',
        value: false
      }
    ]);
  });

  test('resetFiltersAction', async () => {
    await store.dispatch(resetFiltersAction());
  });
  test('setAllUnityTab', async () => {
    await store.dispatch(setAllUnityTab([]));
  });
  test('setTabRefresh', async () => {
    await store.dispatch(setTabRefresh(`tab-refresh-${Date.now()}`));
  });
  test('resetSingleTabFiltersAction', async () => {
    await store.dispatch(resetSingleTabFiltersAction());
  });
  test('editUnityQuestion', async () => {
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'editUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(editUnityQuestion('dawd', 'adwdawd', 'dawd', {}));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('editUnityQuestion customTab', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'editUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      editUnityQuestion(
        'dawd',
        'adwdawd',
        { type: 'customTab' },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('editUnityQuestion not customTab', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'editUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      editUnityQuestion(
        'dawd',
        'adwdawd',
        { type: '' },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('deleteUnityQuestion customTab', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'deleteUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      deleteUnityQuestion(
        {
          proposalId: 'dwadawd',
          type: ''
        },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('deleteUnityQuestion approval', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'deleteUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      deleteUnityQuestion(
        {
          proposalId: 'dwadawd',
          type: ''
        },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('setUnityQuestion customTab', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'setUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      setUnityQuestion(
        'dadawdawd',
        { type: 'customTab' },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('setUnityQuestion approval', async () => {
    jest.spyOn(oppApi, 'getAllProposals').mockResolvedValue(resp);
    jest.spyOn(oppApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          ...proposalData
        }
      }
    ]);
    store.dispatch(getOpportunity('test', 1, 'Post_Award', null, false));
    const mockGetFavoritesOpportunity = jest
      .spyOn(unitytabApi, 'setUnityQuestionData')
      .mockResolvedValue({ data: data });
    await store.dispatch(
      setUnityQuestion(
        'dadawdawd',
        { type: '' },
        { addQuestionWrapper: jest.fn() }
      )
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('updateNewFilters', async () => {
    await store.dispatch(updateNewFilters('name', 'value'));
  });
  test('search', async () => {
    await store.dispatch(updateQuerySearchAction('test'));
    await store.dispatch(updateFilters('name', 'value'));
  });
});
