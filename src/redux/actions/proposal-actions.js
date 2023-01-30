// @flow
import { isEmpty, cloneDeep, uniqBy } from 'lodash';
import { fromJS } from 'immutable';
import axios from 'axios';
import type { Dispatch, ThunkAction } from './action-types';

import { REDUX_TYPES, API } from '../../constants';

import {
  getProposalInfo,
  setProposalAnswer,
  getQuestionSectionInfo,
  getAnswerTypes,
  getRoles,
  getIntegrations,
  setProposalQuestionData,
  getProposalInfoUpdated,
  getProposlBoxId,
  getValidatedProposalData,
  editProposalQuestionData,
  deleteProposalQuestionData,
  getPaginateProposal,
  getPickListLookupSfData,
  fetchAdditionalBoxLink,
  getOTListData,
  changeProposalOT,
  deleteProposalUser,
  getProposalAnswer,
  priceModelerApi,
  setNotApplicableQuestionApi,
  getAllProposals
} from '../../api/proposal';
import { getQuestionsFilters, selectProposalQuestions } from '../selectors';
import { getSelectedBid, getUniqueMilestones } from '../selectors/proposal';
import { getErrorMessage, getProposalIdlist } from '../../utils/utils';
import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../constants/app';
import isPriceModelerQuestion from '../../utils/isPriceModelerQuestion';
import { fetchAllApprovals } from './approval-actions';
import { SEARCH } from '../../constants/types';
import { doSearchAction } from './search-actions';
import { selectQuery } from '../selectors/search';

const { PROPOSAL_API_URL } = API.PROPOSAL;
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
  INTEGRATIONS_INFO,
  INTEGRATIONS_ERROR,
  INTEGRATIONS_LOADING,
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
  UPDATE_LOOKUP_OPTIONS,
  BOX_ADDITIONAL_LINK,
  BOX_ADDITIONAL_LINK_ERROR,
  SWITCH_TEMP_STATUS,
  SWITCH_TEMP_IN_PROGRESS,
  RESET_PROPOSALID,
  QUESTION_LOCK_BY_USER,
  QUESTION_UNLOCK_BY_USER,
  QUESTION_LOCK_DETAILS_ALL,
  SET_FLAG,
  SHOW_NA_CHECKBOX,
  UPDATE_NOT_APPLICABLE_PROGRESS,
  UPDATE_NOT_APPLICABLE_FROM_SOCKET_DONE,
  UPDATE_NOT_APPLICABLE_DONE,
  SET_PRICE_MODELER_FIELDS,
  SET_BID_COST_DATA_FIELDS,
  ERROR_UPDATE_NOT_APPLICABLE,
  SET_CAN_USER_TAG_IN_QUESTION,
  SET_APPROVAL_QUESTION_LOADING,
  SET_PRICE_MODELER_RECALCULATING,
  PRICE_MODELER_UPDATE,
  SET_ACTIVE_TABINDEX,
  SET_V_TAB_ACTIVE_INDEX
} = REDUX_TYPES.PROPOSAL;

/**
 * Updates bidNo Query param without page reload
 */
const updateBidNoQueryparam = bidNo => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('bidNo', bidNo);
    // New url
    const newRelativePathQuery = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    // Update URL without pageload
    window.history.pushState(null, '', newRelativePathQuery);
  }
};

export type ProposalInfo = {};

export const getProposal = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });

    try {
      const data = await getProposalInfo(id);
      // Extracting unique milestone values from Proposal Questions
      const milestones = getUniqueMilestones(data.proposalQuestions);
      dispatch({ type: PROPOSAL_INFO, payload: { ...data, milestones } });

      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
    }
  };
};

export const getProposalByID = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });
    try {
      const data = await getProposalInfo(id);
      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
      throw err;
    }
  };
};

export function setNotApplicableLoader(questionId) {
  return async dispatch => {
    dispatch({
      type: UPDATE_NOT_APPLICABLE_PROGRESS,
      payload: { questionId, loading: true }
    });
  };
}

