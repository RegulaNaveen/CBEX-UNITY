// @flow
import axios from 'axios';
import { API } from '../constants';

const { PROPOSAL_API_ALL, PROPOSAL_API_ALL_BY_STATUS, API_KEY } = API.PROPOSAL;

export const onGetAllProposals = (): Promise<Object> =>
  axios.get(PROPOSAL_API_ALL, {
    headers: { 'x-api-key': API_KEY }
  });

export const onGetByStatus = (
  status: string,
  userEmail: string
): Promise<Object> =>
  axios.get(PROPOSAL_API_ALL_BY_STATUS, {
    headers: { 'x-api-key': API_KEY },
    params: { userEmail, status }
  });
