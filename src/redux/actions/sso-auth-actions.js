// @flow
import type { Dispatch, ThunkAction } from './action-types';
import {
  onLoginRequest,
  onChangeUserRole,
  getUsers,
  getFavourites
} from '../../api/sso-auth';
import { REDUX_TYPES } from '../../constants';
import { selectFavourites } from '../selectors/sso-auth';
import { updateProposal } from './proposals-actions';
import { getProposalDetails, getProposals } from '../selectors';

const {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  ERROR_ON_USER_LOGIN,
  ON_CHANGE_ROLE,
  ERROR_ON_CHANGE_ROLE,
  ON_REFRESH_USER_DATA,
  ON_GET_LOOKUP_USERS,
  ERROR_ON_GET_LOOKUP_USERS,
  SET_USER_FAVOURITES
} = REDUX_TYPES.SSO_AUTH;

const { TOGGLE_FAVOURITE } = REDUX_TYPES.PROPOSAL;
const { ON_GET_PROPOSALS } = REDUX_TYPES.PROPOSALS;

export const loginUser = (code: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const { data } = await onLoginRequest(code);
      if (data) {
        dispatch({ type: ON_USER_LOGIN, payload: { data } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_USER_LOGIN, payload: { error } });
    }
  };
};

export const onUserLogout = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: ON_USER_LOGOUT, payload: {} });
  };
};

export const onRefreshUserData = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) =>
    dispatch({ type: ON_REFRESH_USER_DATA, payload: {} });
};

export const onSetUserRole = (role: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    try {
      if (accessToken && idToken) {
        const { data } = await onChangeUserRole(accessToken, idToken, role);
        dispatch({ type: ON_CHANGE_ROLE, payload: { role: data.role } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_CHANGE_ROLE, payload: { error } });
    }
  };
};

export const getAllUsers = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, Object>) => {
    const idToken = localStorage.getItem('id_token') || '';

    try {
      const { data } = await getUsers(idToken);

      if (data) {
        const { authService } = data;

        dispatch({
          type: ON_GET_LOOKUP_USERS,
          payload: { lookupUsers: authService }
        });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_GET_LOOKUP_USERS, payload: { error } });
    }
  };
};

export const fetchUserFavourites = () => {
  return async (dispatch, getState) => {
    try {
      const favouritesResponse = await getFavourites();
      if (favouritesResponse && Array.isArray(favouritesResponse.favourites)) {
        dispatch({
          type: SET_USER_FAVOURITES,
          payload: favouritesResponse.favourites
        });
        let proposals = getProposals(getState());
        if (proposals.length > 0) {
          const favouritesMap = favouritesResponse.favourites.reduce(
            (favMap, fav) => {
              favMap[fav] = true;
              return favMap;
            },
            {}
          );
          let updatedProposals = proposals.map(proposal => {
            if (proposal && proposal['opportunity number']) {
              return {
                ...proposal,
                isFavourite: !!favouritesMap[
                  `${proposal['opportunity number']}`
                ]
              };
            } else {
              return {
                ...proposal,
                isFavourite: false
              };
            }
          });
          dispatch({
            type: ON_GET_PROPOSALS,
            payload: { proposals: updatedProposals }
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFavourite = (oppNumber, favourite, proposalDetails) => {
  return async (dispatch, getState) => {
    try {
      let favourites = selectFavourites(getState()).toJS();
      let proposalInfo = getProposalDetails(getState());
      if (favourite) {
        favourites.push(oppNumber);
      } else {
        favourites = favourites.filter(fav => fav !== oppNumber);
      }
      dispatch({
        type: SET_USER_FAVOURITES,
        payload: favourites
      });
      await dispatch(updateProposal(oppNumber, favourite, proposalDetails));
      if (proposalInfo['CRM #']) {
        const favouritesMap = favourites.reduce((favMap, fav) => {
          favMap[fav] = true;
          return favMap;
        }, {});
        dispatch({
          type: TOGGLE_FAVOURITE,
          payload: favouritesMap[`${proposalInfo['CRM #']}`]
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
