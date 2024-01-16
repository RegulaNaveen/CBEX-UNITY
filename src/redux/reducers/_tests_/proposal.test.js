import proposalReducer from '../proposal';
import { PROPOSAL } from '../../../constants/types';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as data from '../../../components/screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../components/views/modals/__test__/tabdata.json';
import cloneDeep from 'lodash/cloneDeep';
import { Map } from 'immutable';
import { store } from '../../../store';
import * as proposalAction from '../../actions/proposal-actions';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cloneData = cloneDeep(data);

cloneData.proposal.unityTabQuestionLoading = Map({
  questionId: '',
  value: false
});
cloneData.proposal.opportunityData['9aa9dfe2-1222-4dff-8977-f06f45656a4b'] =
  Map(
    cloneData.proposal.opportunityData['9aa9dfe2-1222-4dff-8977-f06f45656a4b']
  );
cloneData.proposal.opportunityData = Map(cloneData.proposal.opportunityData);
cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
cloneData.proposal.editQuestionsData = Map({});
cloneData.proposal.getAnswerTypesDataF = jest.fn();
cloneData.proposal.getRolesInfoF = jest.fn();
cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
cloneData.proposal.questionsFilter = Map(cloneData.proposal.questionsFilter);
const initialState = {
  ssoAuth: Map(data.ssoAuth),
  proposal: Map(cloneData.proposal),
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
  unitytab: tabdata.unitytab,
  approvals: tabdata.approvals,
  search: {
    query: null,
    isOpen: false,
    currentResultIndex: -1,
    prevResult: null,
    totalResultsFound: 0,
    searching: false,
    searchResults: [],
    autoNavigatedToCurrentResult: true,
    clearInputFlag: false,
    showModal: false,
    modalTitle: '',
    modalContent: ''
  }
};
// const customstore = mockStore(initialState);
describe('proposal reducer', () => {
  test('set unity tabs', () => {
    const action = {
      type: PROPOSAL.CHANGE_BID,
      payload: {
        proposalDetails: {
          proposal: {
            proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
            accountId: '0017A00000yjoWDQAY',
            opportunityName: 'Testing4968',
            agreementId: 'aNM7A0000008SyzWAE',
            agreementName: 'Testing4968',
            proposalDate: '2023-12-15T11:11:31.595Z',
            proposalDetails: {
              Customer: 'Sapthmi M Shetty_5',
              'CRM #': 'JAB53166',
              'Bid due date': '2024-01-19',
              'Line of business': 'Connected Devices',
              'Is this IQVIA Biotech': 'Yes',
              Phase: 'Phase 2b',
              'Verbatim indication': 'test24',
              'Therapeutic area': 'Oncology',
              'Protocol number': '',
              'Product name': 'druggsa',
              IsFsp: 'No',
              opportunityId: '0067A00000DMzxgQAD',
              BoxId: '',
              pertinentDetails: null,
              earlyEngagementDevelopmentPlan: '',
              typeOfActivity: 'Post Award - Non-compete strategy development',
              describeActivity: 'Testt',
              requestDetail: '',
              bidNo: 1,
              bidType: 'Post_Award_Bid'
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
            questionTemplateVersionNumber: 'v2024.24',
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
            approvalsCount: 15,
            isApprovalCountPresent: true,
            switchTemplateStatus: false,
            customUnityTabs: [
              {
                UnityTabSectionOrder: 15,
                UnityTabSectionId: '0074ecf4-9212-4cbd-9185-e8db4f3a47aa',
                UnityTabSectionQuestions: [
                  '62853a4c-3781-4682-8ea1-61a92f88ff87',
                  '2302aabf-9754-4df7-bc31-4ddeb313ab0f'
                ],
                UnityTabSectionTitle:
                  'Diversity and Inclusion in Clinical Trials',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 25,
                UnityTabSectionId: '0290ed63-4953-43d3-90c6-5e8beb4c548f',
                UnityTabSectionQuestions: [
                  '9b3ef652-3cae-4681-8cd2-5c682bb7e0e7'
                ],
                UnityTabSectionTitle: 'Test_4447',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 16,
                UnityTabSectionId: '034fc1a7-201c-40c0-aa7e-e3034dcf172f',
                UnityTabSectionQuestions: [
                  '362344e8-d9ff-4809-a9c2-0225ca0603b9'
                ],
                UnityTabSectionTitle: 'Referral Networks',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 23,
                UnityTabSectionId: '0885e506-c54a-4e73-ac0d-1da1cac909fa',
                UnityTabSectionQuestions: [
                  'c717c432-fed0-4d91-b7d8-cb970ef3700a',
                  '1a1b4688-ad39-448a-9e71-8c303c9ee5d9'
                ],
                UnityTabSectionTitle: 'testqa123',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 12,
                UnityTabSectionId: '0d753560-8617-4a69-96e1-6d69b573fc0f',
                UnityTabSectionQuestions: [
                  '42f8e322-70cc-45e4-a805-eaccf3fa6993'
                ],
                UnityTabSectionTitle: 'Standard of Care',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 3,
                UnityTabSectionId: '0e5464bf-01fd-40c0-bcc6-afe191db26da',
                UnityTabSectionQuestions: [],
                UnityTabSectionTitle: 'Test123',
                TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabOrder: 2,
                UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabTitle: 'new custom tab1'
              },
              {
                UnityTabSectionOrder: 5,
                UnityTabSectionId: '119d5d83-e410-4d98-a667-306bdf72c362',
                UnityTabSectionQuestions: [
                  '091831ad-3dd6-4e54-a1b1-a39ce5717431',
                  '86ab41b4-8451-4e6c-93c6-b6b09aa47bac'
                ],
                UnityTabSectionTitle: 'TestCRMEE',
                TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabOrder: 2,
                UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabTitle: 'new custom tab1'
              },
              {
                UnityTabSectionOrder: 22,
                UnityTabSectionId: '135d172f-0812-4679-997f-4ceaeeb4f909',
                UnityTabSectionQuestions: [],
                UnityTabSectionTitle: 'testqa',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 21,
                UnityTabSectionId: '1fea600b-30cf-4540-ae57-9c4624c970e0',
                UnityTabSectionQuestions: [
                  'Key stakeholders-Y0L',
                  'Pricing-C8T',
                  'Proposal Team-Z5P',
                  'Proposal Team-P0X'
                ],
                UnityTabSectionTitle: 'Test lasts1',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 17,
                UnityTabSectionId: '233d05ae-da13-4b3d-96e6-a922bc965549',
                UnityTabSectionQuestions: [],
                UnityTabSectionTitle: 'Additional Details',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 9,
                UnityTabSectionId: '24d6e412-2524-42d1-8314-8753cd817bdf',
                UnityTabSectionQuestions: [
                  '88cca47a-c041-40ff-a922-2853f578b269',
                  '969e5c16-b77f-4331-bc24-67a60dca8403',
                  '39867e12-b30f-4093-9c8d-96b3dbf81a9e',
                  '0b01308f-77b5-44d2-b5b9-ceb9ef039a9d',
                  '8c723590-fcee-4cf5-a9f6-0197756699df',
                  'e4e9e10b-4076-4eaa-a38c-fb438b733c9f',
                  'ddae18c6-6a5a-48be-aca8-136fafaecd37',
                  'd69d891b-22c8-40c8-8b86-bf8ce054da67',
                  'e0ec3346-4363-4323-92ed-20f148514dab',
                  '51975132-6136-4137-a2a3-ebb0c96afd18',
                  '4aeca3ca-53f8-4dbf-a3c6-a8f261883e11',
                  '82878dfd-c8fd-4fbe-9440-dae99d46c92c',
                  '385e5fa2-35ec-4428-a3a5-791447e4080b',
                  '45be05c5-2c79-4dc0-8cc4-3a76a22b3073',
                  '46723421-207c-4669-9168-12f812090ca7',
                  'd5e94125-6b09-42ce-ba80-c94f1ec99c20',
                  '8c4569ba-ec7c-48a8-b191-54d560b55874',
                  '20d2501e-2a74-471a-b691-ec3f13b1d755',
                  '6a6b7e8e-68d1-429a-9570-3626abf9e053',
                  '0a752e30-2390-435f-b2b7-e3aad14968c6',
                  '5948da59-d639-4ac8-a621-76f40109b5c2',
                  '6cede2a3-1c76-4d64-a15b-1ec2eb5568dd',
                  '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
                  '78f5ead7-724b-45b4-91f9-cb083ed0b696',
                  'acd3a9be-6e6f-4cfc-b6c6-313bd317c963',
                  '58e6bfde-1cc9-4dd2-93e4-e6177509a962',
                  '984df890-8490-4645-a99c-158beb5af704',
                  '016ea6d2-4d60-4b29-8769-f3fb492c610d',
                  '6fcbad96-9458-4f85-92f0-3f4ec912e991',
                  'Opportunity Overview-H1X',
                  '1d9c9221-7771-4e4e-b61a-f77d217e0d51',
                  '174fc87b-c5a6-45a8-9968-e76f8ac20514',
                  'c009de22-e19a-4faf-96c6-2ab9b136564a',
                  '8f49abbe-2990-4da9-8cfb-dade8dbd4d4a',
                  '908f34ae-c273-46cf-89a3-a9fd6ed88be2',
                  '66aa7a78-1e46-42b2-b427-37c6a88efdbb',
                  'c2881b25-010d-4d51-8683-6bffd119aa38',
                  '24d1e5cd-6514-4327-97e7-9735322353b1',
                  '234a5c56-96d0-424c-bfa2-1b7d167e8918',
                  '27b0d74e-eae0-46f5-8330-a4bf101f46b7',
                  '380ba499-8ac6-4202-8fd4-84a018b43e1e',
                  '614776ff-fd93-4781-aabe-59d2b1e984a4',
                  '53fa267b-48d0-4410-a2ac-7d1e1758a7af',
                  '78bf1a73-96e4-47e6-8409-15fd4d0a5dee',
                  '41cd0e86-334b-4d04-be6c-6d17dc62ece1',
                  'fe476769-dc67-4998-9534-4d623795f14d',
                  '8ceeaafb-934c-4327-8278-1ba94fc631e7',
                  '0f601ad7-7d37-4749-8ed7-86b0b361c53b',
                  'da0d00ef-cb89-4554-b3a2-3b91ee25fff9',
                  '5a0d14c5-5574-4ce8-901a-aba3783b29ec',
                  '40e6527d-115c-4212-8d96-e69a8d107677',
                  '43ee48e6-656a-4fbe-9457-8247da6a3df1'
                ],
                UnityTabSectionTitle: 'Patient Density',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 2,
                UnityTabSectionId: '27604238-3ee8-46cd-a42d-9d33e224d0ea',
                UnityTabSectionQuestions: [
                  '3106acc8-d688-465f-907c-13d890870b43',
                  '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
                  '9a8c020c-0e54-412c-af8d-88650e48d5c6'
                ],
                UnityTabSectionTitle: 'hoo123',
                TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabOrder: 2,
                UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabTitle: 'new custom tab1'
              },
              {
                UnityTabSectionOrder: 18,
                UnityTabSectionId: '37b3cef8-6f7e-4909-b1ff-904a18f4a5ba',
                UnityTabSectionQuestions: [
                  'd1c360cf-def8-4b49-be31-77bc60c024e3',
                  '8d422d68-8f18-4f88-bc8b-73417e168cb2',
                  '80b1aa72-06d3-4449-b418-a4accfcd1090',
                  '089a1be1-164e-450c-8181-73e7ba403458',
                  'Core Information-V9R',
                  'Core Information-R3C',
                  'f8beb1de-3eab-48df-9b24-1b2a4982cc57',
                  '978170cb-4a33-4ae6-a8b5-94a10cda5f3c',
                  '71aacb8c-f7a9-42d7-922e-e2387eabf6c8',
                  'e01b3c3e-87b8-4ab4-bc7e-a32f62f7abf1',
                  'Country Strategy-N9P',
                  '755d16da-4d68-48bb-aba0-a33c60298b5e',
                  '421e2207-5650-48dd-984e-071e1890179c'
                ],
                UnityTabSectionTitle: 'Parameters',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 19,
                UnityTabSectionId: '3f1411f2-70a1-493a-9ca1-d00ae315e197',
                UnityTabSectionQuestions: [],
                UnityTabSectionTitle: 'Site Analytics',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 24,
                UnityTabSectionId: '41a03f2a-e36b-4c8a-8896-4df529c4de37',
                UnityTabSectionQuestions: [
                  '3a25176d-5be6-4d4f-b4b9-cd20c1722ef2'
                ],
                UnityTabSectionTitle: 'New Section 111',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 10,
                UnityTabSectionId: '45db65bf-8f47-4638-9501-ec98d66fa13b',
                UnityTabSectionQuestions: [
                  '7d5ef017-a168-4873-9a31-075f98e731f1',
                  '0fae37c2-6a4b-4648-a488-0835f77ef154',
                  'afc61d1a-0940-4dc9-9669-1d27ace44ab3',
                  '152b67cf-5d38-460f-a246-dacdfc401cd2',
                  '6d0f22bf-586c-4390-9409-1d0fd98b7dbd',
                  '4f7ac757-10ef-44cb-ad03-36b71e938e37',
                  'd1f23832-88d8-4319-81ac-53754528c6d2',
                  'ea2137c6-4c88-4738-98c6-d973739ce6a8',
                  '68daeb4b-f4d6-4231-a767-26a6c2a39fb7'
                ],
                UnityTabSectionTitle: 'Country Ranking',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 14,
                UnityTabSectionId: '460fcb5c-7751-4095-94db-33cbba781301',
                UnityTabSectionQuestions: [
                  '33008fe1-6b16-4604-86fa-78a623830aeb',
                  'd280c1ff-88d7-4f20-bde3-d507d4003383',
                  '909e6f4d-e0b0-4e14-af8c-57c5f6065827'
                ],
                UnityTabSectionTitle: 'Enrollment Predictability and Trends123',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 20,
                UnityTabSectionId: '482265ff-d3a8-4191-99ee-cb01e227745a',
                UnityTabSectionQuestions: [
                  '6fcbad96-9458-4f85-92f0-3f4ec912e991'
                ],
                UnityTabSectionTitle: 'Test 1234',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 4,
                UnityTabSectionId: '563f52ed-e221-4983-8d3e-e850b25e92a9',
                UnityTabSectionQuestions: [],
                UnityTabSectionTitle: 'Test 678',
                TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabOrder: 2,
                UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
                UnityTabTitle: 'new custom tab1'
              },
              {
                UnityTabSectionOrder: 6,
                UnityTabSectionId: '57ae1f9b-a204-419f-869d-8d72792bdee1',
                UnityTabSectionQuestions: [
                  '28efd039-8d44-4c1f-97f1-811ca868218d',
                  'c1a9d644-4130-4793-a330-97c2f574fb94',
                  '1168d27e-9870-4c5f-8a24-2d3dbefd4810',
                  '4eedb2b8-d9a2-412b-833f-b5d0b5bb5664',
                  '2dfd014f-8d06-4d87-9f59-0ee84cce22a7',
                  '32c01114-8b9b-4b4f-ab9e-fe9ddfb6c612',
                  '5aaf0ae1-4569-4ad9-a262-b3bf6f033b4c'
                ],
                UnityTabSectionTitle: 'Enrollment Rate Analysis',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 2,
                UnityTabSectionId: '591d76f3-382a-4f6f-ac5b-9f29309711d6',
                UnityTabSectionQuestions: [
                  '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
                  'a3091fa4-1322-4de9-840c-f989934ce94b',
                  '76aced19-0af2-46a0-b468-f30d05d7ba59'
                ],
                UnityTabSectionTitle: 'testcc',
                TabID: '04bb872c-9d48-4514-be16-fba5eb7fd789',
                UnityTabOrder: 3,
                UnityTabId: '04bb872c-9d48-4514-be16-fba5eb7fd789',
                UnityTabTitle: 'tesqacs34567'
              },
              {
                UnityTabSectionOrder: 1,
                UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
                UnityTabSectionQuestions: [
                  '9a8c020c-0e54-412c-af8d-88650e48d5c6',
                  '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
                  'Opportunity Overview-H1X',
                  'b7186e4c-962f-4886-9f83-d3e0f99b5986',
                  '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
                  '9835edd4-922b-458e-b90f-424c7f0bbaa4',
                  '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
                  '5958e559-0514-495a-8c40-f67db1e16a8f',
                  '6252734c-9e1b-496f-ab1e-8e010844ee3a',
                  '1c16e233-06a7-40d2-9e70-830c8a64f218',
                  'Study Challenges-G0H',
                  '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
                  'e9902a38-a4be-496b-abd4-88097174bd36',
                  'd050363a-24c5-4a73-af78-95bd8f27bdb4'
                ],
                UnityTabSectionTitle: 'Overviews',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 1,
                UnityTabSectionId: '9d00cf52-a2e5-4f05-b80c-f02cd439abba',
                UnityTabSectionQuestions: [
                  '3106acc8-d688-465f-907c-13d890870b43',
                  'Proposal Team-P0X',
                  '722f9c3c-5538-4b64-bda5-76604d61da46',
                  'Key stakeholders-Y0L',
                  'Opportunity Overview-H1X',
                  '06820d9a-602f-4402-85a7-f4d496fde054'
                ],
                UnityTabSectionTitle: 'Hellooo',
                TabID: '04bb872c-9d48-4514-be16-fba5eb7fd789',
                UnityTabOrder: 3,
                UnityTabId: '04bb872c-9d48-4514-be16-fba5eb7fd789',
                UnityTabTitle: 'tesqacs34567'
              },
              {
                UnityTabSectionOrder: 2,
                UnityTabSectionId: 'a174405f-d053-426e-93ac-d78098787294',
                UnityTabSectionQuestions: [
                  '2a30b4ac-354e-4168-987a-aa4b70910b77',
                  '599be84a-9ce8-4dca-b538-26342d8f9e2e',
                  'a7d5c3c7-53f9-4dda-9c4e-5b0129079fd9'
                ],
                UnityTabSectionTitle: 'Site Outreach123',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 8,
                UnityTabSectionId: 'b1b1e630-f1e3-418e-835e-98efaf53d2b4',
                UnityTabSectionQuestions: [
                  'f848e918-a83c-4b76-bd5d-da112119630e'
                ],
                UnityTabSectionTitle: 'Patient Funnel',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
              {
                UnityTabSectionOrder: 4,
                UnityTabSectionId: 'b44a39e8-92be-4bea-9bd2-1a7f2bc8ca99',
                UnityTabSectionQuestions: [
                  '4870349b-3abe-4573-b691-9ec638ff1390',
                  '8e633425-6871-4e96-b9ff-b9df1b5d65e0'
                ],
                UnityTabSectionTitle: 'Historic Experience Analysis123',
                TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabOrder: 1,
                UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
                UnityTabTitle: 'Akasha'
              },
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
                UnityTabSectionQuestions: [
                  '8f8c4242-2010-46b2-b052-23a97c3665f5'
                ],
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
                UnityTabSectionQuestions: [
                  '070143a3-4e9e-4413-89dc-297d2b249c64'
                ],
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
              opportunityType:
                'Default Type,Core Opportunity Launch Call (AMR/EMEA)',
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
            },
            {
              proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
              questionId: '02849e48-3c63-4cbc-b2d1-d0d8c6fbb2f0',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              questionText:
                'Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              roleNames: ['Business Developer'],
              answers: [],
              questionOrder: 18,
              visible: true,
              locked: false,
              sfObject: 'n/a',
              sfField: 'n/a',
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              hasDifferentSFanswer: false,
              isCustomQuestion: false,
              questionJSON:
                '{"blocks":[{"key":"8ipjl","text":"Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8gies" data-offset-key="8ipjl-0-0"><div data-offset-key="8ipjl-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8ipjl-0-0"><span data-text="true">Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.</span></span></div></div></div>',
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
              bidType: 'Post_Award_Bid'
            }
          ],
          proposalUsers: [
            {
              userEmail: 'jadhavshubhangi.madan@iqvia.com',
              userName: 'Jadhav Shubhangi Madan',
              userId: '1127601'
            }
          ],
          isCurrent: true
        },
        bid: {
          bidDueDate: '2024-01-19',
          bidDate: '2023-12-15T11:11:31.595Z',
          bidId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
          isCurrent: true,
          bidName: 'Post Award  1',
          bidStatus: '',
          pertinentDetails: null,
          earlyEngagementDevelopmentPlan: '',
          describeActivity: 'Testt',
          typeOfActivity: 'Post Award - Non-compete strategy development',
          requestDetail: '',
          bidNo: '1',
          bidType: 'Post_Award_Bid',
          isEditable: true
        }
      }
    };
    const expectedState = {
      typeOfActivity: 'Post Award - Non-compete strategy development',
      proposalDate: '2023-12-15T11:11:31.595Z',
      requestDetail: '',
      questionTemplateVersionNumber: 'v2024.24',
      earlyEngagementDevelopmentPlan: '',
      opportunityStatus: '5. Finalizing Deal',
      agreementId: 'aNM7A0000008SyzWAE',
      accountId: '0017A00000yjoWDQAY',
      bidName: 'Post Award  1',
      opportunityType: 'Default Type',
      isEditable: true,
      opportunityId: '0067A00000DMzxgQAD',
      isCurrent: true,
      bidStopStatus: false,
      pertinentDetails: null,
      typeOfWidget: undefined,
      bidType: 'Post_Award_Bid',
      isApprovalCountPresent: true,
      describeActivity: 'Testt',
      id: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
      nextMilestone: '',
      opportunityName: 'Testing4968'
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.selectedBid).toEqual(expectedState);
  });

  test('updateProposalDetail PROPOSAL_DETAIL_UPDATE', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_DETAIL_UPDATE,
      payload: {
        proposalDetails: {
          Customer: 'Sapthmi M Shetty_5',
          'CRM #': 'JAB53166',
          'Bid due date': '2024-01-19',
          'Line of business': 'Connected Devices',
          'Is this IQVIA Biotech': 'Yes',
          Phase: 'Phase 2b',
          'Verbatim indication': 'test24',
          'Therapeutic area': 'Oncology',
          'Protocol number': '',
          'Product name': 'druggsa',
          IsFsp: 'No',
          opportunityId: '0067A00000DMzxgQAD',
          BoxId: '',
          pertinentDetails: null,
          earlyEngagementDevelopmentPlan: '',
          typeOfActivity: 'Post Award - Non-compete strategy development',
          describeActivity: 'Testt',
          requestDetail: '',
          bidNo: 1,
          bidType: 'Post_Award_Bid'
        },
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b'
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });
  test('updateProposalDetail socket data', () => {
    const action = {
      type: PROPOSAL.UPDATE_DASHBOARD_OPPORTUNITY,
      payload: {
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        data: {
          proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
          proposalDetails: {
            Customer: 'Sapthmi M Shetty_5',
            'CRM #': 'JAB53166',
            'Bid due date': '2024-01-19',
            'Line of business': 'Connected Devices',
            'Is this IQVIA Biotech': 'Yes',
            Phase: 'Phase 2b',
            'Verbatim indication': 'test24',
            'Therapeutic area': 'Oncology',
            'Protocol number': '',
            'Product name': 'druggsa',
            IsFsp: 'No',
            opportunityId: '0067A00000DMzxgQAD',
            BoxId: '',
            pertinentDetails: null,
            earlyEngagementDevelopmentPlan: '',
            typeOfActivity: 'Post Award - Non-compete strategy development',
            describeActivity: 'Testt',
            requestDetail: '',
            bidNo: 1,
            bidType: 'Post_Award_Bid'
          }
        }
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });

  test('updateProposalDetail PROPOSAL_DETAIL_UPDATE', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_DETAIL_UPDATE,
      payload: {
        proposalDetails: {
          Customer: 'Sapthmi M Shetty_5',
          'CRM #': 'JAB53166',
          'Bid due date': '2024-01-19',
          'Line of business': 'Connected Devices',
          'Is this IQVIA Biotech': 'Yes',
          Phase: 'Phase 2b',
          'Verbatim indication': 'test24',
          'Therapeutic area': 'Oncology',
          'Protocol number': '',
          'Product name': 'druggsa',
          IsFsp: 'No',
          opportunityId: '0067A00000DMzxgQAD',
          BoxId: '',
          pertinentDetails: null,
          earlyEngagementDevelopmentPlan: '',
          typeOfActivity: 'Post Award - Non-compete strategy development',
          describeActivity: 'Testt',
          requestDetail: '',
          bidNo: 1,
          bidType: 'Post_Award_Bid'
        },
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b'
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });
  test('updateProposalDetailSF UPDATE_PROPOSAL_DETAIL_SF socket data', () => {
    const action = {
      type: PROPOSAL.UPDATE_PROPOSAL_DETAIL_SF,
      payload: {
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        data: {
          proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
          proposalDetails: {
            Customer: 'Sapthmi M Shetty_5',
            'CRM #': 'JAB53166',
            'Bid due date': '2024-01-19',
            'Line of business': 'Connected Devices',
            'Is this IQVIA Biotech': 'Yes',
            Phase: 'Phase 2b',
            'Verbatim indication': 'test24',
            'Therapeutic area': 'Oncology',
            'Protocol number': '',
            'Product name': 'druggsa',
            IsFsp: 'No',
            opportunityId: '0067A00000DMzxgQAD',
            BoxId: '',
            pertinentDetails: null,
            earlyEngagementDevelopmentPlan: '',
            typeOfActivity: 'Post Award - Non-compete strategy development',
            describeActivity: 'Testt',
            requestDetail: '',
            bidNo: 1,
            bidType: 'Post_Award_Bid'
          },
          bidStatusKey: true,
          bidStopStatus: true
        }
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });
  test('updateProposalDetailSF early engagement UPDATE_PROPOSAL_DETAIL_SF socket data', () => {
    const action = {
      type: PROPOSAL.UPDATE_PROPOSAL_DETAIL_SF,
      payload: {
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        data: {
          proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
          proposalDetails: {
            Customer: 'Sapthmi M Shetty_5',
            'CRM #': 'JAB53166',
            'Bid due date': '2024-01-19',
            'Line of business': 'Connected Devices',
            'Is this IQVIA Biotech': 'Yes',
            Phase: 'Phase 2b',
            'Verbatim indication': 'test24',
            'Therapeutic area': 'Oncology',
            'Protocol number': '',
            'Product name': 'druggsa',
            IsFsp: 'No',
            opportunityId: '0067A00000DMzxgQAD',
            BoxId: '',
            pertinentDetails: null,
            earlyEngagementDevelopmentPlan: '',
            typeOfActivity: 'Post Award - Non-compete strategy development',
            describeActivity: 'Testt',
            requestDetail: '',
            bidNo: 1,
            bidType: 'Post_Award_Bid'
          },
          earlyEngagementBid: true
        }
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1,
      earlyEngagementDevelopmentPlan: '',
      describeActivity: 'Testt',
      requestDetail: '',
      typeOfActivity: 'Post Award - Non-compete strategy development'
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });

  test('updateOportunityDetailData  early engagement UPDATE_PROPOSAL_DETAIL_SF socket data', () => {
    const action = {
      type: PROPOSAL.DASHBOARD_PROPOSAL_DETAIL,
      payload: {
        proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
        data: {
          proposalId: '9aa9dfe2-1222-4dff-8977-f06f45656a4b',
          proposalDetails: {
            Customer: 'Sapthmi M Shetty_5',
            'CRM #': 'JAB53166',
            'Bid due date': '2024-01-19',
            'Line of business': 'Connected Devices',
            'Is this IQVIA Biotech': 'Yes',
            Phase: 'Phase 2b',
            'Verbatim indication': 'test24',
            'Therapeutic area': 'Oncology',
            'Protocol number': '',
            'Product name': 'druggsa',
            IsFsp: 'No',
            opportunityId: '0067A00000DMzxgQAD',
            BoxId: '',
            pertinentDetails: null,
            earlyEngagementDevelopmentPlan: '',
            typeOfActivity: 'Post Award - Non-compete strategy development',
            describeActivity: 'Testt',
            requestDetail: '',
            bidNo: 1,
            bidType: 'Post_Award_Bid'
          },
          sfField: true,
          questionSfField: 'Name',
          questionsfObject: 'Opportunity'
        }
      }
    };
    const expectedState = {
      Customer: 'Test_V',
      'CRM #': 'UZA89103',
      'Bid due date': '2023-01-31',
      'Line of business': 'Clinical',
      'Is this IQVIA Biotech': 'Yes',
      Phase: 'Phase 1',
      'Verbatim indication': 'QA testing',
      'Therapeutic area': 'Cardiology',
      'Protocol number': '12345678',
      'Product name': '32456789',
      BoxId: '186605979335',
      IsFsp: 'No',
      pertinentDetails: 'Testing',
      opportunityId: '0060100000BAJ0tAAH',
      bidNo: 1
    };
    let result = proposalReducer(initialState.proposal, action);
    result = result.toJS();
    expect(result.proposalDetails).toEqual(expectedState);
  });

  test('CHANGE_BID_LOADER', () => {
    const action = {
      type: PROPOSAL.CHANGE_BID_LOADER,
      payload: false
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('INTEGRATIONS_INFO', () => {
    const action = {
      type: PROPOSAL.INTEGRATIONS_INFO,
      payload: {}
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD,
      payload: Map(cloneData.proposal.editQuestionsData)
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onGettingProposalBoxId', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_BOX_ID_LOADING
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onGetProposalBoxId', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_BOX_ID_LOADING,
      payload: {
        boxId: 'xyzabc'
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onGetProposalBoxId', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_BOX_ID,
      payload: {
        boxId: 'xyzabc'
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });

  test('fetchBoxAdditionalLink', () => {
    const action = {
      type: PROPOSAL.BOX_ADDITIONAL_LINK,
      payload: {
        boxlink: 'xyzabc'
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });

  test('onGettingBoxIdError', () => {
    const action = {
      type: PROPOSAL.PROPOSAL_BOX_ID_ERROR,
      payload: {
        error: {
          message: 'wrong boxid'
        }
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onGettingfetchBoxAdditionalLinkError ', () => {
    const action = {
      type: PROPOSAL.BOX_ADDITIONAL_LINK_ERROR,
      payload: {
        error: {
          message: 'wrong boxid'
        }
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onSetQuestion ', () => {
    jest
      .spyOn(proposalAction, 'getQuestionsFilterApplied')
      .mockReturnValue(cloneData.proposal.proposalQuestions);
    const action = {
      type: PROPOSAL.PROPOSAL_SET_QUESTION,
      payload: {
        questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9'
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('updateQuestionLockByUser ', () => {
    const localStorageMock = (function () {
      let store = {
        userEmail: 'abc@yopmail.com'
      };

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        }
      };
    })();

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const action = {
      type: PROPOSAL.QUESTION_LOCK_BY_USER,
      payload: {
        data: {
          questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
          proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
          userEmail: 'testuser@iqvia.com',
          userId: '109689',
          userName: 'Test User'
        }
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });

  test('updateQuestionUnlockByUser ', () => {
    const action = {
      type: PROPOSAL.QUESTION_UNLOCK_BY_USER,
      payload: {
        data: {
          questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
          proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
          userEmail: 'rahul.tiwari@iqvia.com',
          userId: '109689',
          userName: 'Test User'
        },
        clientQuestionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9'
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });

  test('questionLockDetails ', () => {
    const localStorageMock = (function () {
      let store = {
        userEmail: 'abc@yopmail.com'
      };

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        }
      };
    })();

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const action = {
      type: PROPOSAL.QUESTION_LOCK_DETAILS_ALL,
      payload: {
        data: [
          {
            questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
            proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
            userEmail: 'testuser@iqvia.com',
            userId: '109689',
            userName: 'Test User'
          }
        ]
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });

  test('onUpdateModifiedQuestion', () => {
    const action = {
      type: PROPOSAL.UPDATE_MODIFIED_QUESTION,
      payload: {
        question: [
          {
            questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9'
          }
        ]
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onErrorUpdateNotApplicable', () => {
    const action = {
      type: PROPOSAL.ERROR_UPDATE_NOT_APPLICABLE,
      payload: {
        question: [
          {
            questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
            loading: true
          }
        ]
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onUpdateProposalNAQuestionDone', () => {
    const action = {
      type: PROPOSAL.UPDATE_NOT_APPLICABLE_DONE,
      payload: {
        question: [
          {
            questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
            loading: false
          }
        ]
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onUpdateProposalNAQuestionFromSocketDone', () => {
    const action = {
      type: PROPOSAL.UPDATE_NOT_APPLICABLE_FROM_SOCKET_DONE,
      payload: {
        questionStatus: false,
        questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
        loading: false
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('onProposalNAQuestionLoading', () => {
    const action = {
      type: PROPOSAL.UPDATE_NOT_APPLICABLE_PROGRESS,
      payload: {
        questionId: '7d082239-2d5b-48cb-ab92-32c26fc39be9',
        loading: false
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
  test('addNewBid', () => {
    const action = {
      type: PROPOSAL.ADD_NEW_BID,
      payload: {
        proposal: {
          inProgress: false,
          proposalId: 'test',
          opportunityType: 'Core Clinical',
          bidStopStatus: false,
          questionTemplateVersionNumber: 'v:1.0.2',
          isApprovalCountPresent: 1,
          nextMilestone: '',
          customtab: [],
          approvals: [],
          opportunityOverview: {
            OpportunityStatus: 'test'
          },
          proposalDetails: {
            bidNo: 10,
            pertinentDetails: ''
          }
        },
        proposalQuestions: [],
        proposalUsers: [],
        isCurrent: true
      }
    };
    expect(proposalReducer(initialState.proposal, action)).toBeTruthy();
  });
});
