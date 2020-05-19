// @flow
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  PROPOSAL_ANSWER_ERROR
} from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';
import { getProposalInfo, setProposalAnswer } from '../api/proposal';

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
