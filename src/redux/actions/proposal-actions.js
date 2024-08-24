// @flow
import { isEmpty, cloneDeep, uniqBy, orderBy } from 'lodash';
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
  getAllProposals,
  fetchOpportunityFolderLink
} from '../../api/proposal';
import { updateCustomName } from '../../api/sso-auth';
import {
  getQuestionsFilters,
  selectProposalQuestions,
  getProposals,
  getProposalDetails,
  getFavouriteProposals,
  getfetchUserTagFlag
} from '../selectors';
import {
  getSelectedBid,
  getUniqueMilestones,
  getOpportunityData
} from '../selectors/proposal';
import { getErrorMessage, getProposalIdlist } from '../../utils/utils';
import {
  DEFAULT,
  DashboardSFUpDATE,
  SEARCH as SEARCH_CONSTANTS
} from '../../constants/app';
import isPriceModelerQuestion from '../../utils/isPriceModelerQuestion';
import { fetchAllApprovals } from './approval-actions';
import { SEARCH, UI, UNITY_TABS } from '../../constants/types';
import { doSearchAction } from './search-actions';
import { selectQuery } from '../selectors/search';
import { selectFavourites, selectCustomNameMap } from '../selectors/sso-auth';
import featureFlags from '../../constants/featureFlags';
import proposal from '../reducers/proposal';
import { selectOpportunitiesList } from '../selectors/opportunities';
import { setOpportunities } from './opportunities';

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
  CHANGE_BID_STATUS_OPERATION,
  NEW_BID_CREATED,
  UPDATE_LOOKUP_OPTIONS,
  BOX_ADDITIONAL_LINK,
  BOX_OPPORTUNITY_FOLDER_ID,
  BOX_ADDITIONAL_LINK_ERROR,
  SWITCH_TEMP_STATUS,
  SWITCH_TEMP_IN_PROGRESS,
  RESET_PROPOSALID,
  QUESTION_LOCK_BY_USER,
  QUESTION_UNLOCK_BY_USER,
  QUESTION_LOCK_DETAILS_ALL,
  UPDATE_PROPOSAL_DETAIL_SF,
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
  SET_UNITY_TAB_QUESTION_LOADING,
  SET_PRICE_MODELER_RECALCULATING,
  PRICE_MODELER_UPDATE,
  SET_ACTIVE_TABINDEX,
  SET_PANEL_STATUS,
  SET_V_TAB_ACTIVE_INDEX,
  SET_V_TAB_USER_PREFERENCE,
  WIDGET_UPDATE,
  TOGGLE_FAVOURITE,
  SET_CUSTOM_NAME,
  SET_NEXT_MILESTONE,
  SET_EDIT_OPP_INFO,
  CLEAR_EDIT_OPP_INFO,
  TOGGLE_EDIT_CUSTOM_NAME_MODAL,
  DASHBOARD_PROPOSAL_DETAIL,
  UPDATE_DASHBOARD_OPPORTUNITY,
  CHANGE_BID_LOADER
} = REDUX_TYPES.PROPOSAL;

const { ON_GET_PROPOSALS, ON_GET_FAVOURITE } = REDUX_TYPES.PROPOSALS;
const { SET_CUSTOM_NAME_MAP } = REDUX_TYPES.SSO_AUTH;
const {
  SET_APPROVAL_QUESTION_APPROVALS_TAB,
  UPDATE_APPROVAL_QUESTION_CUSTOM_TAB,
  DELETE_APPROVAL_QUESTION_CUSTOM_TAB
} = REDUX_TYPES.APPROVALS;
/**
 * Updates bidNo Query param without page reload
 */
export const updateBidNoQueryparam = bidNo => {
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

export const updateBidTypeQueryparam = bidNo => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('bidType', bidNo);
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
      dispatch({
        type: PROPOSAL_INFO,
        payload: {
          ...data,
          milestones
        }
      });

      return data;
    } catch (err) {
      dispatch({
        type: PROPOSAL_INFO_ERROR,
        payload: err
      });
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
// commented unused code
// export const getBidCostData = proposalId => {
//   return async (dispatch: Dispatch<string, Object>) => {
//     try {
//       const response = await bidCostApi(proposalId);
//       dispatch({ type: SET_BID_COST_DATA_FIELDS, payload: response.data });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

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

export const setUnityTabQuestionLoading = (questionId, value) => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      dispatch({
        type: SET_UNITY_TAB_QUESTION_LOADING,
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
  return async (dispatch, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    try {
      if (!isEmpty(costUpdate)) {
        if (selectedBid?.id === costUpdate?.ProposalId) {
          dispatch({ type: PRICE_MODELER_UPDATE, payload: costUpdate });
        }
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
  disableLoader = false,
  cfProposalId = null
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    dispatch(setApprovalQuestionLoading(questionId, true));
    dispatch(setUnityTabQuestionLoading(questionId, true));
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
        editorData,
        cfProposalId
      );
      if (data) {
        // Check is price modeler question
        const allQuestions = selectProposalQuestions(getState());
        if (isPriceModelerQuestion(questionId, allQuestions)) {
          await getPriceModelerData(proposalId)(dispatch);
        }
        await socketContext?.questionAnswerUpdateWrapper(
          questionId,
          data,
          proposalId
        );
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
        dispatch(setUnityTabQuestionLoading(questionId, false));
        return { success: true };
      }
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
    }
  };
};

export const setProposalAnswerDatafromSocket = (
  questionId: string,
  data: any,
  proposalId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
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
    }
  };
};
// commented unused code
// export const setProposalQuestionfromSocket = (
//   questionId: string,
//   data: any
// ): ThunkAction<string, Object> => {
//   return async (dispatch: Dispatch<string, Object>, getState) => {
//     dispatch({
//       type: PROPOSAL_ANSWER_LOADING,
//       payload: { questionId, loading: true }
//     });
//     const questionsFilter = getQuestionsFilters(getState());

//     try {
//       dispatch({
//         type: PROPOSAL_ANSWER,
//         payload: {
//           data: Array.isArray(data.answers) ? data.answers : data,
//           questionId,
//           hasDifferentSFanswer: data.hasDifferentSFanswer || false
//         }
//       });

//       const { modifiedQuestions } = data;
//       if (!isEmpty(modifiedQuestions)) {
//         modifiedQuestions.forEach(question => {
//           dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
//         });
//       }
//       dispatch(onQuestionsFilterApplied(questionsFilter));
//       dispatch({
//         type: PROPOSAL_ANSWER_LOADING,
//         payload: { questionId, loading: false }
//       });
//     } catch (err) {
//       console.log('error occurred ', err);
//       dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
//     }
//   };
// };

