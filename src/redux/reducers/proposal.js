// @flow
import _, { isEqual, cloneDeep, groupBy, orderBy } from 'lodash';
import { Map, fromJS, OrderedMap, setIn } from 'immutable'; // NOSONAR
import { REDUX_TYPES } from '../../constants';
import type { ApiAction } from '../actions/action-types';
import { getUniqueMilestones } from '../selectors/proposal';
import { getQuestionsFilterApplied } from '../actions/proposal-actions';
import { OpportunitySFUpDATE } from '../../constants/app';
import moment from 'moment';
const {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  UPDATE_NOT_APPLICABLE_PROGRESS,
  UPDATE_NOT_APPLICABLE_DONE,
  UPDATE_NOT_APPLICABLE_FROM_SOCKET_DONE,
  PROPOSAL_ANSWER_ERROR,
  QUESTION_SECTION_INFO,
  QUESTION_SECTION_LOADING,
  QUESTION_SECTION_ERROR,
  ANSWER_TYPES_INFO,
  ANSWER_TYPES_LOADING,
  ANSWER_TYPES_ERROR,
  ROLES_INFO,
  ROLES_LOADING,
  ROLES_ERROR,
  PROPOSAL_SET_QUESTION,
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR,
  PROPOSAL_BOX_ID,
  PROPOSAL_BOX_ID_LOADING,
  PROPOSAL_BOX_ID_ERROR,
  UPDATE_MODIFIED_QUESTION,
  ON_FETCHING_VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA_ERROR,
  ON_APPLY_QUESTIONS_FILTER,
  ON_QUESTIONS_FILTERED,
  RESET_QUESTIONS_FILTER,
  CLEAR_QUESTIONS_FILTER,
  EXPAND_ALL_SECTIONS,
  SET_EDIT_QUESTION_DATA,
  PROPOSAL_EDIT_QUESTION,
  PROPOSAL_DELETE_QUESTION,
  OPPORTUNITY_INFO,
  UPDATE_BOX_BIDS,
  CHANGE_BID,
  ADD_NEW_BID,
  NEW_BID_CREATED,
  PROPOSAL_DETAIL_UPDATE,
  UPDATE_LOOKUP_OPTIONS,
  INTEGRATIONS_INFO,
  BOX_ADDITIONAL_LINK,
  BOX_ADDITIONAL_LINK_ERROR,
  BOX_OPPORTUNITY_FOLDER_ID,
  SWITCH_TEMP_STATUS,
  SWITCH_TEMP_IN_PROGRESS,
  RESET_PROPOSALID,
  QUESTION_LOCK_BY_USER,
  QUESTION_UNLOCK_BY_USER,
  QUESTION_LOCK_DETAILS_ALL,
  SET_FLAG,
  SHOW_NA_CHECKBOX,
  ERROR_UPDATE_NOT_APPLICABLE,
  SET_CAN_USER_TAG_IN_QUESTION,
  SET_UNITY_TAB_QUESTION_LOADING,
  SET_APPROVAL_QUESTION_LOADING,
  SET_PRICE_MODELER_FIELDS,
  SET_BID_COST_DATA_FIELDS,
  SET_PRICE_MODELER_RECALCULATING,
  PRICE_MODELER_UPDATE,
  SET_ACTIVE_TABINDEX,
  SET_PANEL_STATUS,
  SET_V_TAB_ACTIVE_INDEX,
  SET_V_TAB_USER_PREFERENCE,
  CHANGE_BID_STATUS_OPERATION,
  WIDGET_UPDATE,
  TOGGLE_FAVOURITE,
  SET_CUSTOM_NAME,
  SET_NEXT_MILESTONE,
  TOGGLE_EDIT_CUSTOM_NAME_MODAL,
  SET_EDIT_OPP_INFO,
  CLEAR_EDIT_OPP_INFO,
  DASHBOARD_PROPOSAL_DETAIL,
  UPDATE_PROPOSAL_DETAIL_SF,
  UPDATE_DASHBOARD_OPPORTUNITY,
  CHANGE_BID_LOADER,
  PROPOSAL_CUSTOM_TAB_SET_QUESTION,
  PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD
} = REDUX_TYPES.PROPOSAL;

const CLASS_QUES_FIL_R1_C1 = 'questions-filter__row1-col1';
const CLASS_QUES_FIL_ITEM = 'questions-filter__item';

