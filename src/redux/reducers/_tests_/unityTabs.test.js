import unityTabsReducer from '../unityTabs';
import { UNITY_TABS } from '../../../constants/types';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as data from '../../../components/screens/Opportunity/__tests__/mockdata/document.json';
import tabdata from '../../../components/views/modals/__test__/tabdata.json';
import cloneDeep from 'lodash/cloneDeep';
import { Map } from 'immutable';
import { store } from '../../../store';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const cloneData = cloneDeep(data);

cloneData.proposal.unityTabQuestionLoading = Map({
  questionId: '',
  value: false
});
cloneData.proposal.opportunityData = Map({});
cloneData.proposal.proposalAnswerTypes = ['text', 'date', 'number', 'table'];
cloneData.proposal.editQuestionsData = Map({});
cloneData.proposal.getAnswerTypesDataF = jest.fn();
cloneData.proposal.getRolesInfoF = jest.fn();
cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
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
describe('unityTabsReducer', () => {
  test('set unity tabs', () => {
    const action = {
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: [
        {
          UnityTabSectionOrder: 5,
          UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
          UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
          UnityTabSectionTitle: 'Competitive Landscape',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        }
      ]
    };
    const expectedState = {
      '73b4e93b-d678-4244-9732-0fd533723baf': [
        {
          UnityTabSectionOrder: 5,
          UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
          UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
          UnityTabSectionTitle: 'Competitive Landscape',
          TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabOrder: 1,
          UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
          UnityTabTitle: 'Akasha'
        }
      ]
    };

    const result = unityTabsReducer(initialState, action);
    expect(result.allTabs).toEqual(expectedState);
  });
  test('should add new filter to state', () => {
    const initialState = {
      filters: [
        { group: 'milestone', name: 'Filter 1' },
        { group: 'status', name: 'Filter 2' }
      ]
    };

    const expectedState = {
      filters: [
        { group: 'status', name: 'Filter 2' },
        { group: 'milestone', name: 'Filter 3' },
        { group: 'status', name: 'Filter 4' }
      ]
    };
    const action = {
      type: UNITY_TABS.UPDATE_NEW_FILTER,
      payload: [
        { group: 'milestone', name: 'Filter 3' },
        { group: 'status', name: 'Filter 4' }
      ]
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  test('customTabRefresh', () => {
    const initialState = {
      tabRefresh: `Refresh${Date.now().toString()}`
    };

    const expectedState = {
      tabRefresh: 'dawdawda'
    };
    const action = {
      type: UNITY_TABS.SET_TAB_REFRESH,
      payload: 'dawdawda'
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  test('resetFilters', () => {
    const initialState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ]
    };

    const expectedState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ]
    };
    const action = {
      type: UNITY_TABS.RESET_FILTERS
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  test('reset single Filters', () => {
    const initialState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ]
    };

    const expectedState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ]
    };
    const action = {
      type: UNITY_TABS.RESET_SINGLE_TAB_FILTERS
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  test('updateCustomQuestion', () => {
    const initialState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };

    const expectedState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };
    const action = {
      type: UNITY_TABS.UPDATE_CUSTOM_QUESTION_CUSTOM_TAB,
      payload: {
        questionId: '070143a3-4e9e-4413-89dc-297d2b249c64',
        section: {
          tabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          sectionName: 'Competitive Landscape'
        }
      }
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  test('deleteCustomQuestion', () => {
    const initialState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };

    const expectedState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: [],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };
    const action = {
      type: UNITY_TABS.DELETE_CUSTOM_QUESTION_CUSTOM_TAB,
      payload: {
        questionId: '070143a3-4e9e-4413-89dc-297d2b249c64',
        sectionName: 'Competitive Landscape',
        tabId: '73b4e93b-d678-4244-9732-0fd533723baf'
      }
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  test('setCustomQuestion', () => {
    const initialState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: ['070143a3-4e9e-4413-89dc-297d2b249c64'],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };

    const expectedState = {
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
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        }
      ],
      allTabs: {
        '73b4e93b-d678-4244-9732-0fd533723baf': [
          {
            UnityTabSectionOrder: 5,
            UnityTabSectionId: 'f76b8cb7-2737-4912-bfa0-5017647c16b6',
            UnityTabSectionQuestions: [
              '070143a3-4e9e-4413-89dc-297d2b249c64',
              '070143a3-4e9e-4413-89dc-297d2b249c66'
            ],
            UnityTabSectionTitle: 'Competitive Landscape',
            TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabOrder: 1,
            UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
            UnityTabTitle: 'Akasha'
          }
        ]
      }
    };
    const action = {
      type: UNITY_TABS.UPDATE_CUSTOM_QUESTION_CUSTOM_TAB,
      payload: {
        questionId: '070143a3-4e9e-4413-89dc-297d2b249c66',
        section: {
          tabID: '73b4e93b-d678-4244-9732-0fd533723baf',
          sectionName: 'Competitive Landscape'
        }
      }
    };
    const result = unityTabsReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