export const updateAnswerFromWebSocket = (
  data = {}
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const { questionId, proposalId } = data;
    let questionsFilter = getQuestionsFilters(getState());
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
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
        console.log('Error in updating answer from WS', err);
      }
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
      if (socketContext)
        await socketContext?.addQuestionWrapper(data, proposalId);
      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const setProposalQuestionFromSocket = (
  questionData: Object,
  proposalId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
      dispatch({
        type: PROPOSAL_SET_QUESTION_LOADING,
        payload: {}
      });
      try {
        dispatch({ type: PROPOSAL_SET_QUESTION, payload: questionData });
        if (questionData && questionData?.section?.tabID) {
          dispatch({
            type: UNITY_TABS.SET_CUSTOM_QUESTION_CUSTOM_TAB,
            payload: questionData
          });
        }
        if (questionData && questionData?.section?.approvalSectionName) {
          dispatch({
            type: SET_APPROVAL_QUESTION_APPROVALS_TAB,
            payload: questionData
          });
        }
      } catch (err) {
        dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
      }
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

export const updateProposalDetailFromWebSocket = (
  data
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    try {
      const mapper = DashboardSFUpDATE;
      let opportunities = selectOpportunitiesList(getState());
      if (data && data?.data && data?.data?.questionSfField && opportunities) {
        opportunities = opportunities.map(value => {
          if (
            data &&
            data?.data &&
            data?.data?.proposalId === value['proposalId']
          ) {
            if (
              data?.data?.questionSfField === 'Name' &&
              data?.data?.questionsfObject === 'Opportunity'
            ) {
              value['opportunityName'] = data.data.answer;
            } else {
              value[mapper[data?.data?.questionSfField]] = data.data.answer;
            }
          }
          return value;
        });
      }

      if (
        opportunities &&
        data &&
        data?.data &&
        data?.data?.bidStatusKey &&
        data?.data?.proposalDetails
      ) {
        opportunities = opportunities.map(value => {
          if (
            data &&
            data?.data &&
            data?.data?.proposalId === value['proposalId']
          ) {
            value['bidStopStatus'] = data.data.bidStopStatus || '';
          }
          return value;
        });
      }

      dispatch(setOpportunities(opportunities));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({
        type: UPDATE_PROPOSAL_DETAIL_SF,
        payload: data
      });
    }
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

export const getOpportunityFolderId = (
  oppID: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const { data: folderId } = await fetchOpportunityFolderLink(oppID);
      dispatch({ type: BOX_OPPORTUNITY_FOLDER_ID, payload: { folderId } });
    } catch (error) {
      console.error(error);
      dispatch({ type: BOX_OPPORTUNITY_FOLDER_ID, payload: { folderId: '' } });
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

function applyMyUserRoleFilter(questions, flags) {
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

function applyUnAnsweredFilter(questions, flags) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(val => {
        // if statement type question than dont filter
        if (val.get('answerConfiguration').get('type') === 'statement')
          return true;

        let Answer = val.get('answers', []);
        Answer = Answer.toJS();
        if (flags['carryForwardAnswerFlag']) {
          return (
            (Answer &&
              Answer.length &&
              (!Boolean(
                String(Answer[Answer.length - 1].answer).trim().length
              ) ||
                Answer[Answer.length - 1].userName === 'UnityPredictedAnswer' ||
                Answer[Answer.length - 1].userName === 'CarryForwardAnswer')) ||
            !Boolean(Answer.length)
          );
        } else {
          return (
            (Answer &&
              Answer.length &&
              (!Boolean(
                String(Answer[Answer.length - 1].answer).trim().length
              ) ||
                Answer[Answer.length - 1].userName ===
                  'UnityPredictedAnswer')) ||
            !Boolean(Answer.length)
          );
        }
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyVerificationRequiredFilter(questions, flags) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(val => {
        // if statement type question than dont filter
        if (val.get('answerConfiguration').get('type') === 'statement')
          return true;

        let Answer = val.get('answers', []);
        Answer = Answer.toJS();
        if (flags['carryForwardAnswerFlag']) {
          return (
            ((Answer &&
              Answer.length &&
              Answer[Answer.length - 1].userName === 'UnityPredictedAnswer') ||
              (Answer &&
                Answer.length &&
                Answer[Answer.length - 1].userName === 'CarryForwardAnswer')) &&
            !(
              (Answer &&
                Answer.length &&
                !Boolean(
                  String(Answer[Answer.length - 1].answer).trim().length
                )) ||
              !Boolean(Answer.length)
            )
          );
        } else {
          return (
            Answer &&
            Answer.length &&
            Answer[Answer.length - 1].userName === 'UnityPredictedAnswer'
          );
        }
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyAnsweredFilter(questions, flags) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        // if statement type question than dont filter
        if (question.get('answerConfiguration').get('type') === 'statement')
          return true;

        let Answer = question.get('answers', []);
        Answer = Answer.toJS();
        if (flags['carryForwardAnswerFlag']) {
          return (
            Answer &&
            Answer.length &&
            String(Answer[Answer.length - 1].answer).trim().length > 0 &&
            Answer[Answer.length - 1].userName !== 'UnityPredictedAnswer' &&
            Answer[Answer.length - 1].userName !== 'CarryForwardAnswer'
          );
        } else {
          return (
            Answer &&
            Answer.length &&
            String(Answer[Answer.length - 1].answer).trim().length > 0 &&
            Answer[Answer.length - 1].userName !== 'UnityPredictedAnswer'
          );
        }
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyInterestedPartyFilter(questions, flags) {
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

function applyShowInactiveQuestionsFilter(questions, flags) {
  return questions;
}

function applyMilestoneFilter(questions, flags, milestone) {
  let filteredQuestions = cloneDeep(questions);
  if (milestone) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const questionMilestone = question.get('milestoneNew').toJS();
        return questionMilestone
          .map(milestone => milestone.Name)
          .includes(milestone);
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
  flags = {},
  filterName = ''
) {
  if (logic === 'AND') {
    return uniqBy(filterCallback(allQuestions, flags), 'questionId');
  }
  return uniqBy(
    [...filteredQuestions, ...filterCallback(allQuestions, flags, filterName)],
    'questionId'
  );
}

export function getQuestionsFilterApplied(
  questionsArr,
  questionsFilter,
  flags
) {
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
            applyMyUserRoleFilter,
            flags
          );
          break;
        case 'answered':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyAnsweredFilter,
            flags
          );
          break;
        case 'unanswered':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyUnAnsweredFilter,
            flags
          );
          break;
        case 'verificationRequired':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyVerificationRequiredFilter,
            flags
          );
        case 'interestedParty':
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyInterestedPartyFilter,
            flags
          );
          break;
        default:
          withinGroupFilteredQuestions = filterGroup(
            withinGroupFilteredQuestions,
            filteredQuestions,
            logic,
            applyMilestoneFilter,
            flags,
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
    const searchQuery = selectQuery(getState());
    const flags = state.proposal.get('eventflag');
    dispatch({
      type: ON_APPLY_QUESTIONS_FILTER,
      payload: { questionsFilter }
    });
    let filteredQuestions = cloneDeep(selectProposalQuestions(state));
    let naFilterChecked = false;

    questionsFilter.entrySeq().forEach(([groupName, group]) => {
      let withinGroupFilteredQuestions = [];
      // Set the logic for current filter Group
      const logic = group.get('logic');
      let considerGroup = false;

      group.entrySeq().forEach(([filterName, filter]) => {
        // Do not process for logic key or the filter is not checked
        if (filterName === 'logic' || !filter.get('checked')) return;
        considerGroup = true;
        if (filterName === 'showInactiveQuestions') {
          naFilterChecked = true;
        }

        switch (filterName) {
          case 'myUserRole':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMyUserRoleFilter,
              flags
            );
            break;
          case 'answered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyAnsweredFilter,
              flags
            );
            break;
          case 'unanswered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyUnAnsweredFilter,
              flags
            );
            break;
          case 'verificationRequired':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyVerificationRequiredFilter,
              flags
            );
            break;
          case 'interestedParty':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyInterestedPartyFilter,
              flags
            );
            break;
          case 'showInactiveQuestions':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyShowInactiveQuestionsFilter,
              flags
            );
            break;
          default:
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMilestoneFilter,
              flags,
              filterName
            );
            break;
        }
      });

      if (considerGroup) filteredQuestions = withinGroupFilteredQuestions;

      considerGroup = false;
    });

    if (!naFilterChecked) {
      filteredQuestions = filteredQuestions.filter(obj => !obj?.notApplicable);
    }

    dispatch({
      type: ON_QUESTIONS_FILTERED,
      payload: { filteredQuestions }
    });

    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
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

      if (socketContext)
        await socketContext?.questionTextUpdateWrapper(data, proposalId);
      dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const editProposalQuestionfromSocket = (
  questionData: Object,
  proposalId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
      dispatch({
        type: PROPOSAL_SET_QUESTION_LOADING,
        payload: {}
      });
      try {
        const data = questionData;
        dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });
        if (data && data?.section?.tabID) {
          dispatch({
            type: UNITY_TABS.UPDATE_CUSTOM_QUESTION_CUSTOM_TAB,
            payload: data
          });
        }
        if (data && data?.section?.approvalSectionName) {
          dispatch({
            type: UPDATE_APPROVAL_QUESTION_CUSTOM_TAB,
            payload: data
          });
        }
      } catch (err) {
        dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
      }
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