const INITIAL_STATE: Map = fromJS({
  proposalDetails: Map({}),
  proposalQuestions: Map({}),
  isProposalLoading: false,
  changeBidStatus: false,
  proposalError: undefined,
  proposalAnswer: '',
  isProposalAnswerLoading: false,
  isProposalNAQuestionLoading: false,
  proposalAnswerError: undefined,
  proposalQuestionSection: Map({}),
  isQuestionSectionLoading: false,
  questionSectionError: undefined,
  proposalAnswerTypes: Map({}),
  isAnswerTypesLoading: false,
  AnswerTypesError: undefined,
  proposalRoles: undefined,
  isRolesLoading: false,
  rolesError: undefined,
  setQuestionData: Map({}),
  isSetQuestionLoading: false,
  setQuestionError: undefined,
  isGettingBoxId: false,
  onGettingBoxIdError: undefined,
  changebidloader: false,
  boxId: '',
  fetchingValidatedProposalData: false,
  validatedProposalData: [],
  validatedProposalDataError: undefined,
  questionsFilter: fromJS({
    answerGroup: {
      answered: {
        checked: false,
        label: 'Answered',
        className: CLASS_QUES_FIL_R1_C1
      },
      unanswered: {
        checked: false,
        label: 'Unanswered',
        className: CLASS_QUES_FIL_R1_C1
      },
      logic: 'OR'
    },
    verificationGroup: {
      verificationRequired: {
        checked: false,
        label: 'Verification Required',
        className: CLASS_QUES_FIL_R1_C1
      },
      showInactiveQuestions: {
        checked: false,
        label: 'Include Not Applicable Questions',
        className: 'questions-filter__row3-col1'
      },
      logic: 'OR'
    },
    rolegroup: {
      myUserRole: {
        checked: false,
        label: 'Responsible',
        className: CLASS_QUES_FIL_R1_C1
      },
      interestedParty: {
        checked: false,
        label: 'Informed',
        className: 'questions-filter__row2-col1'
      },
      logic: 'AND'
    },
    milestoneGroup: {}
  }),
  filteredProposalQuestions: Map({}),
  areAllSectionsExpanded: false,
  editQuestionsData: Map({}),
  opportunityData: Map({}),
  selectedBid: Map({}),
  boxBids: [],
  lookUpOptions: {},
  boxAdditionalLink: {},
  boxOpportunityFolderId: '',
  switchTempCallStatus: false,
  switchTempInProgress: false,
  eventflag: {},
  showNaCheckbox: false,
  priceModeler: fromJS({
    cost: '',
    therapeutic: '',
    sites: '',
    phase: '',
    patients: '',
    regions: ''
  }),

  bidCostDetails: fromJS({
    totalBidValue: '',
    bottomLineLaborDiscount: '',
    budgetTools: ''
  }),

  approvalQuestionLoading: fromJS({
    questionId: '',
    value: false
  }),
  unityTabQuestionLoading: fromJS({
    questionId: '',
    value: false
  }),
  canUserTagInQuestion: false,
  priceModelerRecalculating: false,
  activeTabIndex: 0, // Strategy Development, Approvals, Documents,
  activeVTabIndex: 0, // Questions for Customer, Notepad, Proposal Team
  vTabUserPreference: {},
  panelStatus: false,
  showWidget: {
    currentWidget: 'PriceModeler',
    proposalId: ''
  },
  favourite: false,
  customName: '',
  nextMilestone: '',
  showEditCustomNameModal: false,
  oppNoEditing: '',
  customNameEditing: ''
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const {
    proposalQuestions,
    proposal: { proposalDetails },
    proposal,
    isFavourite,
    customName
  } = action.payload;
  let NewopportunityData = new OrderedMap({});
  let opportunityData = state.get('opportunityData');
  let questionsFilter = state.get('questionsFilter');
  let selectedBid = state.get('selectedBid');
  const items = opportunityData.filter(v => v.get('isCurrent') === false);
  let obj = {
    proposal: proposal,
    proposalQuestions: proposalQuestions,
    proposalUsers: [],
    isCurrent: true,
    isEditable: true
  };
  NewopportunityData = NewopportunityData.set(
    proposal.proposalId,
    OrderedMap(obj)
  );
  NewopportunityData = NewopportunityData.merge(items);
  questionsFilter = questionsFilter.map(group => {
    return group.map(filter => {
      if (typeof filter === 'string') return filter;

      return filter.set('checked', false);
    });
  });
  state.set('favourite', isFavourite);
  state.set('customName', customName);
  // Add agreementId as well in proposal details
  // proposalDetails.agreementId = action.payload.proposal.agreementId || '';

  // Adding milestones to Questions Filter
  // const milestones = getUniqueMilestones(proposalQuestions);
  // if(Array.isArray(milestones) && milestones.length){
  //   let milestoneGroup = fromJS({});
  //   milestones.forEach(milestone => {
  //     milestoneGroup = milestoneGroup.set(
  //       milestone,
  //       Map({
  //         checked: false,
  //         label: milestone,
  //         className: CLASS_QUES_FIL_ITEM
  //       })
  //     );
  //   });
  //   milestoneGroup = milestoneGroup.set('logic', 'OR');
  //   questionsFilter = questionsFilter.set('milestoneGroup', milestoneGroup);
  // }

  if (selectedBid.get('id') == proposal.proposalId) {
    return state
      .set('proposalDetails', proposalDetails)
      .set('proposalQuestions', proposalQuestions)
      .set('filteredProposalQuestions', [])
      .set('questionsFilter', questionsFilter)
      .set('opportunityData', NewopportunityData)
      .set('isProposalLoading', false);
  } else {
    return state
      .set('opportunityData', NewopportunityData)
      .set('filteredProposalQuestions', [])
      .set('questionsFilter', questionsFilter)
      .set('isProposalLoading', false);
  }
};

const updateProposalDetail = (state, action) => {
  try {
    const { proposalDetails, proposalId } = action.payload;
    if (proposalId) {
      let opportunityData = state.get('opportunityData');
      let selectedBid = state.getIn(['selectedBid', 'id']);

      // Updating the state for opportunityData with latest proposalDetails
      opportunityData = opportunityData.setIn(
        [proposalId, 'proposal', 'proposalDetails'],
        proposalDetails
      );
      state = state.set('opportunityData', new OrderedMap(opportunityData));
      // Update the current proposalDetails if the selected Bid is equal to processed Bid
      if (selectedBid === proposalId)
        state = state.set('proposalDetails', proposalDetails);
    }
  } catch (error) {
    console.log('Cannot update proposal details', error.message);
  }
  return state;
};

const resetProposalId = state => {
  let selectBid = state.toJS().selectedBid;
  selectBid.id = '';
  return state.set('selectedBid', fromJS(selectBid));
};

const setOpportunityInfo = (state, action) => {
  const { payload } = action;
  let opportunityData = new OrderedMap({});
  let selectedBid = Map({});
  const searchParams = new URLSearchParams(window.location.search);
  const currentbidNo = searchParams.get('bidNo');
  const currentbidType = searchParams.get('bidType');
  const latestProposal = payload.find(proposal => proposal.isCurrent === true);
  const recentProposalsByType = Object.entries(
    groupBy(
      orderBy(
        payload.map(proposalInfo => ({
          ...cloneDeep(proposalInfo),
          proposal: {
            ...cloneDeep(proposalInfo.proposal),
            bidType: proposalInfo.proposal.bidType || 'Clinical_Bid'
          }
        })),
        ['proposal.proposalDate'],
        ['desc']
      ),
      'proposal.bidType'
    )
  ).map(([bidType, proposals]) => proposals[0].proposal.proposalId);
  payload.forEach(proposal => {
    if (
      proposal?.proposal?.proposalDetails?.bidNo == currentbidNo &&
      proposal?.proposal?.bidType === currentbidType
    ) {
      selectedBid = selectedBid
        .set('id', proposal.proposal.proposalId)
        // .set('bidDate', proposal.proposal.proposalDate)
        .set(
          'bidName',
          `Bid ${proposal.proposal.proposalDetails['bidNo'] || ''}`
        )
        .set('bidType', `Bid ${proposal?.proposal?.bidType || ''}`)
        .set(
          'earlyEngagementDevelopmentPlan',
          `${proposal?.proposal?.proposalDetails
            ?.earlyEngagementDevelopmentPlan || ''}`
        )
        .set(
          'describeActivity',
          `${proposal?.proposal?.proposalDetails?.describeActivity || ''}`
        )
        .set(
          'typeOfActivity',
          `${proposal?.proposal?.proposalDetails?.typeOfActivity || ''}`
        )
        .set(
          'requestDetail',
          `${proposal?.proposal?.proposalDetails?.requestDetail || ''}`
        )
        .set(
          'questionTemplateVersionNumber',
          proposal.proposal['questionTemplateVersionNumber'] || ''
        )
        .set('bidStopStatus', proposal.proposal['bidStopStatus'] || false)
        .set(
          'isApprovalCountPresent',
          proposal.proposal['isApprovalCountPresent'] || false
        )
        .set('opportunityType', proposal.proposal['opportunityType'] || '')
        .set('opportunityName', proposal.proposal['opportunityName'] || '')
        .set(
          'opportunityStatus',
          proposal.proposal.opportunityOverview['OpportunityStatus'] || ''
        )
        .set(
          'isCurrent',
          proposal?.proposal?.proposalDetails?.bidNo ===
            latestProposal?.proposal?.proposalDetails?.bidNo &&
            proposal?.proposal?.bidType === latestProposal?.proposal?.bidType
        )
        .set(
          'isEditable',
          recentProposalsByType.includes(proposal?.proposal?.proposalId)
        )
        .set('bidStatus', proposal.proposal['inProgress'] || false)
        .set('agreementId', proposal.proposal['agreementId'] || '')
        .set('accountId', proposal.proposal['accountId'] || '')
        .set(
          'opportunityId',
          proposal.proposal.proposalDetails['opportunityId'] || ''
        )
        .set(
          'pertinentDetails',
          proposal.proposal.proposalDetails.pertinentDetails
        )
        .set('proposalDate', proposal.proposal.proposalDate)
        .set('typeOfWidget', proposal.proposal.typeOfWidget)
        .set('nextMilestone', proposal.proposal.nextMilestone || '');
    }
    opportunityData = opportunityData.set(
      proposal.proposal.proposalId,
      OrderedMap(proposal)
    );
  });

  const proposalDetails = opportunityData.getIn([
    selectedBid.get('id'),
    'proposal',
    'proposalDetails'
  ]);
  let proposalQuestions = opportunityData.getIn([
    selectedBid.get('id'),
    'proposalQuestions'
  ]);
  if (proposalQuestions) {
    const milestones = getUniqueMilestones(proposalQuestions);
    let questionsFilter = state.get('questionsFilter');
    let milestoneGroup = fromJS({});
    milestones.forEach(milestone => {
      milestoneGroup = milestoneGroup.set(
        milestone.Name,
        Map({
          checked: false,
          label: milestone.Name,
          className: CLASS_QUES_FIL_ITEM,
          color: milestone.Color
        })
      );
    });
    milestoneGroup = milestoneGroup.set('logic', 'OR');
    questionsFilter = questionsFilter.set('milestoneGroup', milestoneGroup);
    return state
      .set('proposalDetails', proposalDetails)
      .set('proposalQuestions', proposalQuestions)
      .set('questionsFilter', questionsFilter)
      .set('isProposalLoading', false)
      .set('opportunityData', opportunityData)
      .set('selectedBid', selectedBid);
  }
  return state
    .set('proposalDetails', proposalDetails)
    .set('isProposalLoading', false)
    .set('opportunityData', opportunityData)
    .set('selectedBid', selectedBid);
};

const onChangeBid = (state: Map, action: Object): Map => {
  const { payload } = action;
  const bidProposal = payload?.proposalDetails?.proposal;
  const {
    agreementId,
    accountId,
    proposalDetails,
    opportunityType,
    opportunityName,
    opportunityOverview,
    questionTemplateVersionNumber: templateversion,
    bidStopStatus,
    isApprovalCountPresent,
    proposalDate,
    bidType
  } = bidProposal;

  let selectedBid = Map({
    id: payload.bid.bidId,
    isCurrent: payload.bid.isCurrent,
    isEditable: payload.bid.isEditable,
    pertinentDetails: payload.bid.pertinentDetails,
    bidType: bidType || '',
    earlyEngagementDevelopmentPlan:
      proposalDetails?.earlyEngagementDevelopmentPlan || '',
    bidName: payload.bid.bidName,
    questionTemplateVersionNumber: templateversion || '',
    bidStopStatus: bidStopStatus,
    isApprovalCountPresent: isApprovalCountPresent || false,
    opportunityType: opportunityType || '',
    opportunityName: opportunityName || '',
    opportunityStatus: opportunityOverview.OpportunityStatus || '',
    agreementId: agreementId || '',
    accountId: accountId || '',
    opportunityId: proposalDetails['opportunityId'],
    proposalDate,
    typeOfWidget: payload.bid.typeOfWidget,
    nextMilestone: payload.bid.nextMilestone || '',
    typeOfActivity: proposalDetails['typeOfActivity'],
    describeActivity: proposalDetails['describeActivity']
  });

  const proposalQuestions = payload.proposalDetails.proposalQuestions;
  if (proposalQuestions) {
    const milestones = getUniqueMilestones(proposalQuestions);

    let questionsFilter = state.get('questionsFilter');
    let milestoneGroup = fromJS({});
    milestones.forEach(milestone => {
      milestoneGroup = milestoneGroup.set(
        milestone.Name,
        Map({
          checked: false,
          label: milestone.Name,
          className: CLASS_QUES_FIL_ITEM,
          color: milestone.Color
        })
      );
    });
    milestoneGroup = milestoneGroup.set('logic', 'OR');
    questionsFilter = questionsFilter.set('milestoneGroup', milestoneGroup);

    return state
      .set('proposalDetails', proposalDetails)
      .set('proposalQuestions', proposalQuestions)
      .set('questionsFilter', questionsFilter)
      .set('isProposalLoading', false)
      .set('selectedBid', selectedBid)
      .setIn(['opportunityData', payload.bid.bidId, 'proposal', bidProposal])
      .set('changebidloader', false);
  }
  return state
    .set('proposalDetails', proposalDetails)
    .set('isProposalLoading', false)
    .set('selectedBid', selectedBid)
    .setIn(['opportunityData', payload.bid.bidId, 'proposal', bidProposal])
    .set('changebidloader', false);
};

const newBidCreated = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('newbidflag', payload['flag'] || false);
};

