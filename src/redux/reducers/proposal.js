// @flow
import { cloneDeep } from 'lodash';
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
  BOX_ADDITIONAL_LINK,
  BOX_ADDITIONAL_LINK_ERROR,
  SWITCH_TEMP_STATUS,
  SWITCH_TEMP_IN_PROGRESS
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
        label: 'My User Role',
        className: CLASS_QUES_FIL_R1_C1
      },
      interestedParty: {
        checked: false,
        label: 'Interested Party',
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
  switchTempCallStatus: false,
  switchTempInProgress: false
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
  const items = opportunityData.filter(v => v.get('isCurrent') === false);
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
  questionsFilter = questionsFilter.map(group => {
    return group.map(filter => {
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

const setOpportunityInfo = (state, action) => {
  const { payload } = action;
  let opportunityData = new OrderedMap({});
  let selectedBid = Map({});
  // console.log(`payload`, payload);
  payload.forEach(proposal => {
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
  // console.log(`proposalQuestions`, proposalQuestions)

  const milestones = getUniqueMilestones(proposalQuestions);

  let questionsFilter = state.get('questionsFilter');
  let milestoneGroup = fromJS({});
  milestones.forEach(milestone => {
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
};

const onChangeBid = (state: Map, action: Object): Map => {
  const { payload } = action;
  let opportunityData = state.get('opportunityData');
  const {
    agreementId,
    accountId,
    proposalDetails,
    opportunityType,
    questionTemplateVersionNumber: templateversion
  } = opportunityData.getIn([payload.bidId, 'proposal']);
  let selectedBid = Map({
    id: payload.bidId,
    isCurrent: payload.isCurrent,
    pertinentDetails: payload.pertinentDetails,
    bidName: payload.bidName,
    questionTemplateVersionNumber: templateversion || '',
    opportunityType: opportunityType || '',
    agreementId: agreementId || '',
    accountId: accountId || '',
    opportunityId: proposalDetails['opportunityId']
  });

  const proposalQuestions = opportunityData.getIn([
    selectedBid.get('id'),
    'proposalQuestions'
  ]);

  const milestones = getUniqueMilestones(proposalQuestions);

  let questionsFilter = state.get('questionsFilter');
  let milestoneGroup = fromJS({});
  milestones.forEach(milestone => {
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
    .set('id', data.proposal.proposalId)
    .set('bidName', `Bid ${data.proposal.proposalDetails['bidNo'] || ''}`)
    .set(
      'questionTemplateVersionNumber',
      data.proposal['questionTemplateVersionNumber'] || ''
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
  milestones.forEach(milestone => {
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

const onProposalAnswer = (state: Map, action: Object): Map => {
  const {
    payload: { data, questionId: referenceId, hasDifferentSFanswer }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  let selectedBidId = state.getIn(['selectedBid', 'id']);

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
  let filterQuestionsLen = state.get('filteredProposalQuestions');
  if (Array.isArray(filterQuestionsLen)) {
    const filterindexOfListToUpdate = filterQuestionsLen.findIndex(listItem => {
      return listItem.questionId === referenceId;
    });
    newState = state.setIn(
      ['filteredProposalQuestions', filterindexOfListToUpdate, 'loading'],
      loading
    );
    let filterQuestions = newState.get('filteredProposalQuestions');
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('filteredProposalQuestions', filterQuestions)
      .set('isProposalAnswerLoading', loading);
  } else {
    return state
      .set('proposalQuestions', proposalQuestions)
      .set('isProposalAnswerLoading', loading);
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
    item => item.questionId === questionId
  );

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

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded,
  [PROPOSAL_INFO_LOADING]: onProposalLoading,
  [PROPOSAL_INFO_ERROR]: onProposalError,
  [PROPOSAL_ANSWER]: onProposalAnswer,
  [PROPOSAL_ANSWER_LOADING]: onProposalAnswerLoading,
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
  [BOX_ADDITIONAL_LINK]: fetchBoxAdditionalLink,
  [BOX_ADDITIONAL_LINK_ERROR]: onGettingfetchBoxAdditionalLinkError,
  [SWITCH_TEMP_STATUS]: (state, { payload }) =>
    state.set('switchTempCallStatus', payload),
  [SWITCH_TEMP_IN_PROGRESS]: (state, { payload }) =>
    state.set('switchTempInProgress', payload)
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
