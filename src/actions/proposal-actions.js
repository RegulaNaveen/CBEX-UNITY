// @flow
import { PROPOSAL_ACTION_TESTING } from './proposal-types';
import type { ProposalActionType } from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';
import { getProposalInfo } from '../api/proposal';

export type ProposalInfo = {
  test: Object
};

export const testData = (): ThunkAction<ProposalActionType, Object> => {
  return async (dispatch: Dispatch<ProposalActionType, Object>) => {
    dispatch({
      type: PROPOSAL_ACTION_TESTING,
      payload: getProposalInfo()
    });
  };
};