const addNewBid = (state: Map, action: Object): Map => {
  const { payload } = action;
  console.log(`addNewBid payload`, payload);
  let newopportunityData = new OrderedMap({});
  let data = payload;
  let selectedBid = Map({});
  let newstate = state.update('opportunityData', item =>
    item.map(keyValue => keyValue.set('isCurrent', false))
  );

  let opportunityData = newstate.get('opportunityData');
  let boxBids = newstate.get('boxBids');

  let obj = {
    proposal: data.proposal,
    proposalQuestions: data.proposalQuestions,
    proposalUsers: data.proposalUsers,
    isCurrent: data.isCurrent,
    isEditable: true, // new bid is editable
    inProgress: data.proposal['inProgress']
  };

  let boxobj = {
    proposalId: data.proposal.proposalId,
    boxId: undefined,
    bidNo: data.proposal.proposalDetails['bidNo']
  };
  if (Array.isArray(boxBids)) {
    let isavailable = boxBids.filter(
      v => v['proposalId'] === boxobj.proposalId
    );
    if (!isavailable.length) {
      boxBids.unshift(boxobj);
    }
  }

  newopportunityData = newopportunityData.set(
    data.proposal.proposalId,
    OrderedMap(obj)
  );

  opportunityData = opportunityData.merge(newopportunityData);
  selectedBid = selectedBid
    .set('id', data?.proposal?.proposalId)
    .set('bidName', `Bid ${data?.proposal?.proposalDetails['bidNo'] || ''}`)
    .set(
      'questionTemplateVersionNumber',
      data.proposal['questionTemplateVersionNumber'] || ''
    )
    .set('bidStopStatus', data?.proposal['bidStopStatus'] || false)
    .set(
      'isApprovalCountPresent',
      data.proposal['isApprovalCountPresent'] || false
    )
    .set('opportunityType', data.proposal['opportunityType'] || '')
    .set('opportunityName', data.proposal['opportunityName'] || '')
    .set(
      'opportunityStatus',
      data.proposal.opportunityOverview['OpportunityStatus'] || ''
    )
    .set('isCurrent', true)
    .set('isEditable', true) // new bid is editable
    .set('bidStatus', data.proposal['inProgress'] || false)
    .set('pertinentDetails', data.proposal.proposalDetails.pertinentDetails)
    .set('nextMilestone', data.proposal['nextMilestone'] || '');

  const proposalDetails = newopportunityData.getIn([
    selectedBid.get('id'),
    'proposal',
    'proposalDetails'
  ]);
  const proposalQuestions = newopportunityData.getIn([
    selectedBid.get('id'),
    'proposalQuestions'
  ]);

  const milestones = getUniqueMilestones(proposalQuestions);
  let questionsFilter = state.get('questionsFilter');
  let milestoneGroup = fromJS({});
  milestones.forEach(milestone => {
    milestoneGroup = milestoneGroup.set(
      milestone.Name,
      Map({
        checked: false,
        label: milestone.Name,
        className: CLASS_QUES_FIL_ITEM,
        color: milestone.Color
      })
    );
  });

  milestoneGroup = milestoneGroup.set('logic', 'OR');
  questionsFilter = questionsFilter.set('milestoneGroup', milestoneGroup);

  return state
    .set('proposalDetails', proposalDetails)
    .set('proposalQuestions', proposalQuestions)
    .set('questionsFilter', questionsFilter)
    .set('isProposalLoading', false)
    .set('opportunityData', opportunityData)
    .set('boxBids', boxBids)
    .set('selectedBid', selectedBid);
};

