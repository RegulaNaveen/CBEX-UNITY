import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';

const { ADD_NOTE } = REDUX_TYPES.NOTEPAD;

const INITIAL_STATE = fromJS({
  proposalID: '',
  notes: [],
  fetchingNotes: false
});

function onAddNote(state, action) {
  const {
    payload: { note }
  } = action;
  return state.set('notes', state.get('notes').push(note));
}

const actionMap = {
  [ADD_NOTE]: onAddNote
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
