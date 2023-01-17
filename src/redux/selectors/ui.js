import { createSelector } from 'reselect';

const selectUI = state => state.ui;

export const selectSnackbarOpen = createSelector(
  selectUI,
  ui => ui.showSnackbar
);

export const selectSnackbarOptions = createSelector(
  selectUI,
  ui => ui.snackbarOptions
);

export const selectSnackbarMessage = createSelector(
  selectUI,
  ui => ui.snackbarMessage
);