const onProposalLoading = (state: Map): Map => {
  return state.set('isProposalLoading', true).set('proposalError', undefined);
};

const onProposalError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('proposalError', payload).set('isProposalLoading', false);
};

const onUpdateModifiedQuestion = (state: Map, action: Object): Map => {
  const { question } = action.payload;

  let newState = fromJS({});

  const indexOfQuestionToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => listItem.questionId === question.questionId);

  newState = state.setIn(
    ['proposalQuestions', indexOfQuestionToUpdate],
    question
  );

  const proposalQuestions = newState.get('proposalQuestions');

  return state.set('proposalQuestions', proposalQuestions);
};

// state is propoal
const onProposalAnswer = (state: Map, action: Object): Map => {
  const {
    payload: { data, questionId: referenceId, hasDifferentSFanswer }
  } = action;

  const selectedBidId = state.getIn(['selectedBid', 'id']);
  const isCurrent = state.getIn(['selectedBid', 'isCurrent']);
  const isEditable = state.getIn(['selectedBid', 'isEditable']);
  if (!(isCurrent || isEditable)) {
    return state;
  }

  // update current selected bid and return
  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state
    .setIn(['proposalQuestions', indexOfListToUpdate, 'answers'], data)
    .setIn(
      [
        'opportunityData',
        selectedBidId,
        'proposalQuestions',
        indexOfListToUpdate,
        'answers'
      ],
      data
    );
  newState = newState
    .setIn(
      ['proposalQuestions', indexOfListToUpdate, 'hasDifferentSFanswer'],
      hasDifferentSFanswer
    )
    .setIn(
      [
        'opportunityData',
        selectedBidId,
        'proposalQuestions',
        indexOfListToUpdate,
        'hasDifferentSFanswer'
      ],
      hasDifferentSFanswer
    );

  const proposalQuestions = newState.get('proposalQuestions');
  const opportunityData = newState.get('opportunityData');

  return state
    .set('proposalQuestions', proposalQuestions)
    .set('proposalAnswer', INITIAL_STATE.proposalAnswer)
    .set('isProposalAnswerLoading', false)
    .set('opportunityData', opportunityData);
};

// state is propoal
const updateQuestionLockByUser = (state: Map, action: Object): Map => {
  const {
    data: { questionId, proposalId, userEmail, userId, userName }
  } = action.payload;
  let newState = fromJS({});

  if (proposalId) {
    const selectedBid = state.getIn(['selectedBid', 'id']);
    const currentUserEmail = localStorage.getItem('userEmail') || '';
    // Update the current lock details if the selected Bid is equal to processed Bid
    // Prevent State update if the user locking the bid is same as the current user
    if (selectedBid === proposalId && userEmail != currentUserEmail) {
      const indexOfListToUpdateCurrent = state
        .get('proposalQuestions')
        .findIndex(listItem => {
          return listItem.questionId === questionId;
        });
      newState = state.updateIn(
        ['proposalQuestions', indexOfListToUpdateCurrent],
        value => ({
          ...value,
          questionLockInfo: { userInfo: userEmail, userEmail, userId, userName }
        })
      );

      const proposalQuestionsNew = newState.get('proposalQuestions');
      const prevProposalQuestions = state.get('proposalQuestions');
      if (!isEqual(prevProposalQuestions, proposalQuestionsNew)) {
        return state.set('proposalQuestions', proposalQuestionsNew);
      }
    }

    return state;
  }
};

const questionLockDetails = (state: Map, action: Object): Map => {
  const { data } = action.payload;
  let newState = fromJS(state);

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const newAction = {
        payload: {
          data: data[i]
        }
      };
      newState = updateQuestionLockByUser(newState, newAction);
    }
    return newState;
  }
  return state;
};
// state is propoal
const updateQuestionUnlockByUser = (state: Map, action: Object): Map => {
  const {
    data: { questionId, proposalId },
    clientQuestionId
  } = action.payload;
  let newState = fromJS({});

  if (proposalId) {
    // let opportunityData = state.get('opportunityData');
    const selectedBid = state.getIn(['selectedBid', 'id']);

    // Update the current proposalDetails if the selected Bid is equal to processed Bid
    if (selectedBid === proposalId) {
      const indexOfListToUpdateCurrent = state
        .get('proposalQuestions')
        .findIndex(listItem => {
          return listItem.questionId === clientQuestionId;
        });

      newState = state.updateIn(
        ['proposalQuestions', indexOfListToUpdateCurrent],
        value => ({
          ..._.omit(value, 'questionLockInfo')
        })
      );

      const proposalQuestionsNew = newState.get('proposalQuestions');
      const prevProposalQuestions = state.get('proposalQuestions');
      if (!isEqual(prevProposalQuestions, proposalQuestionsNew)) {
        return state.set('proposalQuestions', proposalQuestionsNew);
      }
    }

    return state;
  }
};

const onProposalAnswerLoading = (state: Map, action: Object): Map => {
  const {
    payload: { questionId: referenceId, loading = false }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'loading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  const filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(listItem => {
      return listItem.questionId === referenceId;
    });
    newState = state.setIn(
      ['filteredProposalQuestions', filterindexOfListToUpdate, 'loading'],
      loading
    );
    const filterQuestions = newState.get('filteredProposalQuestions');
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('filteredProposalQuestions', filterQuestions)
      .set('isProposalAnswerLoading', loading);
  }
  return state
    .set('proposalQuestions', proposalQuestions)
    .set('isProposalAnswerLoading', loading);
};

const onErrorUpdateNotApplicable = (state: Map, action: Object): Map => {
  const {
    payload: { questionId: referenceId, loading = false }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'NaLoading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  let filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(listItem => {
      return listItem.questionId === referenceId;
    });
    newState = state.setIn(
      ['filteredProposalQuestions', filterindexOfListToUpdate, 'NaLoading'],
      loading
    );
    let filterQuestions = newState.get('filteredProposalQuestions');
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('filteredProposalQuestions', filterQuestions)
      .set('isProposalNAQuestionLoading', loading);
  } else {
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('isProposalNAQuestionLoading', loading);
  }
};

