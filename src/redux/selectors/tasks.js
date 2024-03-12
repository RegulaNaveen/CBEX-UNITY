import { createSelector } from 'reselect';
import { getSelectedBid } from './proposal';

const selectTasks = state => state.tasks;

export const selectTasksFetching = createSelector(
  selectTasks,
  tasks => tasks.loading
);

export const selectTasksList = createSelector(
  selectTasks,
  getSelectedBid,
  (task, selectedBid) =>
    task.tasks.filter(
      task =>
        task.opportunity_types
          .split(',')
          .includes(selectedBid.get('opportunityType')) && !!!task.is_deleted
    )
);

export const selectTasksError = createSelector(
  selectTasks,
  tasks => tasks.error
);

export const selectCanTaskReorder = createSelector(
  selectTasks,
  task => task.canReorder
);
