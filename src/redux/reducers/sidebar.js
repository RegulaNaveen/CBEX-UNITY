// @flow
import { Map, fromJS } from 'immutable';
import type { ApiAction } from '../actions/action-types';
import { REDUX_TYPES } from '../../constants';

const { OPEN_SECTION, IS_OPEN } = REDUX_TYPES.SIDEBAR;

const INITIAL_STATE: Map = fromJS({
  selectedSection: undefined,
  isOpen: false
});

const onSelectedSection = (state: Map, action: Object) => {
  const { selectedItem: section } = action.payload;
  return state.set('selectedSection', section);
};

const onHandleOpenClose = (state: Map, action: Object) => {
  const { isOpen } = action.payload;
  return state.set('isOpen', isOpen);
};

const actionMap = {
  [OPEN_SECTION]: onSelectedSection,
  [IS_OPEN]: onHandleOpenClose
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
