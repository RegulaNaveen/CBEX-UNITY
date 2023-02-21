import { REDUX_TYPES } from '../../constants';

const {
  SET_TIMELINE_DATE_RANGE,
  SET_SHOW_ADD_MODAL,
  SET_DRAGGED_EVENT
} = REDUX_TYPES.TIMELINE;

export const setTimelineDateRange = date => ({
  type: SET_TIMELINE_DATE_RANGE,
  payload: { date }
});

export const setShowAddModal = value => ({
  type: SET_SHOW_ADD_MODAL,
  payload: { value }
});

export const setDraggedEvent = event => ({
  type: SET_DRAGGED_EVENT,
  payload: { event }
});
