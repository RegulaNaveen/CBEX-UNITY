// @flow
import newAxios from 'axios';
import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const {
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_FILTER_VALUES,
  API_KEY,
  NON_EDITABLE_SF_FIELD_URL
} = API.PROPOSAL;

const { PROFILE_API_URL } = API.PROFILE;

let onGoingDashboardCall;
const { CancelToken } = newAxios;

export const onGetAllProposals = (payload, userEmail = ''): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');
  const obj = {
    payload
  };
  return axiosInstance.post(PROPOSAL_API_ALL, obj, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
    params: { userEmail }
  });
};
export const onGetByStatus = (
  payload,
  status: string,
  userEmail: string
): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');

  return axiosInstance.post(PROPOSAL_API_ALL_BY_STATUS, payload, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
    params: { userEmail, status }
  });
};

// save opportunity for recent tab
export const saveRecentOppActivity = (payload): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');
  return axiosInstance.post(`${PROFILE_API_URL}/recenttab`, payload, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    })
  });
};

// Get user last 30 days recent opportunity List for Recent Tab
export const getRecentOpportunity = (
  payload,
  status,
  userEmail
): Promise<Object> => {
  const obj = {
    payload,
    status: status
  };

  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');
  return axiosInstance.post(`${PROFILE_API_URL}/filterrecenttab`, obj, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
    params: { userEmail }
  });
};

export const getAssignedOpportunity = (
  payload,
  status: string,
  userEmail: string
): Promise<Object> => {
  const obj = {
    payload,
    status: status
  };
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');
  return axiosInstance.post(`${PROFILE_API_URL}/assignedtab`, obj, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
    params: { userEmail }
  });
};

export const getFavoritesOpportunity = (): Promise<Object> => {
  if (onGoingDashboardCall) onGoingDashboardCall('SwitchError');
  return axiosInstance.get(`${PROFILE_API_URL}/favoritestab`, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    cancelToken: new CancelToken(function executor(c) {
      onGoingDashboardCall = c;
    }),
  });
};

export const onGetFilterValues = (): Promise<Object> =>
  axiosInstance.get(PROPOSAL_FILTER_VALUES, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });

export const onGetSFNonEditabelField = (): Promise<Object> =>
  axiosInstance.get(NON_EDITABLE_SF_FIELD_URL, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