export function setNotApplicableQuestion(
  proposalId,
  questionId,
  questionStatus,
  socketContext
) {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    try {
      // dispatch({
      //   type: UPDATE_NOT_APPLICABLE_PROGRESS,
      //   payload: { questionId, loading: true }
      // });

      await socketContext.naQuestionUpdateWrapper(questionId, questionStatus);

      const { data } = await setNotApplicableQuestionApi(
        proposalId,
        questionId,
        questionStatus
      );

      dispatch({
        type: UPDATE_NOT_APPLICABLE_DONE,
        payload: { data: data.data, questionId, questionStatus }
      });
      const questionsFilter = getQuestionsFilters(getState());
      dispatch(onQuestionsFilterApplied(questionsFilter));
    } catch (err) {
      dispatch({
        type: ERROR_UPDATE_NOT_APPLICABLE,
        payload: { questionId, loading: false }
      });
    }
  };
}

export function setNotApplicableQuestionFromSocket(questionId, questionStatus) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_NOT_APPLICABLE_FROM_SOCKET_DONE,
        payload: { questionId, questionStatus }
      });
      const questionsFilter = getQuestionsFilters(getState());
      dispatch(onQuestionsFilterApplied(questionsFilter));
    } catch (err) {
      dispatch({
        type: ERROR_UPDATE_NOT_APPLICABLE,
        payload: { questionId, loading: false }
      });
    }
  };
}

/**
 * Get Price Modeler Data
 */
export const getPriceModelerData = proposalId => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const response = await priceModelerApi(proposalId);
      dispatch({ type: SET_PRICE_MODELER_FIELDS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getBidCostData = proposalId => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const response = await bidCostApi(proposalId);
      dispatch({ type: SET_BID_COST_DATA_FIELDS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setApprovalQuestionLoading = (questionId, value) => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      dispatch({
        type: SET_APPROVAL_QUESTION_LOADING,
        payload: { questionId, value }
      });
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * Redux action function to set price modeler recalculating status
 * @param {isRecalculating} boolean
 */
export const setPriceModelerRecalculationStatusAction = (
  isRecalculating = false
) => {
  return async dispatch => {
    try {
      dispatch({
        type: SET_PRICE_MODELER_RECALCULATING,
        payload: isRecalculating
      });
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * Redux action function to update Price Modeler Estimate and reset recalcuting status
 * @param {costUpdate} Object
 */
export const updatePriceModelerEstimateAction = (costUpdate = {}) => {
  return async dispatch => {
    try {
      if (!isEmpty(costUpdate)) {
        dispatch({ type: PRICE_MODELER_UPDATE, payload: costUpdate });
      }
      dispatch(setPriceModelerRecalculationStatusAction(false));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setProposalAnswerData = (
  socketContext,
  proposalId: string,
  questionId: string,
  answer: string,
  userData: Object,
  editorData: any,
  disableLoader = false
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    dispatch(setApprovalQuestionLoading(questionId, true));
    if (!disableLoader) {
      dispatch({
        type: PROPOSAL_ANSWER_LOADING,
        payload: { questionId, loading: true }
      });
    }
    const questionsFilter = getQuestionsFilters(getState());

    try {
      const { data } = await setProposalAnswer(
        proposalId,
        questionId,
        answer,
        userData,
        editorData
      );
      // Check is price modeler question
      const allQuestions = selectProposalQuestions(getState());
      if (isPriceModelerQuestion(questionId, allQuestions)) {
        await getPriceModelerData(proposalId)(dispatch);
      }
      await socketContext.questionAnswerUpdateWrapper(questionId, data);
      dispatch({
        type: PROPOSAL_ANSWER,
        payload: {
          data: Array.isArray(data.answers) ? data.answers : data,
          questionId,
          hasDifferentSFanswer: data.hasDifferentSFanswer || false
        }
      });

      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
      dispatch(onQuestionsFilterApplied(questionsFilter));
      if (!disableLoader) {
        dispatch({
          type: PROPOSAL_ANSWER_LOADING,
          payload: { questionId, loading: false }
        });
      }
      dispatch(setApprovalQuestionLoading(questionId, false));
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
    }
  };
};

export const setProposalAnswerDatafromSocket = (
  questionId: string,
  data: any
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    dispatch({
      type: PROPOSAL_ANSWER_LOADING,
      payload: { questionId, loading: true }
    });
    const questionsFilter = getQuestionsFilters(getState());

    try {
      dispatch({
        type: PROPOSAL_ANSWER,
        payload: {
          data: Array.isArray(data.answers) ? data.answers : data,
          questionId,
          hasDifferentSFanswer: data.hasDifferentSFanswer || false
        }
      });

      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
      dispatch(onQuestionsFilterApplied(questionsFilter));
      dispatch({
        type: PROPOSAL_ANSWER_LOADING,
        payload: { questionId, loading: false }
      });
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
    }
  };
};

export const setProposalQuestionfromSocket = (
  questionId: string,
  data: any
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    dispatch({
      type: PROPOSAL_ANSWER_LOADING,
      payload: { questionId, loading: true }
    });
    const questionsFilter = getQuestionsFilters(getState());

    try {
      dispatch({
        type: PROPOSAL_ANSWER,
        payload: {
          data: Array.isArray(data.answers) ? data.answers : data,
          questionId,
          hasDifferentSFanswer: data.hasDifferentSFanswer || false
        }
      });

      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
      dispatch(onQuestionsFilterApplied(questionsFilter));
      dispatch({
        type: PROPOSAL_ANSWER_LOADING,
        payload: { questionId, loading: false }
      });
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
    }
  };
};

export const updateAnswerFromWebSocket = (
  data = {}
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const { questionId } = data;
    let questionsFilter = getQuestionsFilters(getState());

    try {
      if (Array.isArray(data.answers)) {
        dispatch({
          type: PROPOSAL_ANSWER,
          payload: {
            data: data.answers,
            questionId,
            hasDifferentSFanswer: data.hasDifferentSFanswer || false
          }
        });
      } else {
        dispatch({
          type: PROPOSAL_ANSWER,
          payload: {
            data,
            questionId,
            hasDifferentSFanswer: data.hasDifferentSFanswer || false
          }
        });
      }
      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
      dispatch(onQuestionsFilterApplied(questionsFilter));
    } catch (err) {
      console.log('Error in updating answer from WS', error);
    }
  };
};

export const getQuestionSection = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_SECTION_LOADING,
      payload: {}
    });
    try {
      const data = await getQuestionSectionInfo();
      dispatch({
        type: QUESTION_SECTION_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: QUESTION_SECTION_ERROR,
        payload: err
      });
    }
  };
};

export const getAnswerTypesInfo = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: ANSWER_TYPES_LOADING,
      payload: {}
    });
    try {
      const data = await getAnswerTypes();
      dispatch({
        type: ANSWER_TYPES_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: ANSWER_TYPES_ERROR,
        payload: err
      });
    }
  };
};

