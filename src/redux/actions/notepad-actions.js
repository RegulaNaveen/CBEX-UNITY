import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import { fetchNotesApi, addNoteApi, updateNoteApi } from '../../api/notepad';

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
  MODE_DEFAULT
} = REDUX_TYPES.NOTEPAD;

export function fetchNotes(proposalID) {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_NOTES });
      const data = await fetchNotesApi(proposalID);
      dispatch({
        type: FETCH_NOTES_DONE,
        payload: { data: fromJS(data.notes) }
      });
    } catch (err) {
      dispatch({ type: ERROR_FETCHING_NOTES, payload: { data: err } });
    }
  };
}

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
      dispatch({ type: CHANGE_MODE, payload: { mode: MODE_DEFAULT } });
      dispatch(fetchNotes(id));
    } catch (err) {
      dispatch({ type: ERROR_UPDATING_NOTE, payload: { data: err } });
    }
  };
}

export function changeMode(mode) {
  return dispatch => dispatch({ type: CHANGE_MODE, payload: { mode } });
}

export default fetchNotes;