export const deleteProposalCustomTabQuestionFromSocket = (
  questionId: string,
  sectionName,
  tabId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      dispatch({ type: PROPOSAL_DELETE_QUESTION, payload: questionId });
      dispatch({
        type: UNITY_TABS.DELETE_CUSTOM_QUESTION_CUSTOM_TAB,
        payload: {
          questionId: questionId,
          approvalSectionName: sectionName,
          sectionName: tabId
        }
      });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const deleteApprovalCustomTabCustomQuestionFromSocketAction = (
  questionId: string,
  sectionName,
  approvalSectionName
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      dispatch({ type: PROPOSAL_DELETE_QUESTION, payload: questionId });
      dispatch({
        type: DELETE_APPROVAL_QUESTION_CUSTOM_TAB,
        payload: {
          questionId: questionId,
          approvalSectionName: approvalSectionName
        }
      });
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

const mockGet = url => {
  return new Promise(resolve => {
    const dummyData = {
      data: {
        isCurrent: true,
        proposal: {
          proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
          accountId: '0017A000011TxCVQA0',
          opportunityName: 'DevTestOpp4',
          agreementId: 'aNMKS00000001ze4AA',
          agreementName: 'DevTestOpp4',
          proposalDate: '2024-03-28T08:29:59.606Z',
          proposalDetails: {
            Customer: 'SushilDevOpp_5',
            'CRM #': 'JAB53264',
            'Bid due date': '2024-04-24T00:00:00.000Z',
            'Line of business': 'Clinical',
            'Is this IQVIA Biotech': 'No',
            Phase: 'Phase 4',
            'Verbatim indication': 'N/A',
            'Therapeutic area': 'Cardiovascular',
            'Protocol number': '',
            'Product name': 'Asset agnostic',
            IsFsp: 'No',
            opportunityId: '0067A00000E94jiQAB',
            BoxId: '',
            pertinentDetails: null,
            earlyEngagementDevelopmentPlan: '',
            typeOfActivity: '',
            describeActivity: '',
            requestDetail: 'wadawd',
            bidNo: 7,
            bidType: 'Bid RFI_Request'
          },
          opportunityOverview: {
            'Opportunity Overview-H8Z': 'Neuro orthostatic hypotension',
            'Opportunity Overview-N9U': 'Biosimilar',
            'Opportunity Overview-H1X': '',
            'Opportunity Overview-Z4X': '',
            'Opportunity Overview-J7C': '',
            OpportunityStatus: '6. Received ATP/LOI'
          },
          active: true,
          bidType: 'RFI_Request',
          recordTypeId: '0122K000000sKxNQAU',
          opportunityTypeLogic:
            '[{"fieldName":"Non-Core Clinical Studies","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["lkjk"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["lkj"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Core Opportunity Launch Call (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Core Opportunity Launch Call (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Ballpark OT","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"IQB Template OT","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["Yes"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"PILOT - DO NOT USE: PROGRAMS","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Verbatim_Indication_Term__c","Sub group":""},"fieldValue":["hello"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
          opportunityType: 'Default Type',
          questionTemplateVersionNumber: 'v2024.182',
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
                'Proposal Team-O0Z',
                'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
                '722f9c3c-5538-4b64-bda5-76604d61da46',
                'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
                '3106acc8-d688-465f-907c-13d890870b43',
                '8d41dd0f-3140-412c-9fd8-a17116d30800'
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
                'Core Information-B4S',
                'e7cd61ae-1b11-4987-8b62-e482bd3fcf84'
              ],
              ApprovalSectionId: '44439c34-aff1-484b-b324-47918a9e0dcc',
              ApprovalSectionOrder: 17,
              ApprovalSectionLeftQuestions: [
                'Award Timelines-Y8U',
                'Key Budget Specs-AB1',
                'b4737fd2-9d1c-4ba9-bd02-b75cfcfbcb4a',
                '3f6a57a9-940b-4c55-85c8-595bf5971419'
              ]
            },
            {
              ApprovalSectionTitle: 'TestCRMEE Approval',
              ApprovalSectionRightQuestions: [
                '6939d6ed-4590-4e35-90a9-ebfb89d52f75',
                '86ab41b4-8451-4e6c-93c6-b6b09aa47bac',
                '969ac244-5781-49ae-ad02-e157f5b06a3e',
                '6cede2a3-1c76-4d64-a15b-1ec2eb5568dd'
              ],
              ApprovalSectionId: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f',
              ApprovalSectionOrder: 18,
              ApprovalSectionLeftQuestions: [
                'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
                '091831ad-3dd6-4e54-a1b1-a39ce5717431',
                '722f9c3c-5538-4b64-bda5-76604d61da46',
                '2185e87c-65c6-4bb4-ab2f-3e24bdd829d3'
              ]
            },
            {
              ApprovalSectionTitle: 'cfa in approval',
              ApprovalSectionRightQuestions: [
                'b2666348-f074-4602-bc12-2b4f8cea6d36'
              ],
              ApprovalSectionId: '9d6fa247-850f-48ca-93e0-a18a1fbb8f13',
              ApprovalSectionOrder: 19,
              ApprovalSectionLeftQuestions: [
                '76012432-3240-41f1-8d7a-e55d69bc28fe',
                '820d72e5-196f-465b-9a5e-f7abb2d99c11',
                '2f00d728-e78c-4e4c-b7aa-616c987e7c9c'
              ]
            }
          ],
          approvalsCount: 16,
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
                '9b3ef652-3cae-4681-8cd2-5c682bb7e0e7',
                'ec1ef246-0783-4ece-8d3e-39c1d809e1c9'
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
              UnityTabSectionTitle: 'TestCRMEE Custom',
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
                'Opportunity Overview-H1X'
              ],
              UnityTabSectionTitle: 'Hellooo',
              TabID: '04bb872c-9d48-4514-be16-fba5eb7fd789',
              UnityTabOrder: 3,
              UnityTabId: '04bb872c-9d48-4514-be16-fba5eb7fd789',
              UnityTabTitle: 'tesqacs34567'
            },
            {
              UnityTabSectionOrder: 6,
              UnityTabSectionId: 'a00843cf-72ec-4e5c-85cf-67cd89638a2e',
              UnityTabSectionQuestions: [
                '76012432-3240-41f1-8d7a-e55d69bc28fe',
                '820d72e5-196f-465b-9a5e-f7abb2d99c11',
                'b2666348-f074-4602-bc12-2b4f8cea6d36',
                '2f00d728-e78c-4e4c-b7aa-616c987e7c9c'
              ],
              UnityTabSectionTitle: 'cfa custom tab',
              TabID: '943b8c70-1e90-4319-b5fa-728221d1a940',
              UnityTabOrder: 2,
              UnityTabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
              UnityTabTitle: 'new custom tab1'
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
                'Opportunity Overview-Z4X'
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
          bidStopStatus: false
        },

        proposalQuestions: [
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
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
            bidType: 'RFI_Request'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: '4e6e62c8-9e14-4f63-b3cf-96d2332d8476',
            section: {
              sectionOrder: 6,
              sectionName: 'Win Strategy'
            },
            questionText: 'Key solution through delivery strategy',
            answerConfiguration: {
              type: 'text',
              options: []
            },
            roleNames: ['Proposal Developer'],
            answers: [],
            questionOrder: 4,
            visible: true,
            locked: false,
            sfObject: 'n/a',
            sfField: 'n/a',
            milestoneNew: [
              {
                Name: 'Text',
                Color: '#830065'
              }
            ],
            interestedParties:
              'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
            opportunityType: 'Default Type,Non-Core Clinical Studies',
            questionHint:
              'Must directly relate to the hot button and/or serious study challenge identified above.',
            hasDifferentSFanswer: false,
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"pkac7","text":"Key solution through delivery strategy","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="9871p" data-offset-key="pkac7-0-0"><div data-offset-key="pkac7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="pkac7-0-0"><span data-text="true">Key solution through delivery strategy</span></span></div></div></div>',
            questionHintJSON:
              '{"blocks":[{"key":"gwj93","text":"Must directly relate to the hot button and/or serious study challenge identified above.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHintHTML:
              '<div data-contents="true"><div data-block="true" data-editor="cquf1" data-offset-key="gwj93-0-0"><div data-offset-key="gwj93-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="gwj93-0-0"><span data-text="true">Must directly relate to the hot button and/or serious study challenge identified above.</span></span></div></div></div>',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: null,
            bidType: 'RFI_Request'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: '4e6e62c8-9e14-4f63-b3cf-96d2332d8476',
            section: {
              sectionOrder: 6,
              sectionName: 'Win Strategy'
            },
            questionText: 'Key solution through delivery strategy',
            answerConfiguration: {
              type: 'contact',
              options: []
            },
            roleNames: ['Proposal Developer'],
            answers: [],
            questionOrder: 4,
            visible: true,
            locked: false,
            sfObject: 'n/a',
            sfField: 'n/a',
            milestoneNew: [
              {
                Name: 'Text',
                Color: '#830065'
              }
            ],
            interestedParties:
              'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
            opportunityType: 'Default Type,Non-Core Clinical Studies',
            questionHint:
              'Must directly relate to the hot button and/or serious study challenge identified above.',
            hasDifferentSFanswer: false,
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"pkac7","text":"Key solution through delivery strategy","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="9871p" data-offset-key="pkac7-0-0"><div data-offset-key="pkac7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="pkac7-0-0"><span data-text="true">Key solution through delivery strategy</span></span></div></div></div>',
            questionHintJSON:
              '{"blocks":[{"key":"gwj93","text":"Must directly relate to the hot button and/or serious study challenge identified above.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHintHTML:
              '<div data-contents="true"><div data-block="true" data-editor="cquf1" data-offset-key="gwj93-0-0"><div data-offset-key="gwj93-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="gwj93-0-0"><span data-text="true">Must directly relate to the hot button and/or serious study challenge identified above.</span></span></div></div></div>',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: null,
            bidType: 'RFI_Request'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5f5',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'Global Analytics Strategic',
            answerConfiguration: {
              type: 'text',
              options: []
            },
            roleNames: ['Global Analytics'],
            answers: [
              {
                proposalId: 'e7071fa9-a5e3-4708-bc52-211e6c0f6c5b',
                questionId: 'd7f00e27-409d-4220-af5d-a015f189a5f5',
                answer: 'Sushil Munda(sushil.munda@iqvia.com)',
                formattedAnswer: null,
                date: '2024-02-24T07:35:10.334Z',
                user: 'sushil.munda@iqvia.com',
                userName: 'Sushil Munda',
                userRole: 'Bid Grid Analyst',
                created_by: '1138123',
                updated_by: '1138123',
                created_date: '2024-02-24T07:35:11.736Z',
                updated_date: '2024-02-24T07:35:11.736Z',
                updatedInPG: true,
                cfProposalId: null
              },
              {
                proposalId: 'e7071fa9-a5e3-4708-bc52-211e6c0f6c5b',
                questionId: 'd7f00e27-409d-4220-af5d-a015f189a5f5',
                answer:
                  'Sushil Munda(sushil.munda@iqvia.com),Varsha Kumari(varsha.kumari2@iqvia.com)',
                formattedAnswer: null,
                date: '2024-02-24T10:12:58.003Z',
                user: 'sushil.munda@iqvia.com',
                userName: 'Sushil Munda',
                userRole: 'Bid Grid Analyst',
                created_by: '1138123',
                updated_by: '1138123',
                created_date: '2024-02-24T10:12:59.497Z',
                updated_date: '2024-02-24T10:12:59.497Z',
                updatedInPG: true,
                cfProposalId: null
              },
              {
                user: 'CarryForwardAnswer',
                userName: 'CarryForwardAnswer',
                userRole: 'CarryForwardAnswer',
                date: '2024-04-04T11:20:44.668Z',
                answer:
                  'Sushil Munda(sushil.munda@iqvia.com),Varsha Kumari(varsha.kumari2@iqvia.com)',
                formattedAnswer: 'null',
                proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
                updatedInPG: false,
                cfProposalId: 'e7071fa9-a5e3-4708-bc52-211e6c0f6c5b'
              }
            ],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5f6',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'Date type ques',
            answerConfiguration: {
              type: 'date',
              options: []
            },
            roleNames: ['Global Analytics'],
            answers: [],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: '598e63b3-c9ab-4740-9a28-3cd7d65eefad',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'Contact type',
            answerConfiguration: {
              type: 'contact',
              options: []
            },
            roleNames: ['Clinical Coder', 'Proposal Developer'],
            answers: [],
            questionOrder: 12,
            visible: true,
            locked: false,
            sfObject: 'n/a',
            sfField: 'n/a',
            milestoneNew: [
              {
                Name: 'Team',
                Color: '#595959'
              }
            ],
            interestedParties:
              'Business Developer,Clinical Coder,Therapeutic Analytics Lead,Therapeutic Strategy Lead,Proposal Developer,Global Site Activation (GSA),Clinical DS&B,Site Analytics,Medical Strategy Lead,Project Lead,Global Analytics',
            opportunityType:
              'Default Type,Core Opportunity Launch Call (AMR/EMEA)',
            questionHint: 'tooltip extra',
            hasDifferentSFanswer: false,
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"8765o","text":"Clinical Coder","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="faslr" data-offset-key="8765o-0-0"><div data-offset-key="8765o-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8765o-0-0"><span data-text="true">Clinical Coder</span></span></div></div></div>',
            questionHintJSON:
              '{"blocks":[{"key":"7aa4i","text":"tooltip extra","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHintHTML:
              '<div data-contents="true"><div data-block="true" data-editor="3trqk" data-offset-key="7aa4i-0-0"><div data-offset-key="7aa4i-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7aa4i-0-0"><span data-text="true">tooltip extra</span></span></div></div></div>',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: null,
            bidType: 'RFI_Request'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5f6',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'yes-no type',
            answerConfiguration: {
              type: 'select',
              options: ['Yes', 'No']
            },
            roleNames: ['Global Analytics'],
            answers: [],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5j8',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'select lookup type',
            answerConfiguration: {
              type: 'select-lookup',
              options: []
            },
            roleNames: ['Global Analytics'],
            answers: [],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5d5',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'select type',
            answerConfiguration: {
              type: 'select',
              options: [
                'Not part of a program',
                'Yes - lead opportunity',
                'Yes - not the lead'
              ]
            },
            roleNames: ['Global Analytics'],
            answers: [],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5k5',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'radio type',
            answerConfiguration: {
              type: 'radio',
              options: ['Approval', 'Provisional approval', 'Not approved']
            },
            roleNames: ['Global Analytics'],
            answers: [],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'd7f00e27-409d-4220-af5d-a015f189a5d2',
            section: {
              sectionOrder: 1,
              sectionName: 'Proposal Team'
            },
            questionText: 'table type',
            answerConfiguration: {
              type: 'table',
              options: []
            },
            roleNames: ['Global Analytics'],
            answers: [
              {
                userRole: 'Therapeutic Strategy Lead',
                questionId: '3bf32bea-d703-4e31-b68b-97d1c93edf45',
                created_date: '2024-01-11T06:57:24.557Z',
                user: 'sushil.munda@iqvia.com',
                proposalId: 'ab29a661-d97f-4c28-8d00-8d745bbd7cb9',
                created_by: '1138123',
                date: '2024-01-11T06:57:23.119Z',
                cfProposalId: null,
                updated_date: '2024-01-11T06:57:24.557Z',
                userName: 'Sushil Munda',
                updatedInPG: true,
                formattedAnswer: null,
                updated_by: '1138123',
                answer:
                  '{"rows":[{"column 1":"","header":"row 1","rowId":0,"canEdit":true}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false,"canEdit":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"column 1"}]}'
              },
              {
                userRole: 'Therapeutic Strategy Lead',
                questionId: '3bf32bea-d703-4e31-b68b-97d1c93edf45',
                created_date: '2024-01-12T10:43:04.535Z',
                user: 'sushil.munda@iqvia.com',
                proposalId: 'ab29a661-d97f-4c28-8d00-8d745bbd7cb9',
                created_by: '1138123',
                date: '2024-01-12T10:43:03.118Z',
                cfProposalId: null,
                updated_date: '2024-01-12T10:43:04.535Z',
                userName: 'Sushil Munda',
                updatedInPG: true,
                formattedAnswer: null,
                updated_by: '1138123',
                answer:
                  '{"rows":[{"column 1":"","header":"row 1","rowId":0,"canEdit":true}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false,"canEdit":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"column 1"}]}'
              },
              {
                userRole: 'Therapeutic Strategy Lead',
                questionId: '3bf32bea-d703-4e31-b68b-97d1c93edf45',
                created_date: '2024-01-12T10:44:46.700Z',
                user: 'sushil.munda@iqvia.com',
                proposalId: 'ab29a661-d97f-4c28-8d00-8d745bbd7cb9',
                created_by: '1138123',
                date: '2024-01-12T10:44:45.339Z',
                cfProposalId: null,
                updated_date: '2024-01-12T10:44:46.700Z',
                userName: 'Sushil Munda',
                updatedInPG: true,
                formattedAnswer: null,
                updated_by: '1138123',
                answer:
                  '{"rows":[{"column 1":"","header":"row 1","rowId":0,"canEdit":true}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false,"canEdit":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"column 1"}]}'
              },
              {
                userRole: 'CarryForwardAnswer',
                user: 'CarryForwardAnswer',
                proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
                date: '2024-04-04T11:20:44.665Z',
                cfProposalId: 'ab29a661-d97f-4c28-8d00-8d745bbd7cb9',
                userName: 'CarryForwardAnswer',
                updatedInPG: false,
                formattedAnswer: 'null',
                answer:
                  '{"rows":[{"column 1":"","header":"row 1","rowId":0,"canEdit":true}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false,"canEdit":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"column 1"}]}'
              }
            ],
            questionOrder: 33,
            visible: true,
            locked: false,
            sfObject: 'pse__Resource_Request__c',
            sfField: 'pse__Staffer_Resource__c',
            developerUsageComments: "AND SubGroup__c = 'Global Analytics'",
            milestoneNew: [],
            opportunityType:
              'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
            hasDifferentSFanswer: true,
            currentSFanswer: {
              value: '',
              time: '2024-04-04T11:20:25.372Z'
            },
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"aljlr","text":"Global Analytics Strategic","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="702lo" data-offset-key="aljlr-0-0"><div data-offset-key="aljlr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aljlr-0-0"><span data-text="true">Global Analytics Strategic</span></span></div></div></div>',
            questionHintJSON: '',
            questionHintHTML: '',
            active: true,
            integration: '',
            events: '',
            notApplicable: false,
            questionApproval: false,
            bidAnswerCopy: true,
            questionTableConfig: '{}',
            latestAnsweredBidNo: 1,
            bidType: 'Clinical_Bid'
          },
          {
            proposalId: 'e3b9a633-b645-4222-bc5f-df183defd277',
            questionId: 'Win Strategy-AB9',
            section: {
              sectionOrder: 6,
              sectionName: 'Win Strategy'
            },
            questionText:
              'Are there any learnings from our history with this customer that would impact our strategy? If so, what?',
            answerConfiguration: {
              type: 'contact',
              options: []
            },
            roleNames: ['Proposal Developer'],
            answers: [],
            questionOrder: 7,
            visible: true,
            locked: false,
            sfObject: 'n/a',
            sfField: 'n/a',
            milestoneNew: [
              {
                Name: 'Text',
                Color: '#830065'
              }
            ],
            interestedParties:
              'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Proposal Developer,Project Lead,Therapeutic Strategy Lead,Global Site Activation (GSA),Site Analytics,Global Analytics,Clinical Coder',
            opportunityType:
              'Default Type,Core Opportunity Launch Call (AMR/EMEA),Non-Core Clinical Studies',
            questionHint:
              'Do we need to reach out to ops teams for lessons learned on related previous or ongoing studies?  Who is the best person to contact for this?  What are CRMs of related studies? Note: The information entered here can be pulled into the Challenge Call template in Qvidian for AMR/EMEA studies. ',
            hasDifferentSFanswer: false,
            isCustomQuestion: false,
            questionJSON:
              '{"blocks":[{"key":"o843c","text":"Are there any learnings from our history with this customer that would impact our strategy? If so, what?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHTML:
              '<div data-contents="true"><div data-block="true" data-editor="hwlvh" data-offset-key="o843c-0-0"><div data-offset-key="o843c-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="o843c-0-0"><span data-text="true">Are there any learnings from our history with this customer that would impact our strategy? If so, what?</span></span></div></div></div>',
            questionHintJSON:
              '{"blocks":[{"key":"33pa6","text":"Do we need to reach out to ops teams for lessons learned on related previous or ongoing studies? ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"78jdc","text":"Who is the best person to contact for this? ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"81cb4","text":"What are CRMs of related studies?","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3km4b","text":"Note: The information entered here can be pulled into the Challenge Call template in Qvidian for AMR/EMEA studies. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":114,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
            questionHintHTML:
              '<div data-contents="true"><ul class="public-DraftStyleDefault-ul" data-offset-key="33pa6-0-0"><li class="public-DraftStyleDefault-unorderedListItem public-DraftStyleDefault-reset public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="fqc32" data-offset-key="33pa6-0-0"><div data-offset-key="33pa6-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="33pa6-0-0"><span data-text="true">Do we need to reach out to ops teams for lessons learned on related previous or ongoing studies? </span></span></div></li><li class="public-DraftStyleDefault-unorderedListItem public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="fqc32" data-offset-key="78jdc-0-0"><div data-offset-key="78jdc-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="78jdc-0-0"><span data-text="true">Who is the best person to contact for this? </span></span></div></li><li class="public-DraftStyleDefault-unorderedListItem public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="fqc32" data-offset-key="81cb4-0-0"><div data-offset-key="81cb4-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="81cb4-0-0"><span data-text="true">What are CRMs of related studies?</span></span></div></li></ul><div data-block="true" data-editor="fqc32" data-offset-key="3km4b-0-0"><div data-offset-key="3km4b-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="3km4b-0-0" style="font-style: italic;"><span data-text="true">Note: The information entered here can be pulled into the Challenge Call template in Qvidian for AMR/EMEA studies.</span></span><span data-offset-key="3km4b-0-1"><span data-text="true"> </span></span></div></div></div>',
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
        ],

        proposalUsers: [
          {
            userEmail: 'ankit.sharma3@iqvia.com',
            userName: 'Ankit Sharma',
            userId: '1115451'
          },
          {
            userEmail: 'cd sales',
            userId: ''
          },
          {
            userEmail: 'kunal.nigam@iqvia.com',
            userName: 'Kunal Nigam',
            userId: '1092584'
          },
          {
            userEmail: 'rahul.tiwari@iqvia.com',
            userName: 'RAHUL TIWARI',
            userId: '1095367'
          },
          {
            userEmail: 'sushil.munda@iqvia.com',
            userName: 'Sushil Munda',
            userId: '1138123'
          },
          {
            userEmail: 'vamsi.krishna5@iqvia.com',
            userName: 'Vamsi Krishna',
            userId: '1101790'
          },
          {
            userEmail: 'varsha.kumari2@iqvia.com',
            userName: 'Varsha Kumari',
            userId: '1106660'
          }
        ]
      }
    };
    resolve(dummyData);
  });
};