export const getRolesInfo = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: ROLES_LOADING,
      payload: {}
    });
    try {
      const data = await getRoles();
      dispatch({
        type: ROLES_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: ROLES_ERROR,
        payload: err
      });
    }
  };
};

export const getIntegrationsData = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: INTEGRATIONS_LOADING,
      payload: {}
    });
    try {
      const data = await getIntegrations();
      dispatch({
        type: INTEGRATIONS_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: INTEGRATIONS_ERROR,
        payload: err
      });
    }
  };
};

export const setProposalQuestion = (
  proposalId: string,
  questionData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await setProposalQuestionData(proposalId, questionData);

      dispatch({ type: PROPOSAL_SET_QUESTION, payload: data });
      if (socketContext) await socketContext?.addQuestionWrapper(data);
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const setProposalQuestionFromSocket = (
  questionData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      dispatch({ type: PROPOSAL_SET_QUESTION, payload: questionData });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const getProposalUpdated = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_INFO_LOADING,
      payload: {}
    });
    try {
      const data = await getProposalInfoUpdated(id);
      dispatch({
        type: PROPOSAL_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: PROPOSAL_INFO_ERROR,
        payload: err
      });
    }
  };
};

export const updateQuestionLockByUser = (data): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_LOCK_BY_USER,
      payload: data
    });
  };
};
export const getQuestionLockDetailsAll = (
  data
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_LOCK_DETAILS_ALL,
      payload: data
    });
  };
};

export const updateQuestionUnlockByUser = (
  data
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_UNLOCK_BY_USER,
      payload: data
    });
  };
};

