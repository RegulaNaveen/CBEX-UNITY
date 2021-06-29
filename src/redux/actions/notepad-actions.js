import { REDUX_TYPES } from '../../constants';

const { ADD_NOTE } = REDUX_TYPES.NOTEPAD;

export function addNote(note) {
  return dispatch => {
    dispatch({ type: ADD_NOTE, payload: { note } });
  };
}

export default addNote;