export const getOpportunity = (
  id: string,
  bidNumber,
  bidType = 'Clinical_Bid',
  history = null,
  flag = false
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const bidNo = parseInt(bidNumber);
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });
    let selectedProposalId;
    const flags = getfetchUserTagFlag(getState());
    const earlyEngagmentBidHistoryFlag =
      flags[featureFlags.EARLY_ENGAGEMENT_BID_HISTORY];
    const postAwardBidHistoryFlag = flags[featureFlags.POST_AWARD_BID_HISTORY];
    const rfiRequestFlag = flags[featureFlags.RFI_BID_HISTORY];
    try {
      let allProposals = await getAllProposals(id);
      if (earlyEngagmentBidHistoryFlag === false) {
        allProposals = allProposals.filter(
          proposal =>
            (proposal.proposal.bidType || 'Clinical_Bid') !==
            'Early_Engagement_Bid'
        );
        if (allProposals.length > 0) {
          allProposals[0].isCurrent = true;
        }
      }
      if (postAwardBidHistoryFlag === false) {
        allProposals = allProposals.filter(
          proposal =>
            (proposal.proposal.bidType || 'Clinical_Bid') !== 'Post_Award_Bid'
        );
        if (allProposals.length > 0) {
          allProposals[0].isCurrent = true;
        }
      }

      if (rfiRequestFlag === false) {
        allProposals = allProposals.filter(
          proposal =>
            (proposal.proposal.bidType || 'Clinical_Bid') !== 'RFI_Request'
        );
        if (allProposals.length > 0) {
          allProposals[0].isCurrent = true;
        }
      }

      const proposal = allProposals.find(
        thisProposal =>
          thisProposal.proposal.proposalDetails.bidNo === bidNo &&
          (thisProposal.proposal.bidType || 'Clinical_Bid') === bidType
      );
      const currentProposal = allProposals.find(
        thisProposal => thisProposal.isCurrent === true
      );
      if (proposal) {
        selectedProposalId = proposal.proposal.proposalId;
      } else if (currentProposal && history) {
        // navigate to current bid
        // replace URL with correct params
        history.replace(
          `${history.location.pathname}?bidNo=${
            currentProposal.proposal.proposalDetails.bidNo
          }&bidType=${currentProposal.proposal.bidType || 'Clinical_Bid'}`
        );
      }
      const proposalCount = allProposals.length;
      const urls = [];
      const proposalsData = [];
      for (let index = 0; index < proposalCount; index += 1) {
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
        currentProposal.proposal.proposalId === data[0].proposal.proposalId;
      if (data && data.length && data[0].proposal?.switchTemplateStatus) {
        dispatch(updateSwitchInProgress(true, data[0].proposal.proposalId));
        dispatch({
          type: SWITCH_TEMP_STATUS,
          payload: {
            data: 'progress',
            proposalId: data[0].proposal.proposalId
          }
        });
      }
      proposalsData.push(data[0]);
      dispatch({
        type: UNITY_TABS.SET_UNITY_TABS,
        payload: []
      });
      dispatch({ type: OPPORTUNITY_INFO, payload: proposalsData });
      dispatch({
        type: UNITY_TABS.SET_UNITY_TABS,
        payload: data[0]?.proposal?.customUnityTabs || []
      });
      dispatch({
        type: WIDGET_UPDATE,
        payload: {
          proposalId: data[0].proposal.proposalId,
          typeOfWidget: data[0]?.proposal?.typeOfWidget || ''
        }
      });
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
      const favourites = selectFavourites(getState()).toJS();
      const customNameMap = selectCustomNameMap(getState()).toJS();
      const favouritesMap = favourites.reduce((favMap, fav) => {
        favMap[fav] = true;
        return favMap;
      }, {});
      dispatch({
        type: TOGGLE_FAVOURITE,
        payload: favouritesMap[`${id}`]
      });
      dispatch({
        type: SET_CUSTOM_NAME,
        payload: customNameMap[`${id}`]
      });
      dispatch({
        type: SET_NEXT_MILESTONE,
        payload: data[0].proposal.nextMilestone || []
      });
    } catch (err) {
      console.log('error occurred ', err);
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
      dispatch({ type: NEW_BID_CREATED, payload: { flag: false } });
    }
  };
};

