import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';

const {
  FETCH_NOTES,
  FETCH_NOTES_DONE,
  ERROR_FETCHING_NOTES,
  ADD_NOTE,
  ADD_NOTE_DONE,
  ERROR_ADDING_NOTE,
  UPDATE_NOTE,
  UPDATE_NOTE_DONE,
  ERROR_UPDATING_NOTE,
  MODE_DEFAULT,
  CHANGE_MODE
} = REDUX_TYPES.NOTEPAD;

const INITIAL_STATE = fromJS({
  proposalID: '',
  notes: [],
  fetchingNotes: false,
  fetchNotesErrorMsg: '',
  uploadingNote: false,
  uploadNoteErrorMsg: '',
  notepadMode: MODE_DEFAULT
});

/**
 * 3 modes
 * 'default' - shows list and add note option
 * 'read' - shows detailed view of a note
 * 'edit' - shows detailed view with ability to modify a note added by user
 */

function onFetchNotes(state) {
  return state.set('fetchingNotes', true);
}

function onFetchNotesDone(state, action) {
  const {
    payload: { data, isFromSocket }
  } = action;
  data.isFromSocket = !!isFromSocket;
  return state.set('notes', data).set('fetchingNotes', false);
  // .set('isFromSocket', !!isFromSocket);
}

function onErrorFetchingNotes(state, action) {
  const {
    payload: { data }
  } = action;
  return state.set('fetchingNotes', false).set('fetchNotesErrorMsg', data);
}

function onAddNote(state) {
  return state.set('uploadingNote', true);
}

function onAddNoteDone(state) {
  return state.set('uploadingNote', false);
}

function onErrorAddingNote(state, action) {
  const {
    payload: { data }
  } = action;
  return state.set('uploadingNote', false).set('uploadNoteErrorMsg', data);
}

function onChangeMode(state, action) {
  const {
    payload: { mode }
  } = action;
  return state.set('notepadMode', mode);
}

function onUpdateNote(state) {
  return state.set('uploadingNote', true);
}

function onUpdateNoteDone(state) {
  return state.set('uploadingNote', false);
}

function onErrorUpdatingNote(state, action) {
  const {
    payload: { data }
  } = action;
  return state.set('uploadingNote', false).set('uploadNoteErrorMsg', data);
}

const actionMap = {
  [FETCH_NOTES]: onFetchNotes,
  [FETCH_NOTES_DONE]: onFetchNotesDone,
  [ERROR_FETCHING_NOTES]: onErrorFetchingNotes,
  [ADD_NOTE]: onAddNote,
  [ADD_NOTE_DONE]: onAddNoteDone,
  [ERROR_ADDING_NOTE]: onErrorAddingNote,
  [CHANGE_MODE]: onChangeMode,
  [UPDATE_NOTE]: onUpdateNote,
  [UPDATE_NOTE_DONE]: onUpdateNoteDone,
  [ERROR_UPDATING_NOTE]: onErrorUpdatingNote
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
