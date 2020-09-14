// @flow
import { Map, fromJS } from 'immutable';
import type { ApiAction } from '../actions/action-types';
import { REDUX_TYPES } from '../constants';

const { OPEN_SECTION } = REDUX_TYPES.SIDEBAR;

const INITIAL_STATE: Map = fromJS({
  selectedSection: undefined
});

const onSelectedSection = (state: Map, action: Object) => {
  const data = action.payload;

  return state.set('selectedSection', data);
};

const actionMap = {
  [OPEN_SECTION]: onSelectedSection
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
