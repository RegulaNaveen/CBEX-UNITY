// @flow

//* AUTH
const AUTH_API_ENDPOINT =
  'https://aiz2k1qjjl.execute-api.us-east-1.amazonaws.com/dev';
const AUTH_API_URL = `${AUTH_API_ENDPOINT}/api/auth`;

const AUTH = {
  API_ENDPOINT: AUTH_API_ENDPOINT,
  AUTH_API_URL
};

//* PROPOSAL
const PROPOSAL_API_ENDPOINT =
  'https://puo6dvbged.execute-api.us-east-1.amazonaws.com/dev';

const PROPOSAL_API_URL = `${PROPOSAL_API_ENDPOINT}/api/proposals`;
const PROPOSAL_API_ALL = `${PROPOSAL_API_URL}/all`;
const PROPOSAL_API_ALL_BY_STATUS = `${PROPOSAL_API_URL}/all-by-status`;
const PROPOSAL_QUESTIONS_API_URL = `${PROPOSAL_API_ENDPOINT}/api/questions`;
const PROPOSAL_API_KEY = 'Wctbuly84485ruXf4Bilz1c8xdckxcfk4GA2NvVe';

const PROPOSAL = {
  API_ENDPOINT: PROPOSAL_API_ENDPOINT,
  PROPOSAL_API_URL,
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_QUESTIONS_API_URL,
  API_KEY: PROPOSAL_API_KEY
};

export { AUTH, PROPOSAL };