export const onGetProposalBoxId = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_BOX_ID_LOADING, payload: {} });
    try {
      const { data } = await getProposlBoxId(id);
      const { BoxId: boxId } = data.proposal.proposalDetails;
      dispatch({ type: PROPOSAL_BOX_ID, payload: { boxId } });
    } catch (error) {
      dispatch({
        type: PROPOSAL_BOX_ID_ERROR,
        payload: { error: error.error }
      });
    }
  };
};
export const getAdditionalBoxLink = (
  oppID: string,
  crmNo: string,
  customer: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const { data } = await fetchAdditionalBoxLink(oppID, crmNo, customer);
      dispatch({ type: BOX_ADDITIONAL_LINK, payload: { boxlink: data } });
    } catch (error) {
      dispatch({
        type: BOX_ADDITIONAL_LINK_ERROR,
        payload: { error: error }
      });
    }
  };
};

export const setupdateBoxId = (url: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_BOX_ID_LOADING, payload: {} });
    try {
      dispatch({ type: PROPOSAL_BOX_ID, payload: { boxId: url } });
    } catch (error) {
      dispatch({
        type: PROPOSAL_BOX_ID_ERROR,
        payload: { error: error.error }
      });
    }
  };
};

export const onGetValidatedProposalDetails = (
  id: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: ON_FETCHING_VALIDATED_PROPOSAL_DATA, payload: {} });

    try {
      const { data } = await getValidatedProposalData(id);
      dispatch({ type: VALIDATED_PROPOSAL_DATA, payload: { data } });
    } catch (error) {
      dispatch({
        type: VALIDATED_PROPOSAL_DATA_ERROR,
        payload: { error }
      });
    }
  };
};

function applyMyUserRoleFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const assignedRoles = question.get('roleNames', []);
        return assignedRoles.includes(role);
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyUnAnsweredFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(val => {
        let Answer = val.get('answers', []);
        Answer = Answer.toJS();
        return (
          (Answer &&
            Answer.length &&
            !Boolean(String(Answer[Answer.length - 1].answer).trim().length)) ||
          !Boolean(Answer.length) ||
          (Answer &&
            Answer.length &&
            Answer[Answer.length - 1].userName === 'UnityPredictedAnswer')
        );
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyAnsweredFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        let Answer = question.get('answers', []);
        Answer = Answer.toJS();
        return (
          Answer &&
          Answer.length &&
          String(Answer[Answer.length - 1].answer).trim().length > 0 &&
          Answer[Answer.length - 1].userName !== 'UnityPredictedAnswer'
        );
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyInterestedPartyFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const interestedParties = question.get('interestedParties', []);
        return interestedParties.includes(role);
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyShowInactiveQuestionsFilter(questions) {
  return questions;
}

function applyMilestoneFilter(questions, milestone) {
  let filteredQuestions = cloneDeep(questions);
  if (milestone) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const questionMilestone = question.get('milestone');
        return questionMilestone === milestone;
      })
      .toJS();
  }
  return filteredQuestions;
}

function filterGroup(
  filteredQuestions,
  allQuestions,
  logic,
  filterCallback,
  filterName = ''
) {
  if (logic === 'AND') {
    return uniqBy(filterCallback(allQuestions), 'questionId');
  }
  return uniqBy(
    [...filteredQuestions, ...filterCallback(allQuestions, filterName)],
    'questionId'
  );
}

export function getQuestionsFilterApplied(questionsArr, questionsFilter) {
  let filteredQuestions = questionsArr;
  questionsFilter.entrySeq().forEach(([groupName, group]) => {
    let withinGroupFilteredQuestions = [];
    // Set the logic for current filter Group
    const logic = group.get('logic');
    let considerGroup = false;

    group.entrySeq().forEach(([filterName, filter]) => {
      // Do not process for logic key or the filter is not checked
      if (filterName === 'logic' || !filter.get('checked')) return;

      considerGroup = true;

      switch (filterName) {
        case 'myUserRole':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyMyUserRoleFilter
          );
          break;
        case 'answered':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyAnsweredFilter
          );
          break;
        case 'unanswered':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyUnAnsweredFilter
          );
          break;
        case 'interestedParty':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyInterestedPartyFilter
          );
          break;
        default:
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyMilestoneFilter,
            filterName
          );
          break;
      }
    });

    if (considerGroup) filteredQuestions = withinGroupFilteredQuestions;

    considerGroup = false;
  });

  return filteredQuestions;
}

