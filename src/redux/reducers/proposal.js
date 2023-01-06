// @flow
import _, { isEqual, cloneDeep } from 'lodash';
import { Map, fromJS, OrderedMap } from 'immutable'; // NOSONAR
import { REDUX_TYPES } from '../../constants';
import type { ApiAction } from '../actions/action-types';
import { getUniqueMilestones } from '../selectors/proposal';
import { getQuestionsFilterApplied } from '../actions/proposal-actions';

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
  SWITCH_TEMP_STATUS,
  SWITCH_TEMP_IN_PROGRESS,
  RESET_PROPOSALID,
  QUESTION_LOCK_BY_USER,
  QUESTION_UNLOCK_BY_USER,
  QUESTION_LOCK_DETAILS_ALL,
  SET_EVENT_LAUNCHER_FLAG,
  SHOW_NA_CHECKBOX,
  ERROR_UPDATE_NOT_APPLICABLE,
  SET_CAN_USER_TAG_IN_QUESTION,
  SET_APPROVAL_QUESTION_LOADING,
  SET_PRICE_MODELER_FIELDS,
  SET_BID_COST_DATA_FIELDS,
  SET_PRICE_MODELER_RECALCULATING,
  PRICE_MODELER_UPDATE
} = REDUX_TYPES.PROPOSAL;

const CLASS_QUES_FIL_R1_C1 = 'questions-filter__row1-col1';
const CLASS_QUES_FIL_ITEM = 'questions-filter__item';

