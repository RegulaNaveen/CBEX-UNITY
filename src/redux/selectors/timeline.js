const selectTimeline = state => {
  return state.timeline;
};

// eslint-disable-next-line import/prefer-default-export
export const selectTimelineDateRange = state => {
  return selectTimeline(state).get('timelineDateRange');
};

export const selectShowAddModal = state => {
  return selectTimeline(state).get('showAddModal');
};
