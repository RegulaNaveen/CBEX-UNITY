// @flow
import { PROPOSAL_INFO } from './proposal-types';
import type { ProposalActionType } from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';
import { getProposalInfo } from '../api/proposal';

export type ProposalInfo = {
  test: Object
};

export const getProposal = (
  id: string
): ThunkAction<ProposalActionType, Object> => {
  return async (dispatch: Dispatch<ProposalActionType, Object>) => {
    const data = await getProposalInfo(id);
    dispatch({
      type: PROPOSAL_INFO,
      payload: data
    });
  };
};
