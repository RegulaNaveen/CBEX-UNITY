// @flow
import { isEmpty, cloneDeep, uniqBy } from 'lodash';
import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import type { Dispatch, ThunkAction } from './action-types';
import {
  getProposalInfo,
  setProposalAnswer,
  getQuestionSectionInfo,
  getAnswerTypes,
  getRoles,
  setProposalQuestionData,
  getProposalInfoUpdated,
  getProposlBoxId,
  getValidatedProposalData
} from '../../api/proposal';
import { getQuestionsFilters, selectProposalQuestions } from '../selectors';
import { getUniqueMilestones } from '../selectors/proposal';

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
  SET_EDIT_QUESTION_DATA
} = REDUX_TYPES.PROPOSAL;

export type ProposalInfo = {};

export const getProposal = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });

    try {
      const data = await getProposalInfo(id);
      // Extracting unique milestone values from Proposal Questions
      const milestones = getUniqueMilestones(data.proposalQuestions);
      dispatch({ type: PROPOSAL_INFO, payload: { ...data, milestones } });
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
    }
  };
};

export const setProposalAnswerData = (
  proposalId: string,
  questionId: string,
  answer: string,
  userData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_ANSWER_LOADING, payload: {} });

    try {
      const { data } = await setProposalAnswer(
        proposalId,
        questionId,
        answer,
        userData
      );

      if (Array.isArray(data.answers)) {
        dispatch({
          type: PROPOSAL_ANSWER,
          payload: { data: data.answers, questionId }
        });
      } else {
        dispatch({ type: PROPOSAL_ANSWER, payload: { data, questionId } });
      }

      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
    } catch (err) {
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: err });
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

export const setProposalQuestion = (
  proposalId: string,
  questionData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await setProposalQuestionData(proposalId, questionData);
      dispatch({ type: PROPOSAL_SET_QUESTION, payload: data });
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

export function onQuestionsFilterApplied(questionsFilter) {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: ON_APPLY_QUESTIONS_FILTER,
      payload: { questionsFilter }
    });

    /**
     * get active filters and apply in sequence
     */

    const questions = selectProposalQuestions(state);
    let filteredQuestions = [];
    const activeQuestionsFilter = questionsFilter.filter(value =>
      value.get('checked')
    );
    activeQuestionsFilter.keySeq().forEach(key => {
      switch (key) {
        case 'myUserRole':
          filteredQuestions = uniqBy(
            [...filteredQuestions, ...applyMyUserRoleFilter(questions)],
            'questionId'
          );
          break;
        case 'interestedParty':
          filteredQuestions = uniqBy(
            [...filteredQuestions, ...applyInterestedPartyFilter(questions)],
            'questionId'
          );
          break;
        default:
          filteredQuestions = uniqBy(
            [...filteredQuestions, ...applyMilestoneFilter(questions, key)],
            'questionId'
          );
          break;
      }
    });

    dispatch({
      type: ON_QUESTIONS_FILTERED,
      payload: { filteredQuestions }
    });
  };
}

export function onApplyQuestionsFilter(filterName = null, checked = false) {
  return async (dispatch, getState) => {
    const state = getState();
    let questionsFilter = getQuestionsFilters(state);
    if (filterName) {
      questionsFilter = questionsFilter.setIn([filterName, 'checked'], checked);
    }

    dispatch(onQuestionsFilterApplied(questionsFilter));
  };
}

export function resetQuestionsFilterAction() {
  return async dispatch => {
    dispatch({ type: RESET_QUESTIONS_FILTER });
  };
}

export function clearQuestionsFilterAction() {
  return async (dispatch, getState) => {
    let questionsFilter = getQuestionsFilters(getState());
    questionsFilter = questionsFilter.map(filter =>
      filter.set('checked', false)
    );
    dispatch({ type: CLEAR_QUESTIONS_FILTER, payload: { questionsFilter } });
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
