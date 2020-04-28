// @flow
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR
} from './proposal-types';
import type { ProposalActionType } from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';
import { getProposalInfo } from '../api/proposal';

export type ProposalInfo = {};

export const getProposal = (
  id: string
): ThunkAction<ProposalActionType, Object> => {
  return async (dispatch: Dispatch<ProposalActionType, Object>) => {
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
