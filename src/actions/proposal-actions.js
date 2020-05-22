// @flow
import {
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
  PROPOSAL_SET_QUESTION_ERROR
} from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';
import {
  getProposalInfo,
  setProposalAnswer,
  getQuestionSectionInfo,
  getAnswerTypes,
  getRoles,
  setProposalQuestionData
} from '../api/proposal';

export type ProposalInfo = {};

export const getProposal = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_INFO_LOADING,
      payload: ''
    });
    try {
      const data = await getProposalInfo(id);
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

export const setProposalAnswerData = (
  proposalId: string,
  questionId: string,
  answer: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_ANSWER_LOADING,
      payload: ''
    });
    try {
      const data = await setProposalAnswer(proposalId, questionId, answer);
      dispatch({
        type: PROPOSAL_ANSWER,
        payload: { data, questionId }
      });
    } catch (err) {
      dispatch({
        type: PROPOSAL_ANSWER_ERROR,
        payload: err
      });
    }
  };
};

export const getQuestionSection = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_SECTION_LOADING,
      payload: ''
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
      payload: ''
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
      payload: ''
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
      payload: ''
    });
    try {
      const data = await setProposalQuestionData(proposalId, questionData);
      dispatch({
        type: PROPOSAL_SET_QUESTION,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: PROPOSAL_SET_QUESTION_ERROR,
        payload: err
      });
    }
  };
};
