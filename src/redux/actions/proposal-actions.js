// @flow
import { isEmpty } from 'lodash';
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
  VALIDATED_PROPOSAL_DATA_ERROR
} = REDUX_TYPES.PROPOSAL;

export type ProposalInfo = {};

export const getProposal = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });

    try {
      const data = await getProposalInfo(id);
      dispatch({ type: PROPOSAL_INFO, payload: data });
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
        dispatch({ type: PROPOSAL_ANSWER, payload: { data: data.answers, questionId } });
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
