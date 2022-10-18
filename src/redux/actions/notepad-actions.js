import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import { fetchNotesApi, addNoteApi, updateNoteApi } from '../../api/notepad';
import { getUserEmail } from '../../SessionHandler';
import { getSelectedBid } from '../../redux/selectors';

const {
  FETCH_NOTES,
  FETCH_NOTES_DONE,
  ADD_NOTE,
  ADD_NOTE_DONE,
  UPDATE_NOTE,
  UPDATE_NOTE_DONE,
  ERROR_UPDATING_NOTE,
  ERROR_FETCHING_NOTES,
  ERROR_ADDING_NOTE,
  CHANGE_MODE,
  MODE_DEFAULT,
  RESET_NOTES,
  SET_EDITOR,
  UPDATE_NOTE_IN_STORE
} = REDUX_TYPES.NOTEPAD;

export function fetchNotes(proposalID) {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_NOTES });
      const data = await fetchNotesApi(proposalID);
      dispatch({
        type: FETCH_NOTES_DONE,
        payload: {
          data: fromJS(data.notes),
          socketExists: fromJS(data.notesWebsocketExists)
        }
      });
    } catch (err) {
      dispatch({ type: ERROR_FETCHING_NOTES, payload: { data: err } });
    }
  };
}

export const updateProposalNotesFromWebSocket = (
  data
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    if (data.updatedBy === getUserEmail()) {
      console.log('skipping update because message from same user');
    } else {
      dispatch(fetchNotes(getSelectedBid(getState()).get('id', '')));
    }
  };
};

export function addNote(id, note) {
  return async dispatch => {
    try {
      dispatch({ type: ADD_NOTE });
      await addNoteApi(id, note);
      dispatch({ type: ADD_NOTE_DONE });
      dispatch(fetchNotes(id));
    } catch (err) {
      dispatch({ type: ERROR_ADDING_NOTE, payload: { data: err } });
    }
  };
}

export function updateNote(id, note) {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_NOTE });
      await updateNoteApi(id, note);
      dispatch({ type: UPDATE_NOTE_DONE });
      // With NoteV2 we dont need to refetch the notes list
      // dispatch({ type: CHANGE_MODE, payload: { mode: MODE_DEFAULT } });
      // dispatch(fetchNotes(id));
    } catch (err) {
      dispatch({ type: ERROR_UPDATING_NOTE, payload: { data: err } });
    }
  };
}

export function updateNoteInStore(note) {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_NOTE_IN_STORE, payload: { note } });
    } catch (err) {
      console.log('error occurred in updating note is store.');
    }
  };
}

export function setEditor(value) {
  return dispatch => dispatch({ type: SET_EDITOR, payload: { value } });
}

export function changeMode(mode) {
  return dispatch => dispatch({ type: CHANGE_MODE, payload: { mode } });
}

export function resetNotes() {
  return dispatch => dispatch({ type: RESET_NOTES, payload: {} });
}

export default fetchNotes;