export const checkIsEditableTrue = (selectedBid, allProposals) => {
  const bidList = Object.groupBy(allProposals, item =>
    item.proposal.bidType ? item.proposal.bidType : 'Clinical_Bid'
  );
  const selectedBidType = selectedBid.bidType || 'Clinical_Bid';
  if (bidList[selectedBidType] && bidList[selectedBidType].length > 0) {
    if (
      bidList[selectedBidType][0].proposal.proposalDetails.bidNo ==
      selectedBid.bidNo
    ) {
      return true;
    } else return false;
  }
  return true;
};

export const resetProposalId = () => {
  return dispatch => dispatch({ type: RESET_PROPOSALID, payload: {} });
};

export const changeBid = (bid, viewType, callback) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (bid?.bidNo) {
    searchParams.set('bidNo', bid?.bidNo);
  }
  if (bid?.bidType) {
    searchParams.set('bidType', bid?.bidType);
  }
  if (viewType) {
    searchParams.set('viewType', viewType);
  } else {
    searchParams.delete('viewType');
  }
  const newRelativePathQuery = `${
    window.location.pathname
  }?${searchParams.toString()}`;
  // Update URL without pageload
  window.history.pushState(null, '', newRelativePathQuery);

  return async (dispatch, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    const OppoData = getOpportunityData(getState()).toJS();
    const allProposals = Object.values(OppoData);
    dispatch({ type: CHANGE_BID_LOADER, payload: true });
    if (selectedBid.bidName !== bid?.bidName) {
      dispatch({ type: SEARCH.SET_CLEAR_INPUT_FLAG });
    }
    dispatch({
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: []
    });
    dispatch({ type: UNITY_TABS.RESET_FILTERS });
    const response = await axios.get(`${PROPOSAL_API_URL}/${bid.bidId}`);
    dispatch({
      type: CHANGE_BID,
      payload: {
        proposalDetails: { ...response.data, isCurrent: bid.isCurrent },
        bid: {
          ...bid
        }
      }
    });
    if (response?.data && response?.data?.proposal?.switchTemplateStatus) {
      dispatch(updateSwitchInProgress(true, response.data.proposal.proposalId));
      dispatch({
        type: SWITCH_TEMP_STATUS,
        payload: {
          data: 'progress',
          proposalId: response.data.proposal.proposalId
        }
      });
    }
    dispatch({
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: response?.data.proposal?.customUnityTabs || []
    });
    dispatch({
      type: CHANGE_BID_STATUS_OPERATION,
      payload: true
    });
    dispatch(
      widgetUpdate(
        response?.data?.proposal?.proposalId,
        response?.data?.proposal?.typeOfWidget
      )
    );
    if (callback) {
      callback();
    }
  };
};

