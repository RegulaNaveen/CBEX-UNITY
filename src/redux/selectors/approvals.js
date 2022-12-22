import { createSelector } from 'reselect';

const selectApprovals = state => state.approvals;

export const selectCanSendEmail = createSelector(
  selectApprovals,
  approvals => approvals.canSendEmail
);
