import { UI } from '../../constants/types';

const INITIAL_STATE = {
  snackbarMessage: '',
  snackbarOptions: {
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  },
  showSnackbar: false
};

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UI.SET_SNACKBAR_MSG: {
      return {
        ...state,
        snackbarMessage: action.payload
      };
    }
    case UI.SET_SNACKBAR_OPTIONS: {
      return {
        ...state,
        snackbarOptions: action.payload
      };
    }
    case UI.SHOW_SNACKBAR: {
      return {
        ...state,
        showSnackbar: true
      };
    }
    case UI.HIDE_SNACKBAR: {
      return {
        ...state,
        showSnackbar: false
      };
    }
    case UI.RESET_SNACKBAR: {
      return {
        ...state,
        snackbarMessage: '',
        snackbarOptions: INITIAL_STATE.snackbarOptions
      };
    }
    default:
      return state;
  }
}
