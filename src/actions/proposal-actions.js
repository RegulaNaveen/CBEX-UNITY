// @flow
import { PROPOSAL_ACTION_TESTING } from './proposal-types';
import type { ProposalActionType } from './proposal-types';
import type { Dispatch, ThunkAction } from './action-types';

export type ProposalInfo = {
  test: string
};

export const getContacts = (): ThunkAction<ProposalActionType, string> => {
  return async (dispatch: Dispatch<ProposalActionType, string>) => {
    dispatch({
      type: PROPOSAL_ACTION_TESTING,
      payload: 'TESTWORKS'
    });
  };
};
