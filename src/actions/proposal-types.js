// @flow
export type ProposalActionType =
  | 'proposal_info'
  | 'proposal_info_loading'
  | 'proposal_info_error'
  | 'proposal_answer'
  | 'proposal_answer_loading'
  | 'proposal_answer_error';

export const PROPOSAL_INFO: ProposalActionType = 'proposal_info';
export const PROPOSAL_INFO_LOADING: ProposalActionType =
  'proposal_info_loading';
export const PROPOSAL_INFO_ERROR: ProposalActionType = 'proposal_info_error';

export const PROPOSAL_ANSWER: ProposalActionType = 'proposal_answer';
export const PROPOSAL_ANSWER_LOADING: ProposalActionType =
  'proposal_answer_loading';
export const PROPOSAL_ANSWER_ERROR: ProposalActionType =
  'proposal_answer_error';
