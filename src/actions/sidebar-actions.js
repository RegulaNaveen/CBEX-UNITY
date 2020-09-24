// @flow

import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';

const { OPEN_SECTION, IS_OPEN } = REDUX_TYPES.SIDEBAR;

export const handleSelectedSection = (
  selectedItem: string
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: OPEN_SECTION, payload: { selectedItem } });
  };
};

export const onHandleOpenClose = (
  isOpen: boolean
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: IS_OPEN, payload: { isOpen } });
  };
};