const onUpdateProposalNAQuestionDone = (state: Map, action: Object): Map => {
  const {
    payload: { data, questionId: referenceId, loading = false }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state
    .setIn(
      ['proposalQuestions', indexOfListToUpdate, 'notApplicable'],
      data?.notApplicable
    )
    .setIn(['proposalQuestions', indexOfListToUpdate, 'NaLoading'], loading);

  const proposalQuestions = newState.get('proposalQuestions');

  return state
    .set('proposalQuestions', proposalQuestions)
    .set('isProposalAnswerLoading', false)
    .set('isProposalNAQuestionLoading', false);
};

const onUpdateProposalNAQuestionFromSocketDone = (
  state: Map,
  action: Object
): Map => {
  const {
    payload: { questionStatus, questionId: referenceId, loading = false }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state
    .setIn(
      ['proposalQuestions', indexOfListToUpdate, 'notApplicable'],
      questionStatus
    )
    .setIn(['proposalQuestions', indexOfListToUpdate, 'NaLoading'], loading);

  const proposalQuestions = newState.get('proposalQuestions');

  return state
    .set('proposalQuestions', proposalQuestions)
    .set('isProposalAnswerLoading', false)
    .set('isProposalNAQuestionLoading', false);
};

const onProposalNAQuestionLoading = (state: Map, action: Object): Map => {
  const {
    payload: { questionId: referenceId, loading = false }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'NaLoading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  let filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(listItem => {
      return listItem.questionId === referenceId;
    });
    newState = state.setIn(
      ['filteredProposalQuestions', filterindexOfListToUpdate, 'NaLoading'],
      loading
    );
    let filterQuestions = newState.get('filteredProposalQuestions');
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('filteredProposalQuestions', filterQuestions)
      .set('isProposalNAQuestionLoading', loading);
  } else {
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('isProposalNAQuestionLoading', loading);
  }
};

const onProposalAnswerError = (state: Map, action: Object): Map => {
  const {
    payload: { err, questionId }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === questionId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'loading'],
    false
  );

  const proposalQuestions = newState.get('proposalQuestions');

  return state
    .set('proposalAnswerError', err)
    .set('proposalQuestions', proposalQuestions)
    .set('isProposalAnswerLoading', false);
};

const onQuestionSectionInfoLoaded = (state: Map, action: Object): Map => {
  const sections = action.payload;
  return state
    .set('proposalQuestionSection', sections)
    .set('isQuestionSectionLoading', false);
};

const onQuestionSectionLoading = (state: Map): Map => {
  return state
    .set('isQuestionSectionLoading', true)
    .set('questionSectionError', undefined);
};

const onQuestionSectionError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('questionSectionError', payload)
    .set('isQuestionSectionLoading', false);
};

const onAnswerTypesLoaded = (state: Map, action: Object): Map => {
  const answertypes = action.payload;
  console.log('answer types are', answertypes);
  return state
    .set('proposalAnswerTypes', answertypes)
    .set('isAnswerTypesLoading', false);
};

const onAnswerTypesLoading = (state: Map): Map => {
  return state
    .set('isAnswerTypesLoading', true)
    .set('AnswerTypesError', undefined);
};

const onAnswerTypesError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('AnswerTypesError', payload)
    .set('isAnswerTypesLoading', false);
};

const onRolesLoaded = (state: Map, action: Object): Map => {
  const roles = action.payload;
  return state.set('proposalRoles', roles).set('isRolesLoading', false);
};

const onRolesLoading = (state: Map): Map => {
  return state.set('isRolesLoading', true).set('rolesError', undefined);
};

const onRolesError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('rolesError', payload).set('isRolesLoading', false);
};

const onSetCustomTabQuestion = (state: Map, action: Object): Map => {
  const data = action.payload;
  const updatedProposalQuestions = state.get('proposalQuestions');
  const isQuestionExist = updatedProposalQuestions.find(
    item => item?.questionId === data?.questionId
  );
  if (isQuestionExist) {
    return;
  }

  updatedProposalQuestions.push(data);

  let questionsFilter = state.get('questionsFilter');
  const filterQuestionsVal = getQuestionsFilterApplied(
    updatedProposalQuestions,
    questionsFilter,
    state.get('eventflag')
  );
  let selectedBidId = state.getIn(['selectedBid', 'id']);

  return state
    .set('proposalQuestions', cloneDeep(updatedProposalQuestions))
    .set('filteredProposalQuestions', cloneDeep(filterQuestionsVal))
    .setIn(
      ['opportunityData', selectedBidId, 'proposalQuestions'],
      cloneDeep(updatedProposalQuestions)
    );
};

const onSetQuestion = (state: Map, action: Object): Map => {
  const data = action.payload;
  const updatedProposalQuestions = state.get('proposalQuestions');
  const isQuestionExist = updatedProposalQuestions.find(
    item => item?.questionId === data?.questionId
  );
  if (isQuestionExist) {
    return;
  }

  updatedProposalQuestions.push(data);

  let questionsFilter = state.get('questionsFilter');
  const filterQuestionsVal = getQuestionsFilterApplied(
    updatedProposalQuestions,
    questionsFilter,
    state.get('eventflag')
  );
  let selectedBidId = state.getIn(['selectedBid', 'id']);

  return state
    .set('proposalQuestions', cloneDeep(updatedProposalQuestions))
    .set('filteredProposalQuestions', cloneDeep(filterQuestionsVal))
    .setIn(
      ['opportunityData', selectedBidId, 'proposalQuestions'],
      cloneDeep(updatedProposalQuestions)
    )
    .set('setQuestionData', data)
    .set('isSetQuestionLoading', false);
};

const onSetQuestionLoading = (state: Map): Map => {
  return state
    .set('isSetQuestionLoading', true)
    .set('setQuestionError', undefined);
};

const onSetQuestionError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('setQuestionError', payload)
    .set('isSetQuestionLoading', false);
};

const onGettingProposalBoxId = (state: Map): Map => {
  return state
    .set('isGettingBoxId', true)
    .set('boxId', '')
    .set('onGettingBoxIdError', undefined);
};

const onGetProposalBoxId = (state: Map, action: Object): Map => {
  const { boxId } = action.payload;
  return state
    .set('isGettingBoxId', false)
    .set('boxId', boxId)
    .set('onGettingBoxIdError', undefined);
};
const fetchBoxAdditionalLink = (state: Map, action: Object): Map => {
  const { boxlink } = action.payload;
  return state.set('boxAdditionalLink', boxlink);
};

const onGettingBoxIdError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state
    .set('isGettingBoxId', false)
    .set('boxId', '')
    .set('onGettingBoxIdError', error);
};
const onGettingfetchBoxAdditionalLinkError = (
  state: Map,
  action: Object
): Map => {
  const { error } = action.payload;
  return state.set('boxAdditionalLink', error);
};

const onBoxOpportunityFolderId = (state, action) => {
  const { folderId } = action.payload;
  return state.set('boxOpportunityFolderId', folderId);
};

const onFetchingValidatedProposaData = (state: Map): Map => {
  return state
    .set('fetchingValidatedProposalData', true)
    .set('validatedProposalDataError', undefined);
};