export function onQuestionsFilterApplied(questionsFilter) {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: ON_APPLY_QUESTIONS_FILTER,
      payload: { questionsFilter }
    });

    let filteredQuestions = cloneDeep(selectProposalQuestions(state));
    questionsFilter.entrySeq().forEach(([groupName, group]) => {
      let withinGroupFilteredQuestions = [];
      // Set the logic for current filter Group
      const logic = group.get('logic');
      let considerGroup = false;

      group.entrySeq().forEach(([filterName, filter]) => {
        // Do not process for logic key or the filter is not checked
        if (filterName === 'logic' || !filter.get('checked')) return;

        considerGroup = true;

        switch (filterName) {
          case 'myUserRole':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMyUserRoleFilter
            );
            break;
          case 'answered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyAnsweredFilter
            );
            break;
          case 'unanswered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyUnAnsweredFilter
            );
            break;
          case 'interestedParty':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyInterestedPartyFilter
            );
            break;
          case 'showInactiveQuestions':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyShowInactiveQuestionsFilter
            );
            break;
          default:
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMilestoneFilter,
              filterName
            );
            break;
        }
      });

      if (considerGroup) filteredQuestions = withinGroupFilteredQuestions;

      considerGroup = false;
    });

    dispatch({
      type: ON_QUESTIONS_FILTERED,
      payload: { filteredQuestions }
    });

    dispatch(doSearchAction());
  };
}

export function onApplyQuestionsFilter(
  filterName = null,
  checked = false,
  groupName
) {
  return async (dispatch, getState) => {
    const state = getState();
    const searchQuery = selectQuery(state);
    let questionsFilter = getQuestionsFilters(state);
    if (searchQuery !== null && searchQuery.length >= 3 && checked) {
      const approvalFilters = state.approvals.filters;
      let totalFiltersApplied = 0;
      questionsFilter.entrySeq().forEach(([groupName, group]) => {
        group
          .entrySeq()
          .filter(value => value[0] !== 'logic')
          .forEach(([key, filter]) => {
            if (filter.get('checked')) {
              totalFiltersApplied++;
            }
          });
      });
      totalFiltersApplied += approvalFilters.filter(item => item.value).length;
      if (totalFiltersApplied === 0) {
        dispatch({
          type: SEARCH.SHOW_MODAL,
          payload: {
            modalTitle: SEARCH_CONSTANTS.TITLE_SEARCH_ACTIVE,
            modalContent: SEARCH_CONSTANTS.CONTENT_SEARCH_ACTIVE
          }
        });
      }
    }
    if (filterName && groupName) {
      questionsFilter = questionsFilter.setIn(
        [groupName, filterName, 'checked'],
        checked
      );
    }
    dispatch(onQuestionsFilterApplied(questionsFilter));
  };
}

export function resetQuestionsFilterAction() {
  return async (dispatch, getState) => {
    let questionsFilter = getQuestionsFilters(getState());
    const searchQuery = selectQuery(getState());
    questionsFilter = questionsFilter.map(group => {
      return group.map(filter => {
        if (typeof filter === 'string') return filter;
        return filter.set('checked', false);
      });
    });
    dispatch({ type: RESET_QUESTIONS_FILTER, payload: questionsFilter });
    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
  };
}

export function clearQuestionsFilterAction() {
  return async (dispatch, getState) => {
    let questionsFilter = getQuestionsFilters(getState());
    const searchQuery = selectQuery(getState());
    questionsFilter = questionsFilter.map(group => {
      return group.map(filter => {
        if (typeof filter === 'string') return filter;

        return filter.set('checked', false);
      });
    });
    dispatch({ type: CLEAR_QUESTIONS_FILTER, payload: { questionsFilter } });
    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
  };
}

export function expandAllSectionsAction(expand = false) {
  return async dispatch => {
    dispatch({ type: EXPAND_ALL_SECTIONS, payload: expand });
  };
}

export function setEditQuestionData(data = {}) {
  return async dispatch => {
    dispatch({ type: SET_EDIT_QUESTION_DATA, payload: data });
  };
}

