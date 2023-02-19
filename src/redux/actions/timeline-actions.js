import { REDUX_TYPES } from '../../constants';

const { SET_TIMELINE_DATE_RANGE, SET_SHOW_ADD_MODAL } = REDUX_TYPES.TIMELINE;

// eslint-disable-next-line import/prefer-default-export
export const setTimelineDateRange = date => ({
  type: SET_TIMELINE_DATE_RANGE,
  payload: { date }
});

export const setShowAddModal = value => ({
  type: SET_SHOW_ADD_MODAL,
  payload: { value }
});