const onGetValidatedProposaData = (state: Map, action: Object): Map => {
  const { data } = action.payload;

  return state
    .set('fetchingValidatedProposalData', false)
    .set('validatedProposalData', fromJS(data));
};

const onValidatedProposaDataError = (state: Map, action: Object): Map => {
  const { error } = action.payload;

  return state
    .set('fetchingValidatedProposalData', false)
    .set('validatedProposalDataError', error);
};

const onApplyQuestionsFilter = (state, action) => {
  const { questionsFilter } = action.payload;
  return state.set('questionsFilter', questionsFilter);
};

const onQuestionsFiltered = (state, action) => {
  const { filteredQuestions } = action.payload;
  return state.set('filteredProposalQuestions', filteredQuestions);
};

const resetQuestionsFilter = (state, action) => {
  const { payload } = action;
  return state.set('questionsFilter', payload);
};

const clearQuestionsFilter = (state, action) => {
  const { questionsFilter } = action.payload;
  return state.set('questionsFilter', questionsFilter);
};

const onExpandAllSections = (state, action) => {
  return state.set('areAllSectionsExpanded', action.payload);
};

const onSetEditQuestionData = (state, action) => {
  return state.set('editQuestionsData', fromJS(action.payload));
};

const onEditQuestion = (state, action) => {
  const { payload: data } = action;
  const questions = state.get('proposalQuestions');
  let selectedBidId = state.getIn(['selectedBid', 'id']);
  let questionsFilter = state.get('questionsFilter');

  const questionIndex = questions.findIndex(
    item => item.questionId === data.questionId
  );

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    data,
    ...questions.slice(questionIndex + 1, questions.length)
  ];
  const filterQuestionsVal = getQuestionsFilterApplied(
    updatedQuestions,
    questionsFilter,
    state.get('eventflag')
  );

  return state
    .set('proposalQuestions', cloneDeep(updatedQuestions))
    .set('filteredProposalQuestions', cloneDeep(filterQuestionsVal))
    .setIn(
      ['opportunityData', selectedBidId, 'proposalQuestions'],
      cloneDeep(updatedQuestions)
    )
    .set('setQuestionData', data)
    .set('isSetQuestionLoading', false);
};

const onDeleteQuestion = (state, action) => {
  const { payload: questionId } = action;
  const questions = state.get('proposalQuestions');
  const filterquestions = state.get('filteredProposalQuestions');

  const questionIndex = questions.findIndex(
    item => item.questionId === questionId
  );

  if (questionIndex === -1) return;

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    ...questions.slice(questionIndex + 1, questions.length)
  ];

  let selectedBidId = state.getIn(['selectedBid', 'id']);

  if (filterquestions && Array.isArray(filterquestions)) {
    const filterquestionIndex = filterquestions.findIndex(
      item => item.questionId === questionId
    );
    const updatedFilterQuestions = [
      ...filterquestions.slice(0, filterquestionIndex),
      ...filterquestions.slice(filterquestionIndex + 1, filterquestions.length)
    ];

    return state
      .set('proposalQuestions', cloneDeep(updatedQuestions))
      .set('filteredProposalQuestions', cloneDeep(updatedFilterQuestions))
      .setIn(
        ['opportunityData', selectedBidId, 'proposalQuestions'],
        cloneDeep(updatedQuestions)
      )
      .set('setQuestionData', questionId)
      .set('isSetQuestionLoading', false);
  } else {
    return state
      .set('proposalQuestions', cloneDeep(updatedQuestions))
      .setIn(
        ['opportunityData', selectedBidId, 'proposalQuestions'],
        cloneDeep(updatedQuestions)
      )
      .set('setQuestionData', questionId)
      .set('isSetQuestionLoading', false);
  }
};

const setPriceModulerFields = (state, action) => {
  const {
    Cost,
    TherapyArea__c,
    Number_of_Sites__c,
    Phase_P__c,
    Patients_Enrolled__c,
    Potential_Regions__c
  } = action.payload.latestDetails;

  return state.set(
    'priceModeler',
    fromJS({
      cost: Cost,
      therapeutic: TherapyArea__c,
      sites: Number_of_Sites__c,
      phase: Phase_P__c,
      patients: Patients_Enrolled__c,
      regions: Potential_Regions__c
    })
  );
};

const setBidCostDataFields = (state, action) => {
  const { bidValue, bottomLine, budgetTools, amount } = action.payload;

  return state.set(
    'bidCostDetails',
    fromJS({
      totalBidValue: bidValue,
      amount,
      bottomLineLaborDiscount: bottomLine,
      budgetTools
    })
  );
};
const setUnityTabQuestionLoading = (state, action) => {
  const { questionId, value } = action.payload;
  return state.set('unityTabQuestionLoading', fromJS({ questionId, value }));
};

const setApprovalQuestionLoading = (state, action) => {
  const { questionId, value } = action.payload;
  return state.set('approvalQuestionLoading', fromJS({ questionId, value }));
};
const updatePriceModelerEstimate = (state, action) => {
  const {
    Cost,
    TherapyArea__c,
    Number_of_Sites__c,
    Phase_P__c,
    Patients_Enrolled__c,
    Potential_Regions__c
  } = action.payload;

  return state.set(
    'priceModeler',
    fromJS({
      cost: Cost,
      therapeutic: TherapyArea__c,
      sites: Number_of_Sites__c,
      phase: Phase_P__c,
      patients: Patients_Enrolled__c,
      regions: Potential_Regions__c
    })
  );
};

const setActiveTabIndex = (state, action) => {
  return state.set('activeTabIndex', action.payload);
};

const setVTabActiveTabIndex = (state, action) => {
  return state.set('activeVTabIndex', action.payload);
};

const setVTabUserPreference = (state, action) => {
  let currentUserPreference = state.get('vTabUserPreference', {}).toJS();
  const { tabIndex, collapsed } = action.payload;
  currentUserPreference[tabIndex] = { collapsed };
  return state.set('vTabUserPreference', fromJS(currentUserPreference));
};

const setWidgetUpdate = (state, action) => {
  const { proposalId, typeOfWidget } = action.payload;

  const currentWidget =
    typeOfWidget === 'Bid_Cost' ? 'BidCostDetail' : 'PriceModeler';

  return state.set('showWidget', { currentWidget, proposalId });
};

const onFavouriteToggle = (state, action) => {
  return state.set('favourite', action.payload);
};

const onSetCustomName = (state, action) => {
  return state.set('customName', action.payload);
};

const onSetNextMilestone = (state, action) => {
  return state.set('nextMilestone', action.payload);
};

const toggleEditCustomNameModal = (state, action) => {
  return state.set('showEditCustomNameModal', action.payload);
};

const setEditOppInfo = (state, action) => {
  return state
    .set('oppNoEditing', action.payload.oppNo)
    .set('customNameEditing', action.payload.customName);
};

const clearEditOppInfo = state => {
  return state.set('oppNoEditing', '').set('customNameEditing', '');
};