export const editProposalQuestion = (
  proposalId: string,
  questionId: string,
  questionData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await editProposalQuestionData(
        proposalId,
        questionId,
        questionData
      );

      if (socketContext) await socketContext?.questionTextUpdateWrapper(data);
      dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const editProposalQuestionfromSocket = (
  questionData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = questionData;
      dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const deleteProposalQuestion = (
  proposalId: string,
  questionId: string,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await deleteProposalQuestionData(proposalId, questionId);

      dispatch({ type: PROPOSAL_DELETE_QUESTION, payload: questionId });
      if (socketContext) await socketContext?.questionDeleteWrapper(questionId);
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const deleteProposalQuestionFromSocket = (
  questionId: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      dispatch({ type: PROPOSAL_DELETE_QUESTION, payload: questionId });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const closeNewbidflags = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: NEW_BID_CREATED, payload: { flag: false } });
  };
};

export const getOpportunity = (
  id: string,
  bidNumber,
  flag = false
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    const bidNo = parseInt(bidNumber);
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });
    let selectedProposalId;

    try {
      const allProposals = await getAllProposals(id);
      const proposal = allProposals.find(
        thisProposal => thisProposal.proposal.proposalDetails.bidNo === bidNo
      );
      const isCurrentProposal = allProposals.find(
        thisProposal => thisProposal.isCurrent === true
      );
      if (proposal) selectedProposalId = proposal.proposal.proposalId;
      const proposalCount = allProposals.length;
      // const maxLimit = 500;
      //
      // let callstomake = parseInt(proposalCount / maxLimit);
      // let additionalcallstomake = proposalCount % maxLimit;
      // if (additionalcallstomake) {
      //   callstomake = callstomake + 1;
      // }
      // let from = 0;
      const urls = [];
      const proposalsData = [];
      for (let index = 0; index < proposalCount; index += 1) {
        // let trueOrFalse;

        if (selectedProposalId) {
          // user on previous bid
          if (allProposals[index].proposal.proposalId === selectedProposalId) {
            urls.push(
              axios.get(
                `${PROPOSAL_API_URL}/${allProposals[index].proposal.proposalId}`
              )
            );
          } else {
            proposalsData.push(allProposals[index]);
          }
        } else {
          // user on current bid
          if (allProposals[index].isCurrent) {
            urls.push(
              axios.get(
                `${PROPOSAL_API_URL}/${allProposals[index].proposal.proposalId}`
              )
            );
          } else {
            proposalsData.push(allProposals[index]);
          }
        }
      }
      let data = await getPaginateProposal(urls);
      data = data.map(v => v['data']).flat();
      data[0].isCurrent =
        isCurrentProposal.proposal.proposalId === data[0].proposal.proposalId;
      if (data && data.length && data[0].proposal?.switchTemplateStatus) {
        dispatch({
          type: SWITCH_TEMP_IN_PROGRESS,
          payload: true
        });
        dispatch({
          type: SWITCH_TEMP_STATUS,
          payload: 'progress'
        });
      }
      proposalsData.push(data[0]);
      dispatch({ type: OPPORTUNITY_INFO, payload: proposalsData });
      // get approvals data for current bid
      const currentBidDetails = proposalsData.find(
        proposal => proposal.isCurrent
      );
      if (currentBidDetails) {
        dispatch(
          fetchAllApprovals(
            currentBidDetails.proposal.proposalId,
            currentBidDetails.proposalQuestions
          )
        );
      }

      dispatch({
        type: UPDATE_BOX_BIDS,
        payload: getProposalIdlist(proposalsData)
      });
      if (flag) {
        dispatch({ type: NEW_BID_CREATED, payload: { flag } });
      }
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
      dispatch({ type: NEW_BID_CREATED, payload: { flag: false } });
    }
  };
};

export const resetProposalId = () => {
  return dispatch => dispatch({ type: RESET_PROPOSALID, payload: {} });
};

export const changeBid = bid => {
  if (bid?.bidNo) {
    updateBidNoQueryparam(bid?.bidNo);
  }
  return async (dispatch, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid.bidName !== bid?.bidName) {
      dispatch({ type: SEARCH.SET_CLEAR_INPUT_FLAG });
    }
    const response = await axios.get(`${PROPOSAL_API_URL}/${bid.bidId}`);
    dispatch({
      type: CHANGE_BID,
      payload: {
        proposalDetails: { ...response.data, isCurrent: bid.isCurrent },
        bid
      }
    });
  };
};

