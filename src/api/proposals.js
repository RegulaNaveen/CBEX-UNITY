// @flow
import axios from 'axios';
import { API } from '../constants';
import { getAccessToken } from '../SessionHandler';

const {
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_FILTER_VALUES,
  API_KEY
} = API.PROPOSAL;

export const onGetAllProposals = (): Promise<Object> =>
  axios.get(PROPOSAL_API_ALL, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });

export const onGetByStatus = (
  status: string,
  userEmail: string
): Promise<Object> =>
  axios.get(PROPOSAL_API_ALL_BY_STATUS, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
    params: { userEmail, status }
  });

export const onGetFilterValues = (): Promise<Object> =>
  axios.get(PROPOSAL_FILTER_VALUES, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
