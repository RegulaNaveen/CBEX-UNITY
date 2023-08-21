import { createSelector } from 'reselect';

const selectApprovals = state => state.approvals;

export const selectAllApprovals = createSelector(
  selectApprovals,
  approvals => approvals.allApprovals
);

export const selectCanSendEmail = createSelector(
  selectApprovals,
  approvals => approvals.canSendEmail
);

export const selectApprovalsFetching = createSelector(
  selectApprovals,
  approvals => approvals.fetching
);
