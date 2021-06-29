const selectNotepad = state => {
  return state.notepad;
};

export const selectNotes = state => {
  return selectNotepad(state).get('notes');
};

export default selectNotepad;