export const UpdateNewBid = bid => {
  return dispatch => {
    dispatch({
      type: ADD_NEW_BID,
      payload: bid
    });
    // dispatch(fetchNotes(bid.proposal.proposalId));
  };
};

export const callPickListLookupSfData = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      let lookupMap = {};
      const response = await getPickListLookupSfData();
      const { data } = response.data;
      data.forEach(row => {
        const options = row.PicklistValues;
        lookupMap[`${row.PK}_${row.SK}`] = options;
      });
      dispatch({ type: UPDATE_LOOKUP_OPTIONS, payload: lookupMap });
    } catch (error) {
      console.log('Lookup API failed');
    }
  };
};

/**
 * Fetch All Opportunity Type
 */
export const fetchOTListData = () => async () => {
  try {
    // Api Response
    const response = await getOTListData();
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

/**
 * Switch Temp Status Update - Action
 */
export const updateSwitchTempStatusFromWebSocket = data => {
  return async dispatch => {
    dispatch({
      type: SWITCH_TEMP_STATUS,
      payload: data
    });
  };
};

/**
 * Activate Proposal Loading - Action
 */
export const activateProposalLoading = () => {
  return async dispatch => {
    dispatch({
      type: PROPOSAL_INFO_LOADING,
      payload: {}
    });
  };
};

/**
 * Deactivate Proposal Loading - Action
 */
export const deactivateProposalLoading = () => {
  return async dispatch => {
    dispatch({
      type: PROPOSAL_INFO_ERROR,
      payload: undefined
    });
  };
};

/**
 * Fetch All Opportunity Type
 */
export const changeOpportunityType = switchTempData => async () => {
  try {
    // Api Response
    const response = await changeProposalOT(switchTempData);
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

/**
 * Switch Temp In Progress - Action
 */
export const updateSwitchInProgress = data => {
  return async dispatch => {
    dispatch({
      type: SWITCH_TEMP_IN_PROGRESS,
      payload: data
    });
  };
};

/**
 * Set Proposal Answer Loading - Action
 */
export const setProposalAnswerLoading = (questionId, loading) => {
  return async dispatch => {
    dispatch({
      type: PROPOSAL_ANSWER_LOADING,
      payload: { questionId, loading }
    });
  };
};

/**
 * Delete Proposal User from Selected Answer
 */
export const deleteProposalUserFromDB = (
  proposalId,
  email,
  sectionOrder,
  sectionName
) => async () => {
  try {
    // Api Response
    const response = await deleteProposalUser(proposalId, {
      email,
      section: { sectionOrder, sectionName }
    });
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

/**
 * Get Proposal Answers History
 */
export const getProposalAnswerHistory = (
  proposalId: string,
  questionId: string
) => async () => {
  try {
    // Api Response
    const response = await getProposalAnswer(proposalId, questionId);
    return { status: true, title: DEFAULT.SUCCESS, data: response };
  } catch (error) {
    // Error
    console.log(error?.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

/**
 * Set Flag for Event Launcher
 */
export const setFlag = val => {
  return dispatch => {
    dispatch({
      type: SET_FLAG,
      payload: val
    });
  };
};

export const setShowNaCheckbox = val => {
  return dispatch => {
    dispatch({
      type: SHOW_NA_CHECKBOX,
      payload: val
    });
  };
};

export const setCanUserTagInQuestion = can => {
  return dispatch => {
    dispatch({
      type: SET_CAN_USER_TAG_IN_QUESTION,
      payload: can
    });
  };
};

export const fetchUserTagFlagInQuestion = val => {
  return async dispatch => {
    dispatch(setCanUserTagInQuestion(val));
  };
};

export const setActiveTabIndexAction = activeIndex => {
  return dispatch => {
    dispatch({
      type: SET_ACTIVE_TABINDEX,
      payload: activeIndex
    });
  };
};

export const setVTabActiveIndexAction = activeIndex => {
  return dispatch => {
    dispatch({
      type: SET_V_TAB_ACTIVE_INDEX,
      payload: activeIndex
    });
  };
};
