// @flow

import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';

const { OPEN_SECTION } = REDUX_TYPES.SIDEBAR;

const handleSelectedSection = (
  selectedItem: string
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: OPEN_SECTION,
      payload: selectedItem
    });
  };
};

export default handleSelectedSection;