export const updateChangeBidStatusOperation = status => {
  return dispatch => {
    dispatch({
      type: CHANGE_BID_STATUS_OPERATION,
      payload: status
    });
  };
};

export const UpdateNewBid = bid => {
  if (window && window?.location?.search) {
    let bidNo = bid?.proposal?.proposalDetails?.bidNo;
    let bidType = bid?.proposal?.bidType || 'Clinical_Bid';
    updateBidNoQueryparam(bidNo);
    updateBidTypeQueryparam(bidType);
  }
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
export const updateSwitchTempStatusFromWebSocket = (data, proposalId) => {
  return async dispatch => {
    dispatch({
      type: SWITCH_TEMP_STATUS,
      payload: { data, proposalId }
    });
  };
};

export const updateDashboardProposal = (data): ThunkAction<string, Object> => {
  return async (dispatch, getState) => {
    try {
      const mapper = DashboardSFUpDATE;
      let opportunities = selectOpportunitiesList(getState());
      if (data && data?.data && data?.data?.questionSfField && opportunities) {
        opportunities = opportunities.map(value => {
          if (
            data &&
            data?.data &&
            data?.data?.proposalId === value['proposalId']
          ) {
            if (
              data?.data?.questionSfField === 'Name' &&
              data?.data?.questionsfObject === 'Opportunity'
            ) {
              value['opportunityName'] = data.data.answer;
            } else {
              value[mapper[data?.data?.questionSfField]] = data.data.answer;
            }
          }
          return value;
        });
      }

      if (
        opportunities &&
        data &&
        data?.data &&
        data?.data?.bidStatusKey &&
        data?.data?.proposalDetails
      ) {
        opportunities = opportunities.map(value => {
          if (
            data &&
            data?.data &&
            data?.data?.proposalId === value['proposalId']
          ) {
            value['bidStopStatus'] = data.data.bidStopStatus || '';
          }
          return value;
        });
      }

      dispatch(setOpportunities(opportunities));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({
        type: DASHBOARD_PROPOSAL_DETAIL,
        payload: data
      });
    }
  };
};

export const updateOpportunityDashboardProposal = (
  data
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    try {
      const state = getState();
      let opportunities = selectOpportunitiesList(state);

      if (
        opportunities &&
        Array.isArray(opportunities) &&
        opportunities.length &&
        !data?.data?.bidStatusKey
      ) {
        const opportunityIndex = opportunities.findIndex(
          opp => opp['opportunity number'] === data.oppId
        );
        if (opportunityIndex > -1) {
          opportunities[opportunityIndex]['bid due date'] =
            data.data.proposalDetails?.['Bid due date'] || '';
          opportunities[opportunityIndex]['verbatim indication'] =
            data.data.proposalDetails['Verbatim indication'] || '';
          opportunities[opportunityIndex]['therapeuticArea'] =
            data.data.proposalDetails?.['Therapeutic area'] || '';
          opportunities[opportunityIndex]['phase'] =
            data.data.proposalDetails['Phase'] || '';
          opportunities[opportunityIndex]['protocol number'] =
            data.data.proposalDetails?.['Protocol number'] || '';
          opportunities[opportunityIndex]['product'] =
            data.data.proposalDetails?.['Product name'] || '';
          opportunities[opportunityIndex]['customer'] =
            data.data.proposalDetails?.Customer || '';
          opportunities[opportunityIndex]['bidNo'] =
            data.data.proposalDetails?.bidNo || '';
          if (data.data.proposalDetails?.['opportunity status']) {
            opportunities[opportunityIndex]['opportunity status'] =
              data.data.proposalDetails?.['opportunity status'] || '';
          }
          if (data.data.proposalDetails?.['opportunityName']) {
            opportunities[opportunityIndex]['opportunityName'] =
              data.data.proposalDetails?.['opportunityName'] || '';
          }
          dispatch(setOpportunities(opportunities));
        }
      }
    } catch (e) {
      console.error('Error in updateDashboardBid action: ', e);
    } finally {
      dispatch({
        type: UPDATE_DASHBOARD_OPPORTUNITY,
        payload: data
      });
    }
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
 * commented unused code
 * Deactivate Proposal Loading - Action
 */
// export const deactivateProposalLoading = () => {
//   return async dispatch => {
//     dispatch({
//       type: PROPOSAL_INFO_ERROR,
//       payload: undefined
//     });
//   };
// };

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
export const updateSwitchInProgress = (status, proposalId) => {
  return async dispatch => {
    dispatch({
      type: SWITCH_TEMP_IN_PROGRESS,
      payload: { status, proposalId }
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

export const setPanelStatus = val => {
  return dispatch => {
    dispatch({
      type: SET_PANEL_STATUS,
      payload: val
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

export const setVTabUserPreferenceAction = (tabIndex, collapsed = false) => {
  return dispatch => {
    dispatch({
      type: SET_V_TAB_USER_PREFERENCE,
      payload: {
        tabIndex,
        collapsed
      }
    });
  };
};

export const widgetUpdate = (proposalId, typeOfWidget) => {
  return dispatch => {
    dispatch({
      type: WIDGET_UPDATE,
      payload: {
        proposalId,
        typeOfWidget
      }
    });
  };
};

export const onEditCustomName = (oppNo, customName) => {
  return dispatch => {
    dispatch({
      type: SET_EDIT_OPP_INFO,
      payload: {
        oppNo,
        customName
      }
    });
  };
};

export const toggleEditCustomNameModal = (show = false) => {
  return dispatch => {
    dispatch({ type: TOGGLE_EDIT_CUSTOM_NAME_MODAL, payload: show });
  };
};

export const onSaveCustomName = (oppNo, customName) => {
  return async (dispatch, getState) => {
    try {
      const response = await updateCustomName(oppNo, customName);
      dispatch({
        type: UI.SET_SNACKBAR_MSG,
        payload: `Custom Name updated for ${oppNo}`
      });
      dispatch({
        type: UI.SHOW_SNACKBAR
      });
      let proposals = getProposals(getState());
      let opportunities = selectOpportunitiesList(getState());
      let proposalInfo = getProposalDetails(getState());
      let proposalsFavourite = getFavouriteProposals(getState());
      const proposalIndex = proposals.findIndex(
        proposal => proposal['opportunity number'] === oppNo
      );
      const opportunityIndex = opportunities.findIndex(
        opportunity => opportunity['opportunity number'] === oppNo
      );
      if (proposalIndex > -1) {
        proposals[proposalIndex]['customName'] = customName;
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals } });
      }
      if (opportunityIndex > -1) {
        opportunities[opportunityIndex]['customName'] = customName;
        dispatch(setOpportunities(opportunities));
      }

      const favouriteIndex = proposalsFavourite.findIndex(
        proposal => proposal['opportunity number'] === oppNo
      );
      if (favouriteIndex > -1) {
        proposalsFavourite[favouriteIndex]['customName'] = customName;
        dispatch({ type: ON_GET_FAVOURITE, payload: { proposalsFavourite } });
      }

      if (proposalInfo['CRM #'] == oppNo) {
        dispatch({
          type: SET_CUSTOM_NAME,
          payload: customName
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
};

export const updateNextMilestone = (oppNumber, nextMilestone, proposalId) => {
  return async (dispatch, getState) => {
    let selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
      try {
        let proposals = getProposals(getState());
        let opportunities = selectOpportunitiesList(getState());
        let proposalInfo = getProposalDetails(getState());
        let proposalsFavourite = getFavouriteProposals(getState());
        const proposalIndex = proposals.findIndex(
          proposal => proposal['opportunity number'] === oppNumber
        );
        const opportunityIndex = opportunities.findIndex(
          opportunity => opportunity['opportunity number'] === oppNumber
        );
        if (proposalIndex > -1) {
          proposals[proposalIndex]['nextMilestone'] = nextMilestone;
          dispatch({ type: ON_GET_PROPOSALS, payload: { proposals } });
        }

        if (opportunityIndex > -1) {
          opportunities[opportunityIndex]['nextMilestone'] = nextMilestone;
          dispatch(setOpportunities(opportunities));
        }

        const favouriteIndex = proposalsFavourite.findIndex(
          proposal => proposal['opportunity number'] === oppNumber
        );
        if (favouriteIndex > -1) {
          proposalsFavourite[favouriteIndex]['nextMilestone'] = nextMilestone;
          dispatch({ type: ON_GET_FAVOURITE, payload: { proposalsFavourite } });
        }

        if (proposalInfo['CRM #'] === oppNumber) {
          dispatch({
            type: SET_NEXT_MILESTONE,
            payload: nextMilestone
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const updateCustomNameAction = (oppNo, customName) => {
  return async (dispatch, getState) => {
    let proposals = getProposals(getState());
    let opportunities = selectOpportunitiesList(getState());
    let proposalInfo = getProposalDetails(getState());
    let proposalsFavourite = getFavouriteProposals(getState());
    let customNameMap = selectCustomNameMap(getState()).toJS();
    customNameMap[oppNo] = customName;
    dispatch({ type: SET_CUSTOM_NAME_MAP, payload: cloneDeep(customNameMap) });
    const proposalIndex = proposals.findIndex(
      proposal => proposal['opportunity number'] === oppNo
    );
    const opportunityIndex = opportunities.findIndex(
      opportunity => opportunity['opportunity number'] === oppNo
    );
    if (proposalIndex > -1) {
      proposals[proposalIndex]['customName'] = customName;
      dispatch({ type: ON_GET_PROPOSALS, payload: { proposals } });
    }

    if (opportunityIndex > -1) {
      opportunities[opportunityIndex]['customName'] = customName;
      dispatch(setOpportunities(opportunities));
    }

    const favouriteIndex = proposalsFavourite.findIndex(
      proposal => proposal['opportunity number'] === oppNo
    );
    if (favouriteIndex > -1) {
      proposalsFavourite[favouriteIndex]['customName'] = customName;
      dispatch({ type: ON_GET_FAVOURITE, payload: { proposalsFavourite } });
    }

    if (
      proposalInfo &&
      proposalInfo['CRM #'] &&
      proposalInfo['CRM #'] == oppNo
    ) {
      dispatch({
        type: SET_CUSTOM_NAME,
        payload: customName
      });
    }
  };
};
