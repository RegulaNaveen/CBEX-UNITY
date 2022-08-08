// @flow
// import axios from 'axios';
import axios from './axios-config';

import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const {
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_FILTER_VALUES,
  API_KEY,
  NON_EDITABLE_SF_FIELD_URL
} = API.PROPOSAL;

let onGoingDashboardCall;
const { CancelToken } = axios;

export const onGetAllProposals = (payload): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');

  return axios.post(PROPOSAL_API_ALL, payload, {
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    })
  });
};
export const onGetByStatus = (
  payload,
  status: string,
  userEmail: string
): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');

  return axios.post(PROPOSAL_API_ALL_BY_STATUS, payload, {
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
    params: { userEmail, status }
  });
};

export const onGetFilterValues = (): Promise<Object> =>
  axios.get(PROPOSAL_FILTER_VALUES);

export const onGetSFNonEditabelField = (): Promise<Object> =>
  axios.get(NON_EDITABLE_SF_FIELD_URL);
