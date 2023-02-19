import { fromJS } from 'immutable';
import moment from 'moment';
import { REDUX_TYPES } from '../../constants';

const { SET_TIMELINE_DATE_RANGE, SET_SHOW_ADD_MODAL } = REDUX_TYPES.TIMELINE;

const INITIAL_STATE = fromJS({
  timelineDateRange: [],
  showAddModal: false
});

const onSetTimelineDateRange = (state, action) => {
  const {
    payload: { date }
  } = action;
  console.log('tapas inside reducer date ', action.payload, date);

  return state.set('timelineDateRange', [
    date[0]?.startOf('week'),
    date[1]?.endOf('week')
  ]);
};

const onSetShowAddModal = (state, action) => {
  const {
    payload: { value }
  } = action;
  console.log('tapas inside reducer date ', action.payload, value);

  return state.set('showAddModal', value);
};

const actionMap = {
  [SET_TIMELINE_DATE_RANGE]: onSetTimelineDateRange,
  [SET_SHOW_ADD_MODAL]: onSetShowAddModal
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