const updateOportunityDetailData = (state, action) => {
  const { data } = action.payload;
  const mapper = OpportunitySFUpDATE;
  let opportunityData = state.get('opportunityData');
  let selectedbid = state.get('selectedBid');
  let isEditable = state.get('isEditable');
  const updatedSelectedbid = selectedbid?.toJS();
  let currentProposal = cloneDeep(
    opportunityData.getIn([data?.proposalId, 'proposal'])
  );
  const currentProposalId = opportunityData.getIn([
    data?.proposalId,
    'proposal',
    'proposalId'
  ]);
  const proposalDetail = cloneDeep(state.get('proposalDetails', {}));
  if (
    data &&
    currentProposal &&
    currentProposalId == data?.proposalId &&
    data.sfField
  ) {
    if (
      updatedSelectedbid.id === data?.proposalId &&
      updatedSelectedbid[mapper[data.questionSfField]] &&
      isEditable
    ) {
      updatedSelectedbid[mapper[data.questionSfField]] = data.answer;
      proposalDetail[mapper[data.sfField]] = data.answer;
    }
    currentProposal['proposalDetails'][mapper[data.sfField]] = data.answer;
    return state
      .set('selectedBid', Map(updatedSelectedbid))
      .set('proposalDetails', { ...proposalDetail })
      .setIn(['opportunityData', data.proposalId, 'proposal'], currentProposal);
  } else if (
    data &&
    currentProposal &&
    currentProposalId == data?.proposalId &&
    data?.questionSfField &&
    !(
      data.questionsfObject &&
      data.questionSfField === 'Name' &&
      data.questionsfObject === 'Opportunity'
    )
  ) {
    if (
      updatedSelectedbid.id === data?.proposalId &&
      updatedSelectedbid[mapper[data.questionSfField]] &&
      isEditable
    ) {
      updatedSelectedbid[mapper[data.questionSfField]] = data.answer;
      proposalDetail[mapper[data.questionSfField]] = data.answer;
    }
    currentProposal['proposalDetails'][mapper[data.questionSfField]] =
      data.answer;
    return state
      .set('selectedBid', Map(updatedSelectedbid))
      .set('proposalDetails', { ...proposalDetail })
      .setIn(['opportunityData', data.proposalId, 'proposal'], currentProposal);
  }

  return state;
};

const updateProposalDetailSF = (state, action) => {
  const { data } = action.payload;
  let opportunityData = state.get('opportunityData');
  let currentProposal = cloneDeep(
    opportunityData.getIn([data?.proposalId, 'proposal'])
  );
  const currentProposalId = opportunityData.getIn([
    data?.proposalId,
    'proposal',
    'proposalId'
  ]);
  let proposalDetail = cloneDeep(state.get('proposalDetails', {}));
  let selectedBid = state.get('selectedBid');
  const selectedBidId = state.getIn(['selectedBid', 'id']);
  const isEditable = state.getIn(['selectedBid', 'isEditable']);
  if (data && data.bidStatusKey && selectedBid && isEditable) {
    const updatedSelectedBid = selectedBid?.toJS();
    if (currentProposalId === data?.proposalId) {
      updatedSelectedBid.bidStopStatus = data.bidStopStatus;
    }

    return state.set('selectedBid', Map(updatedSelectedBid));
  } else if (
    data &&
    (data.earlyEngagementBid || data.postAwardBid || data.rfiBid)
  ) {
    if (currentProposalId === data?.proposalId) {
      proposalDetail = {
        ...proposalDetail,
        earlyEngagementDevelopmentPlan:
          data.proposalDetails.earlyEngagementDevelopmentPlan,
        describeActivity: data.proposalDetails.describeActivity,
        requestDetail: data.proposalDetails.requestDetail,
        typeOfActivity: data.proposalDetails.typeOfActivity
      };

      const updatedSelectedBid = selectedBid?.toJS();

      updatedSelectedBid.earlyEngagementDevelopmentPlan =
        data.proposalDetails.earlyEngagementDevelopmentPlan;
      updatedSelectedBid.describeActivity =
        data.proposalDetails.describeActivity;
      updatedSelectedBid.requestDetail = data.proposalDetails.requestDetail;
      updatedSelectedBid.typeOfActivity = data.proposalDetails.typeOfActivity;

      return state
        .set('selectedBid', Map(updatedSelectedBid))
        .set('proposalDetails', proposalDetail)
        .mergeDeepIn(
          ['opportunityData', data.proposalId, 'proposal', 'proposalDetails'],
          data.proposalDetails
        );
    }
  } else {
    if (selectedBidId === data?.proposalId && isEditable) {
      proposalDetail = {
        ...proposalDetail,
        describeActivity: data.proposalDetails.describeActivity,
        requestDetail: data.proposalDetails.requestDetail,
        typeOfActivity: data?.proposalDetails.typeOfActivity
      };
    }
  }

  if (
    data &&
    data.proposalDetails &&
    opportunityData &&
    opportunityData.get(data?.proposalId)
  ) {
    let currentDate = opportunityData.getIn([
      data?.proposalId,
      'proposal',
      'proposalDetails',
      'Bid due date'
    ]);
    if (currentDate) {
      currentDate = moment(currentDate).format('YYYY-MM-DD');
    }
    const newDate = moment(data.proposalDetails['Bid due date']).format(
      'YYYY-MM-DD'
    );
    if (currentDate !== newDate) {
      return state
        .set('proposalDetails', { ...proposalDetail })
        .setIn(
          [
            'opportunityData',
            data.proposalId,
            'proposal',
            'proposalDetails',
            'Bid due date'
          ],
          newDate
        );
    }
  }
  return state.set('proposalDetails', { ...proposalDetail });
};

