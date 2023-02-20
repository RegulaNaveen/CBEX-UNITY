import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';

const {
  SET_TIMELINE_DATE_RANGE,
  SET_SHOW_ADD_MODAL,
  SET_DRAGGED_EVENT
} = REDUX_TYPES.TIMELINE;

const INITIAL_STATE = fromJS({
  timelineDateRange: [],
  showAddModal: false,
  draggedEvent: {}
});

const onSetTimelineDateRange = (state, action) => {
  const {
    payload: { date }
  } = action;

  return state.set('timelineDateRange', [
    date[0]?.startOf('week'),
    date[1]?.endOf('week')
  ]);
};

const onSetShowAddModal = (state, action) => {
  const {
    payload: { value }
  } = action;

  return state.set('showAddModal', value);
};
const onSetDraggedEvent = (state, action) => {
  const {
    payload: { event }
  } = action;

  return state.set('draggedEvent', event);
};

const actionMap = {
  [SET_TIMELINE_DATE_RANGE]: onSetTimelineDateRange,
  [SET_SHOW_ADD_MODAL]: onSetShowAddModal,
  [SET_DRAGGED_EVENT]: onSetDraggedEvent
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
