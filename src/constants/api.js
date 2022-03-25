import { isUserUbuildAdmin } from '../utils/utils';

// @flow
const environment = process.env.API_ENV;

//* PROPOSAL
let PROPOSAL_API_ENDPOINT = '';
let PROPOSAL_API_KEY = '';
//* NORMAL AUTH
let NORMAL_AUTH_API_ENDPOINT = '';
//* SSO AUTH
let COGNITO_HOST = '';
const AUTH_KEY = '';
let CLIENT_ID = '';
let REDIRECTION_URL = '';
//* Ubuild feature flag
let UBUILD_ENABLED = false;
let UBUILD_ARTIFACT = '';
let SF_HOST_URL = '';

switch (environment) {
  case 'UAT':
    PROPOSAL_API_ENDPOINT =
      'https://d0mb8f9mx0.execute-api.us-east-1.amazonaws.com/uat';
    PROPOSAL_API_KEY = 'e4e3BACQBxaTdmYdIGKG58BDF7RHXoloCGNlqcIe';
    NORMAL_AUTH_API_ENDPOINT =
      'https://9l688o9r93.execute-api.us-east-1.amazonaws.com/uat';
    COGNITO_HOST = 'https://uat-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = '1h21m7sdoq1jr4tb00mkljn1m';
    REDIRECTION_URL = 'https://uat-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://uat-ubuild.iqvia.app/main.js';
    SF_HOST_URL = 'https://iqvia--uat.lightning.force.com/';
    break;
  case 'PROD':
    PROPOSAL_API_ENDPOINT =
      'https://m7ci1wtmgf.execute-api.us-east-1.amazonaws.com/prod';
    PROPOSAL_API_KEY = 'EWK61xXYCM9ofFmBOcOPR4xxxObhZxtwanqD3RHV';
    NORMAL_AUTH_API_ENDPOINT =
      'https://sljfl1jmnc.execute-api.us-east-1.amazonaws.com/prod';
    COGNITO_HOST = 'https://prod-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = 'tc1tih0kcrifpoqrdsqo26467';
    REDIRECTION_URL = 'https://unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://ubuild.iqvia.app/main.js';
    SF_HOST_URL = 'https://iqvia.my.salesforce.com/';
    break;
  case 'QA':
    // UDEV Data
    PROPOSAL_API_ENDPOINT =
      'https://r1g9pjnmbb.execute-api.us-east-1.amazonaws.com/qa';
    PROPOSAL_API_KEY = 'YXrOu45imb6d03erOkZB2PuBOsYQYZ93pnmQK6C0';
    //NORMAL_AUTH_API_ENDPOINT =
    // 'https://aiz2k1qjjl.execute-api.us-east-1.amazonaws.com/dev';
    //COGNITO_HOST = 'https://unity-dev.auth.us-east-1.amazoncognito.com';
    //CLIENT_ID = '5qa83je2aga90r53kte3mori93';
    NORMAL_AUTH_API_ENDPOINT =
     'https://cokteh9f4e.execute-api.us-east-1.amazonaws.com/qa';
    COGNITO_HOST = 'https://qa-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = '65ie0siehm65hisi4n1avlaa0r';
    REDIRECTION_URL = 'https://qa-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://qa-ubuild.iqvia.app/main.js';
    SF_HOST_URL = 'https://iqvia--staging.lightning.force.com/';
    break;
  default:
    // DEV Data
    PROPOSAL_API_ENDPOINT = 'https://olyxc9cn1m.execute-api.us-east-1.amazonaws.com/dev';
    PROPOSAL_API_KEY = 'SmXooYpNRX4u0dlRrebjt3PUnJJma5cm5ipK3nSV';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    // REDIRECTION_URL = 'https://dev-unity.dev.iqvia.app/';
    REDIRECTION_URL = 'http://localhost:8080';
    UBUILD_ARTIFACT = 'https://dev-ubuild.dev.iqvia.app/main.js';
    SF_HOST_URL = 'https://iqvia--hbfx.lightning.force.com/';
    break;
}

UBUILD_ENABLED = isUserUbuildAdmin();

const AUTH_API_ENDPOINT = `${COGNITO_HOST}/oauth2/token`;

//* NORMAL AUTH ENPOINTS
const AUTH_API_URL = `${NORMAL_AUTH_API_ENDPOINT}/api/auth`;
const ROLE_ENDPOINT = `${AUTH_API_URL}/changerole`;
const VALIDATE_TOKEN = `${AUTH_API_URL}/validate-token`;

const AUTH = {
  COGNITO_HOST,
  API_ENDPOINT: AUTH_API_ENDPOINT,
  AUTH_KEY,
  CLIENT_ID,
  REDIRECTION_URL,
  ROLE_ENDPOINT,
  NORMAL_AUTH_API_ENDPOINT,
  AUTH_API_URL,
  VALIDATE_TOKEN
};

const PROPOSAL_API_URL = `${PROPOSAL_API_ENDPOINT}/api/proposals`;
const PROPOSAL_API_ALL = `${PROPOSAL_API_URL}/all`;
const PROPOSAL_API_ALL_BY_STATUS = `${PROPOSAL_API_URL}/all-by-status`;
const PROPOSAL_QUESTIONS_API_URL = `${PROPOSAL_API_ENDPOINT}/api/questions`;
const PROPOSAL_FILTER_VALUES = `${PROPOSAL_API_URL}/acceptanceCriteriaValues`;
const PROPOSAL_VALIDATED_DATA = `${PROPOSAL_API_URL}/validations`;

const MAMOTO_IQVIA = 'https://useranalytics.solutions.iqvia.com/';

const PROPOSAL = {
  API_ENDPOINT: PROPOSAL_API_ENDPOINT,
  PROPOSAL_API_URL,
  PROPOSAL_API_ALL,
  PROPOSAL_API_ALL_BY_STATUS,
  PROPOSAL_QUESTIONS_API_URL,
  PROPOSAL_FILTER_VALUES,
  PROPOSAL_VALIDATED_DATA,
  API_KEY: PROPOSAL_API_KEY,
  MAMOTO_IQVIA
};

const NOTEPAD_API_URL = `${PROPOSAL_API_ENDPOINT}/api/notes`;

const NOTEPAD = {
  NOTEPAD_API_URL
};

export {
  AUTH,
  PROPOSAL,
  NOTEPAD,
  UBUILD_ENABLED,
  UBUILD_ARTIFACT,
  SF_HOST_URL
};
