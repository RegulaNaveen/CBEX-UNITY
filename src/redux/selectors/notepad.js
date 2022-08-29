const selectNotepad = state => {
  return state.notepad;
};

export const selectNotes = state => {
  try {
    return selectNotepad(state).get('notes');
  } catch (error) {
    console.log(error);
  }
};

export const selectIsFetchingNotes = state => {
  return selectNotepad(state).get('fetchingNotes');
};

export const selectIsNotesFetched = state => {
  return selectNotepad(state).get('isNotesFetched');
};

export const selectIsNotesWebSocketExists = state => {
  return selectNotepad(state).get('isNotesWebSocketExists');
};

export const selectIsAddingNote = state => {
  return selectNotepad(state).get('uploadingNote');
};

export const selectNotepadMode = state => {
  return selectNotepad(state).get('notepadMode');
};

export default selectNotepad;
