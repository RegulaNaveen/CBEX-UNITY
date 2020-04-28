// @flow
export type ProposalActionType =
  | 'proposal_info'
  | 'proposal_info_loading'
  | 'proposal_info_error';

export const PROPOSAL_INFO: ProposalActionType = 'proposal_info';
export const PROPOSAL_INFO_LOADING: ProposalActionType =
  'proposal_info_loading';
export const PROPOSAL_INFO_ERROR: ProposalActionType = 'proposal_info_error';
