// @flow
import axios from 'axios';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const {
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_FILTER_VALUES,
  API_KEY,
  NON_EDITABLE_SF_FIELD_URL
} = API.PROPOSAL;

export const onGetAllProposals = (payload): Promise<Object> =>
  axios.post(PROPOSAL_API_ALL, payload, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });

export const onGetByStatus = (
  payload,
  status: string,
  userEmail: string
): Promise<Object> =>
  axios.post(PROPOSAL_API_ALL_BY_STATUS, payload, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    params: { userEmail, status }
  });

export const onGetFilterValues = (): Promise<Object> =>
  axios.get(PROPOSAL_FILTER_VALUES, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });

  export const onGetSFNonEditabelField = (): Promise<Object> =>
  axios.get(NON_EDITABLE_SF_FIELD_URL, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