const INITIAL_STATE: Map = fromJS({
  proposalDetails: Map({}),
  proposalQuestions: Map({}),
  isProposalLoading: false,
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
      showInactiveQuestions: {
        checked: false,
        label: 'Include N/A Questions',
        className: 'questions-filter__row3-col1'
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
  switchTempCallStatus: false,
  switchTempInProgress: false,
  eventLauncherFlag: false,
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
  canUserTagInQuestion: false,
  priceModelerRecalculating: false
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const {
    proposalQuestions,
    proposal: { proposalDetails },
    proposal
  } = action.payload;
  let NewopportunityData = new OrderedMap({});
  let opportunityData = state.get('opportunityData');
  let questionsFilter = state.get('questionsFilter');
  let selectedBid = state.get('selectedBid');
  const items = opportunityData.filter((v) => v.get('isCurrent') === false);
  let obj = {
    proposal: proposal,
    proposalQuestions: proposalQuestions,
    proposalUsers: [],
    isCurrent: true
  };
  NewopportunityData = NewopportunityData.set(
    proposal.proposalId,
    OrderedMap(obj)
  );
  NewopportunityData = NewopportunityData.merge(items);
  questionsFilter = questionsFilter.map((group) => {
    return group.map((filter) => {
      if (typeof filter === 'string') return filter;

      return filter.set('checked', false);
    });
  });
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

const resetProposalId = (state) => {
  let selectBid = state.toJS().selectedBid;
  selectBid.id = '';
  return state.set('selectedBid', fromJS(selectBid));
};

const setOpportunityInfo = (state, action) => {
  const { payload } = action;
  let opportunityData = new OrderedMap({});
  let selectedBid = Map({});
  payload.forEach((proposal) => {
    if (proposal.isCurrent) {
      selectedBid = selectedBid
        .set('id', proposal.proposal.proposalId)
        // .set('bidDate', proposal.proposal.proposalDate)
        .set(
          'bidName',
          `Bid ${proposal.proposal.proposalDetails['bidNo'] || ''}`
        )
        .set(
          'questionTemplateVersionNumber',
          proposal.proposal['questionTemplateVersionNumber'] || ''
        )
        .set(
          'isApprovalCountPresent',
          proposal.proposal['isApprovalCountPresent'] || false
        )
        .set('opportunityType', proposal.proposal['opportunityType'] || '')
        .set('isCurrent', true)
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
        );
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
  const proposalQuestions = opportunityData.getIn([
    selectedBid.get('id'),
    'proposalQuestions'
  ]);
  if (proposalQuestions) {
    const milestones = getUniqueMilestones(proposalQuestions);
    let questionsFilter = state.get('questionsFilter');
    let milestoneGroup = fromJS({});
    milestones.forEach((milestone) => {
      milestoneGroup = milestoneGroup.set(
        milestone,
        Map({
          checked: false,
          label: milestone,
          className: CLASS_QUES_FIL_ITEM
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

  let opportunityData = state.get('opportunityData');
  const {
    agreementId,
    accountId,
    proposalDetails,
    opportunityType,
    questionTemplateVersionNumber: templateversion,
    isApprovalCountPresent
  } = opportunityData.getIn([payload.bid.bidId, 'proposal']);
  let selectedBid = Map({
    id: payload.bid.bidId,
    isCurrent: payload.bid.isCurrent,
    pertinentDetails: payload.bid.pertinentDetails,
    bidName: payload.bid.bidName,
    questionTemplateVersionNumber: templateversion || '',
    isApprovalCountPresent: isApprovalCountPresent || false,
    opportunityType: opportunityType || '',
    agreementId: agreementId || '',
    accountId: accountId || '',
    opportunityId: proposalDetails['opportunityId']
  });

  const proposalQuestions = payload.proposalDetails.proposalQuestions;

  if (proposalQuestions) {
    const milestones = getUniqueMilestones(proposalQuestions);

    let questionsFilter = state.get('questionsFilter');
    let milestoneGroup = fromJS({});
    milestones.forEach((milestone) => {
      milestoneGroup = milestoneGroup.set(
        milestone,
        Map({
          checked: false,
          label: milestone,
          className: CLASS_QUES_FIL_ITEM
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
      .set('selectedBid', selectedBid);
  }
  return state
    .set('proposalDetails', proposalDetails)
    .set('isProposalLoading', false)
    .set('selectedBid', selectedBid);
};

const newBidCreated = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('newbidflag', payload['flag'] || false);
};

const addNewBid = (state: Map, action: Object): Map => {
  const { payload } = action;
  let newopportunityData = new OrderedMap({});
  let data = payload;
  let selectedBid = Map({});
  let newstate = state.update('opportunityData', (item) =>
    item.map((keyValue) => keyValue.set('isCurrent', false))
  );

  let opportunityData = newstate.get('opportunityData');
  let boxBids = newstate.get('boxBids');

  let obj = {
    proposal: data.proposal,
    proposalQuestions: data.proposalQuestions,
    proposalUsers: data.proposalUsers,
    isCurrent: data.isCurrent,
    inProgress: data.proposal['inProgress']
  };

  let boxobj = {
    proposalId: data.proposal.proposalId,
    boxId: undefined,
    bidNo: data.proposal.proposalDetails['bidNo']
  };
  if (Array.isArray(boxBids)) {
    let isavailable = boxBids.filter(
      (v) => v['proposalId'] === boxobj.proposalId
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
    .set('id', data.proposal.proposalId)
    .set('bidName', `Bid ${data.proposal.proposalDetails['bidNo'] || ''}`)
    .set(
      'questionTemplateVersionNumber',
      data.proposal['questionTemplateVersionNumber'] || ''
    )
    .set(
      'isApprovalCountPresent',
      data.proposal['isApprovalCountPresent'] || false
    )
    .set('opportunityType', data.proposal['opportunityType'] || '')
    .set('isCurrent', true)
    .set('bidStatus', data.proposal['inProgress'] || false)
    .set('pertinentDetails', data.proposal.proposalDetails.pertinentDetails);

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
  milestones.forEach((milestone) => {
    milestoneGroup = milestoneGroup.set(
      milestone,
      Map({
        checked: false,
        label: milestone,
        className: CLASS_QUES_FIL_ITEM
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
    .findIndex((listItem) => listItem.questionId === question.questionId);

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

  const proposalId = Array.isArray(data)
    ? data[data.length - 1].proposalId
    : data.proposalId;
  const selectedBidId = state.getIn(['selectedBid', 'id']);

  // case  when user is not in the same proposal Id
  if (selectedBidId !== proposalId) {
    return state;
  }

  // update current selected bid and return
  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex((listItem) => {
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
        .findIndex((listItem) => {
          return listItem.questionId === questionId;
        });
      newState = state.updateIn(
        ['proposalQuestions', indexOfListToUpdateCurrent],
        (value) => ({
          ...value,
          questionLockInfo: { userInfo: userEmail, userId, userName }
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
        .findIndex((listItem) => {
          return listItem.questionId === clientQuestionId;
        });

      newState = state.updateIn(
        ['proposalQuestions', indexOfListToUpdateCurrent],
        (value) => ({
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
    .findIndex((listItem) => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'loading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  const filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(
      (listItem) => {
        return listItem.questionId === referenceId;
      }
    );
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
    .findIndex((listItem) => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'NaLoading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  let filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(
      (listItem) => {
        return listItem.questionId === referenceId;
      }
    );
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

  console.log('inside update proposal na ', data);

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex((listItem) => {
      return listItem.questionId === referenceId;
    });

  console.log('indexOfListToUpdate ', indexOfListToUpdate);

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
    .findIndex((listItem) => {
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
    .findIndex((listItem) => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'NaLoading'],
    loading
  );

  const proposalQuestions = newState.get('proposalQuestions');
  let filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(
      (listItem) => {
        return listItem.questionId === referenceId;
      }
    );
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
    .findIndex((listItem) => {
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

const onSetQuestion = (state: Map, action: Object): Map => {
  const data = action.payload;
  const updatedProposalQuestions = state.get('proposalQuestions');
  updatedProposalQuestions.push(data);

  let questionsFilter = state.get('questionsFilter');
  const filterQuestionsVal = getQuestionsFilterApplied(
    updatedProposalQuestions,
    questionsFilter
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
    (item) => item.questionId === data.questionId
  );

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    data,
    ...questions.slice(questionIndex + 1, questions.length)
  ];
  const filterQuestionsVal = getQuestionsFilterApplied(
    updatedQuestions,
    questionsFilter
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
    (item) => item.questionId === questionId
  );

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    ...questions.slice(questionIndex + 1, questions.length)
  ];

  let selectedBidId = state.getIn(['selectedBid', 'id']);

  if (filterquestions && Array.isArray(filterquestions)) {
    const filterquestionIndex = filterquestions.findIndex(
      (item) => item.questionId === questionId
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
  console.log('state', state);
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
  const { bidValue, bottomLine, budgetTools } = action.payload;

  return state.set(
    'bidCostDetails',
    fromJS({
      totalBidValue: bidValue,
      bottomLineLaborDiscount: bottomLine,
      budgetTools
    })
  );
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
  [SWITCH_TEMP_STATUS]: (state, { payload }) =>
    state.set('switchTempCallStatus', payload),
  [SWITCH_TEMP_IN_PROGRESS]: (state, { payload }) =>
    state.set('switchTempInProgress', payload),
  [RESET_PROPOSALID]: resetProposalId,
  [QUESTION_LOCK_BY_USER]: updateQuestionLockByUser,
  [QUESTION_UNLOCK_BY_USER]: updateQuestionUnlockByUser,
  [QUESTION_LOCK_DETAILS_ALL]: questionLockDetails,
  [SET_EVENT_LAUNCHER_FLAG]: (state, { payload }) =>
    state.set('eventLauncherFlag', payload),
  [SHOW_NA_CHECKBOX]: (state, { payload }) =>
    state.set('showNaCheckbox', payload),
  [SET_PRICE_MODELER_FIELDS]: setPriceModulerFields,
  [SET_BID_COST_DATA_FIELDS]: setBidCostDataFields,
  [SET_APPROVAL_QUESTION_LOADING]: setApprovalQuestionLoading,
  [SET_CAN_USER_TAG_IN_QUESTION]: (state, { payload }) =>
    state.set('canUserTagInQuestion', payload),
  [SET_PRICE_MODELER_RECALCULATING]: (state, { payload }) =>
    state.set('priceModelerRecalculating', payload),
  [PRICE_MODELER_UPDATE]: updatePriceModelerEstimate
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