const updateDashboardDetail = (state, action) => {
  try {
    const data = action.payload;
    let opportunityData = state.get('opportunityData');
    const selectedBidId = state.getIn(['selectedBid', 'id']);
    const isEditable = state.getIn(['selectedBid', 'isEditable']);
    let currentProposal = cloneDeep(
      opportunityData.getIn([data?.data?.proposalId, 'proposal'])
    );
    const currentProposalId = opportunityData.getIn([
      data?.data?.proposalId,
      'proposal',
      'proposalId'
    ]);
    let proposalDetail = cloneDeep(state.get('proposalDetails', {}));
    if (
      currentProposal &&
      currentProposalId === data?.data?.proposalId &&
      isEditable
    ) {
      currentProposal['proposalDetails'].Customer =
        data?.data?.proposalDetails.Customer;
      if (selectedBidId === data?.data?.proposalId && isEditable) {
        proposalDetail.Customer = data?.data?.proposalDetails.Customer;
      }
      if (data?.data?.proposalDetails['Bid due date'] && isEditable) {
        currentProposal['proposalDetails']['Bid due date'] =
          data.data.proposalDetails['Bid due date'];
        if (selectedBidId === data?.data?.proposalId && isEditable) {
          proposalDetail['Bid due date'] =
            data.data.proposalDetails['Bid due date'];
        }
      }
      if (selectedBidId === data?.data?.proposalId && isEditable) {
        state.set('proposalDetails', { ...proposalDetail });
      }
      return state.setIn(
        ['opportunityData', data.data.proposalId, 'proposal'],
        currentProposal
      );
    }

    return state;
  } catch (error) {
    console.log(`error`, error);
    return state;
  }
};

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded,
  [PROPOSAL_INFO_LOADING]: onProposalLoading,
  [PROPOSAL_INFO_ERROR]: onProposalError,
  [PROPOSAL_ANSWER]: onProposalAnswer,
  [PROPOSAL_ANSWER_LOADING]: onProposalAnswerLoading,
  [UPDATE_NOT_APPLICABLE_PROGRESS]: onProposalNAQuestionLoading,
  [UPDATE_NOT_APPLICABLE_DONE]: onUpdateProposalNAQuestionDone,
  [UPDATE_NOT_APPLICABLE_FROM_SOCKET_DONE]: onUpdateProposalNAQuestionFromSocketDone,
  [ERROR_UPDATE_NOT_APPLICABLE]: onErrorUpdateNotApplicable,
  [PROPOSAL_ANSWER_ERROR]: onProposalAnswerError,
  [QUESTION_SECTION_INFO]: onQuestionSectionInfoLoaded,
  [QUESTION_SECTION_LOADING]: onQuestionSectionLoading,
  [QUESTION_SECTION_ERROR]: onQuestionSectionError,
  [ANSWER_TYPES_INFO]: onAnswerTypesLoaded,
  [ANSWER_TYPES_LOADING]: onAnswerTypesLoading,
  [ANSWER_TYPES_ERROR]: onAnswerTypesError,
  [ROLES_INFO]: onRolesLoaded,
  [ROLES_LOADING]: onRolesLoading,
  [ROLES_ERROR]: onRolesError,
  [PROPOSAL_SET_QUESTION]: onSetQuestion,
  [PROPOSAL_CUSTOM_TAB_SET_QUESTION]: onSetCustomTabQuestion,
  [PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD]: (state, { payload }) => {
    return state
      .set('setQuestionData', payload)
      .set('isSetQuestionLoading', false);
  },
  [PROPOSAL_SET_QUESTION_LOADING]: onSetQuestionLoading,
  [PROPOSAL_SET_QUESTION_ERROR]: onSetQuestionError,
  [PROPOSAL_BOX_ID_LOADING]: onGettingProposalBoxId,
  [PROPOSAL_BOX_ID]: onGetProposalBoxId,
  [PROPOSAL_BOX_ID_ERROR]: onGettingBoxIdError,
  [UPDATE_MODIFIED_QUESTION]: onUpdateModifiedQuestion,
  [ON_FETCHING_VALIDATED_PROPOSAL_DATA]: onFetchingValidatedProposaData,
  [VALIDATED_PROPOSAL_DATA]: onGetValidatedProposaData,
  [VALIDATED_PROPOSAL_DATA_ERROR]: onValidatedProposaDataError,
  [ON_APPLY_QUESTIONS_FILTER]: onApplyQuestionsFilter,
  [ON_QUESTIONS_FILTERED]: onQuestionsFiltered,
  [RESET_QUESTIONS_FILTER]: resetQuestionsFilter,
  [CLEAR_QUESTIONS_FILTER]: clearQuestionsFilter,
  [EXPAND_ALL_SECTIONS]: onExpandAllSections,
  [SET_EDIT_QUESTION_DATA]: onSetEditQuestionData,
  [PROPOSAL_EDIT_QUESTION]: onEditQuestion,
  [PROPOSAL_DELETE_QUESTION]: onDeleteQuestion,
  [OPPORTUNITY_INFO]: setOpportunityInfo,
  [UPDATE_BOX_BIDS]: (state, { payload }) => state.set('boxBids', payload),
  [CHANGE_BID]: onChangeBid,
  [ADD_NEW_BID]: addNewBid,
  [NEW_BID_CREATED]: newBidCreated,
  [PROPOSAL_DETAIL_UPDATE]: updateProposalDetail,
  [UPDATE_LOOKUP_OPTIONS]: (state, { payload }) =>
    state.set('lookUpOptions', payload),
  [INTEGRATIONS_INFO]: (state, { payload }) =>
    state.set('proposalIntegrations', payload),
  [BOX_ADDITIONAL_LINK]: fetchBoxAdditionalLink,
  [BOX_ADDITIONAL_LINK_ERROR]: onGettingfetchBoxAdditionalLinkError,
  [BOX_OPPORTUNITY_FOLDER_ID]: onBoxOpportunityFolderId,
  [SWITCH_TEMP_STATUS]: (state, { payload }) =>
    state.set('switchTempCallStatus', payload),
  [SWITCH_TEMP_IN_PROGRESS]: (state, { payload }) =>
    state.set('switchTempInProgress', payload),
  [RESET_PROPOSALID]: resetProposalId,
  [QUESTION_LOCK_BY_USER]: updateQuestionLockByUser,
  [QUESTION_UNLOCK_BY_USER]: updateQuestionUnlockByUser,
  [QUESTION_LOCK_DETAILS_ALL]: questionLockDetails,
  [SET_FLAG]: (state, { payload }) => state.set('eventflag', payload),
  [SHOW_NA_CHECKBOX]: (state, { payload }) =>
    state.set('showNaCheckbox', payload),
  [SET_PRICE_MODELER_FIELDS]: setPriceModulerFields,
  [SET_BID_COST_DATA_FIELDS]: setBidCostDataFields,
  [SET_APPROVAL_QUESTION_LOADING]: setApprovalQuestionLoading,
  [SET_UNITY_TAB_QUESTION_LOADING]: setUnityTabQuestionLoading,
  [SET_CAN_USER_TAG_IN_QUESTION]: (state, { payload }) =>
    state.set('canUserTagInQuestion', payload),
  [SET_PRICE_MODELER_RECALCULATING]: (state, { payload }) =>
    state.set('priceModelerRecalculating', payload),
  [PRICE_MODELER_UPDATE]: updatePriceModelerEstimate,
  [SET_ACTIVE_TABINDEX]: setActiveTabIndex,
  [SET_PANEL_STATUS]: (state, { payload }) => state.set('panelStatus', payload),
  [SET_V_TAB_ACTIVE_INDEX]: setVTabActiveTabIndex,
  [SET_V_TAB_USER_PREFERENCE]: setVTabUserPreference,
  [CHANGE_BID_STATUS_OPERATION]: (state, { payload }) =>
    state.set('changeBidStatus', payload),
  [WIDGET_UPDATE]: setWidgetUpdate,
  [TOGGLE_FAVOURITE]: onFavouriteToggle,
  [SET_CUSTOM_NAME]: onSetCustomName,
  [SET_NEXT_MILESTONE]: onSetNextMilestone,
  [TOGGLE_EDIT_CUSTOM_NAME_MODAL]: toggleEditCustomNameModal,
  [SET_EDIT_OPP_INFO]: setEditOppInfo,
  [CLEAR_EDIT_OPP_INFO]: clearEditOppInfo,
  [DASHBOARD_PROPOSAL_DETAIL]: updateOportunityDetailData,
  [UPDATE_PROPOSAL_DETAIL_SF]: updateProposalDetailSF,
  [UPDATE_DASHBOARD_OPPORTUNITY]: updateDashboardDetail,
  [CHANGE_BID_LOADER]: (state, { payload }) =>
    state.set('changebidloader', payload)
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
