// @flow
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';

const { SET_PROPOSAL_VIEW_TYPE } = REDUX_TYPES.PROPOSALS;

// eslint-disable-next-line import/prefer-default-export
export const setProposalTypeView = (
  typeView: 0 | 1
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: SET_PROPOSAL_VIEW_TYPE, payload: { typeView } });
  };
};
