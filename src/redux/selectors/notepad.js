const selectNotepad = state => {
  return state.notepad;
};

export const selectNotes = state => {
  return selectNotepad(state).get('notes');
};

export const selectIsFetchingNotes = state => {
  return selectNotepad(state).get('fetchingNotes');
};

export const selectIsAddingNote = state => {
  return selectNotepad(state).get('uploadingNote');
};

export const selectNotepadMode = state => {
  return selectNotepad(state).get('notepadMode');
};

export default selectNotepad;
