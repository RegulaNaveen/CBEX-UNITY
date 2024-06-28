/* istanbul ignore file */
import { isUserUbuildAdmin } from '../utils/utils';

// @flow
// const environment = process.env.API_ENV;
let environment = process.env.API_ENV;

//* PROPOSAL
let PROPOSAL_API_ENDPOINT = '';
let PROPOSAL_API_ENDPOINT_2 = '';
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
let UBUILD_ARTIFACT_V2 = '';
let SF_HOST_URL = '';
let SOCKET_URL = '';
let NOTES_SOCKET_URL = '';
let LAUNCH_DARKLY_CLIENT_ID = '630712f317eece1138e5445c';
let ANALYTICS_API_URL = '';
switch (environment) {
  case 'UAT':
    PROPOSAL_API_ENDPOINT =
      'https://d0mb8f9mx0.execute-api.us-east-1.amazonaws.com/uat';
    PROPOSAL_API_ENDPOINT_2 =
      'https://umbpe2tva5.execute-api.us-east-1.amazonaws.com/uat';
    PROPOSAL_API_KEY = 'e4e3BACQBxaTdmYdIGKG58BDF7RHXoloCGNlqcIe';
    NORMAL_AUTH_API_ENDPOINT =
      'https://q4gnro2y0a.execute-api.us-east-1.amazonaws.com/uat';
    COGNITO_HOST = 'https://uat-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = '1h21m7sdoq1jr4tb00mkljn1m';
    REDIRECTION_URL = 'https://uat-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://uat-ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://uat-ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--uat.sandbox.lightning.force.com/';
    SOCKET_URL =
      'wss://l3p8o0zg48.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://1qq7rwcx08.execute-api.us-east-1.amazonaws.com/production';
    ANALYTICS_API_URL =
      'https://t1vwbpgywc.execute-api.us-east-1.amazonaws.com';
    break;
  case 'DEV2':
    PROPOSAL_API_ENDPOINT =
      'https://new4hoe11j.execute-api.us-east-1.amazonaws.com/dev2';
    PROPOSAL_API_ENDPOINT_2 = '';
    PROPOSAL_API_KEY = 'L8In0zYYjBuWm2Fae4KU4FOacxstdku293lJ30S3';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://dev2-unity.dev.iqvia.app/';
    UBUILD_ARTIFACT = 'https://dev2-ubuild.dev.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://dev2-ubuild.dev.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--hotfix.lightning.force.com/';
    SOCKET_URL =
      'wss://bgh4swo5j8.execute-api.us-east-1.amazonaws.com/production';
    //SOCKET_URL = 'wss://07hl4u2wt5.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://3q3atw4co6.execute-api.us-east-1.amazonaws.com/production';
    break;
  case 'DEV3':
    PROPOSAL_API_ENDPOINT =
      'https://q4i0wr1pi7.execute-api.us-east-1.amazonaws.com/dev3';
    PROPOSAL_API_ENDPOINT_2 = '';
    PROPOSAL_API_KEY = 'tjQqMFxlmK5se4Tiivan77PUkV03qWjV9MHwzOMK';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://dev3-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://dev3-ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://dev3-ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--dev.lightning.force.com/';
    SOCKET_URL =
      'wss://bgh4swo5j8.execute-api.us-east-1.amazonaws.com/production';
    //SOCKET_URL = 'wss://07hl4u2wt5.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://3q3atw4co6.execute-api.us-east-1.amazonaws.com/production';
    break;
  case 'DEV3':
    PROPOSAL_API_ENDPOINT =
      'https://q4i0wr1pi7.execute-api.us-east-1.amazonaws.com/dev3';
    PROPOSAL_API_ENDPOINT_2 = '';
    PROPOSAL_API_KEY = 'tjQqMFxlmK5se4Tiivan77PUkV03qWjV9MHwzOMK';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://dev3-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://dev3-ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://dev3-ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--dev.lightning.force.com/';
    SOCKET_URL =
      'wss://3g2rh5rdnf.execute-api.us-east-1.amazonaws.com/production';
    break;
  case 'DEMO':
    PROPOSAL_API_ENDPOINT =
      'https://yfpduar618.execute-api.us-east-1.amazonaws.com/demo';
    PROPOSAL_API_ENDPOINT_2 = '';
    PROPOSAL_API_KEY = 'Q2HUSjNGhX3V5wZ78Ggh1536NtsIeJ7W3Vbfx2mv';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://demo-unity.dev.iqvia.app/';
    UBUILD_ARTIFACT = 'https://demo-ubuild.dev.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://demo-ubuild.dev.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--hotfix.lightning.force.com/';
    SOCKET_URL =
      'wss://ld700ndvyb.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://0x9widxpxd.execute-api.us-east-1.amazonaws.com/production';
    break;
  case 'PROD':
    PROPOSAL_API_ENDPOINT =
      'https://m7ci1wtmgf.execute-api.us-east-1.amazonaws.com/prod';
    PROPOSAL_API_ENDPOINT_2 =
      'https://8qm2fg3fx4.execute-api.us-east-1.amazonaws.com/prod';
    PROPOSAL_API_KEY = 'EWK61xXYCM9ofFmBOcOPR4xxxObhZxtwanqD3RHV';
    NORMAL_AUTH_API_ENDPOINT =
      'https://s9j2gvwlk2.execute-api.us-east-1.amazonaws.com/prod';
    COGNITO_HOST = 'https://prod-unity.auth.us-east-1.amazoncognito.com';
    // AUTH_KEY = '';
    CLIENT_ID = 'tc1tih0kcrifpoqrdsqo26467';
    REDIRECTION_URL = 'https://unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia.my.salesforce.com/';
    SOCKET_URL =
      'wss://29nghekakl.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://0kmubx9x18.execute-api.us-east-1.amazonaws.com/production';
    LAUNCH_DARKLY_CLIENT_ID = '630712f317eece1138e5445d';
    ANALYTICS_API_URL =
      'https://3runl1h5nf.execute-api.us-east-1.amazonaws.com';
    break;
  case 'QA':
    // UDEV Data
    PROPOSAL_API_ENDPOINT =
      'https://r1g9pjnmbb.execute-api.us-east-1.amazonaws.com/qa';
    PROPOSAL_API_ENDPOINT_2 =
      'https://gx2ay0yf3g.execute-api.us-east-1.amazonaws.com/qa';
    PROPOSAL_API_KEY = 'YXrOu45imb6d03erOkZB2PuBOsYQYZ93pnmQK6C0';
    NORMAL_AUTH_API_ENDPOINT =
      'https://cokteh9f4e.execute-api.us-east-1.amazonaws.com/qa';
    COGNITO_HOST = 'https://qa-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = '65ie0siehm65hisi4n1avlaa0r';
    REDIRECTION_URL = 'https://qa-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://qa-ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://qa-ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--staging.sandbox.lightning.force.com/';
    SOCKET_URL =
      'wss://nthe94se04.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://za42jrafie.execute-api.us-east-1.amazonaws.com/production';
    ANALYTICS_API_URL =
      'https://b4ituaasif.execute-api.us-east-1.amazonaws.com';
    break;
  case 'L4':
    // L4 Data
    PROPOSAL_API_ENDPOINT =
      'https://v51h8rf355.execute-api.us-east-1.amazonaws.com/l4';
    PROPOSAL_API_ENDPOINT_2 =
      'https://o88gltcnk8.execute-api.us-east-1.amazonaws.com/l4';
    PROPOSAL_API_KEY = 'PZdKkDgB2p3BZXbm9QnTX2aJtdxJkkz37hgYksJ7';
    NORMAL_AUTH_API_ENDPOINT =
      'https://2gydoa5dw6.execute-api.us-east-1.amazonaws.com/l4';
    COGNITO_HOST = 'https://l4-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = '5cal3rohkqshgv9iufmpafu4cr';
    REDIRECTION_URL = 'https://l4-unity.iqvia.app/';
    UBUILD_ARTIFACT = 'https://l4-ubuild.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://l4-ubuild.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--uthfixchk.lightning.force.com/';
    SOCKET_URL =
      'wss://j3xgedpk7j.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://gni5ivpjhh.execute-api.us-east-1.amazonaws.com/production';
    ANALYTICS_API_URL =
      'https://1cg9b1a39f.execute-api.us-east-1.amazonaws.com';
    break;
  case 'DEV':
    // DEV Data
    PROPOSAL_API_ENDPOINT =
      // 'http://localhost:5000';
      'https://olyxc9cn1m.execute-api.us-east-1.amazonaws.com/dev';
    PROPOSAL_API_ENDPOINT_2 =
      'https://a9cm724u04.execute-api.us-east-1.amazonaws.com/dev';
    PROPOSAL_API_KEY = 'SmXooYpNRX4u0dlRrebjt3PUnJJma5cm5ipK3nSV';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://dev-unity.dev.iqvia.app/';
    // REDIRECTION_URL = 'http://localhost:8080';

    UBUILD_ARTIFACT = 'https://dev-ubuild.dev.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://dev-ubuild.dev.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--crm.lightning.force.com/';
    SOCKET_URL =
      'wss://sgag59jkn1.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://g3ukgizvkl.execute-api.us-east-1.amazonaws.com/production';
    ANALYTICS_API_URL =
      'https://4ge59gajp4.execute-api.us-east-1.amazonaws.com';
    break;
  default:
    // DEV Data
    PROPOSAL_API_ENDPOINT =
      'https://olyxc9cn1m.execute-api.us-east-1.amazonaws.com/dev';
    PROPOSAL_API_ENDPOINT_2 =
      'https://542gm4mu97.execute-api.us-east-1.amazonaws.com/dev';
    PROPOSAL_API_KEY = 'SmXooYpNRX4u0dlRrebjt3PUnJJma5cm5ipK3nSV';
    NORMAL_AUTH_API_ENDPOINT =
      'https://byp6zagvkb.execute-api.us-east-1.amazonaws.com/unity-dev';
    COGNITO_HOST = 'https://dev-unity.auth.us-east-1.amazoncognito.com';
    CLIENT_ID = 'uf2jbhv4jcprcdiqc5rupg665';
    REDIRECTION_URL = 'https://dev-unity.dev.iqvia.app/';
    UBUILD_ARTIFACT = 'https://dev-ubuild.dev.iqvia.app/main.js';
    UBUILD_ARTIFACT_V2 = 'https://dev-ubuild.dev.iqvia.app/v2/main.js';
    SF_HOST_URL = 'https://iqvia--crm.lightning.force.com/';
    SOCKET_URL =
      'wss://sgag59jkn1.execute-api.us-east-1.amazonaws.com/production';
    NOTES_SOCKET_URL =
      'wss://g3ukgizvkl.execute-api.us-east-1.amazonaws.com/production';
    ANALYTICS_API_URL =
      'https://4ge59gajp4.execute-api.us-east-1.amazonaws.com';
    break;
}

UBUILD_ENABLED = isUserUbuildAdmin();

const AUTH_API_ENDPOINT = `${COGNITO_HOST}/oauth2/token`;

//* NORMAL AUTH ENPOINTS
const AUTH_API_URL = `${NORMAL_AUTH_API_ENDPOINT}/api/auth`;
const ROLE_ENDPOINT = `${AUTH_API_URL}/changerole`;
const VALIDATE_TOKEN = `${AUTH_API_URL}/validate-token`;
const ACKNOWLEDGE_ENDPOINT = `${AUTH_API_URL}/acknowledgement`;

const AUTH = {
  COGNITO_HOST,
  API_ENDPOINT: AUTH_API_ENDPOINT,
  AUTH_KEY,
  CLIENT_ID,
  REDIRECTION_URL,
  ROLE_ENDPOINT,
  ACKNOWLEDGE_ENDPOINT,
  NORMAL_AUTH_API_ENDPOINT,
  AUTH_API_URL,
  VALIDATE_TOKEN
};

const PROPOSAL_API_URL = `${PROPOSAL_API_ENDPOINT}/api/proposals`;
const PROPOSAL_API_ALL = `${PROPOSAL_API_URL}/v2/all`;
const NON_EDITABLE_SF_FIELD_URL = `${PROPOSAL_API_ENDPOINT}/api/questions/noneditablesffield`;
const PROPOSAL_API_ALL_BY_STATUS = `${PROPOSAL_API_URL}/all-by-status`;
const PROPOSAL_QUESTIONS_API_URL = `${PROPOSAL_API_ENDPOINT}/api/questions`;
const PROPOSAL_FILTER_VALUES = `${PROPOSAL_API_URL}/acceptanceCriteriaValues`;
const PROPOSAL_VALIDATED_DATA = `${PROPOSAL_API_URL}/validations`;
const LOOKUP_OPTIONS_API = `${PROPOSAL_API_ENDPOINT}/api/questions/lookup-options`;
const PROPOSAL_OT_LIST = `${PROPOSAL_API_URL}/opportunityTypes`;
const PROPOSAL_SWITCH_OT = `${PROPOSAL_API_URL}/switch/opportunityType`;
const USER_API_URL = `${PROPOSAL_API_URL}/users`;
const INTEGRATIONS_API_URL = `${PROPOSAL_API_ENDPOINT}/api`;

const PDF_DOWNLOAD_ENDPOINT = `${PROPOSAL_API_ENDPOINT_2}/api/pdf/download`;

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
  MAMOTO_IQVIA,
  NON_EDITABLE_SF_FIELD_URL,
  LOOKUP_OPTIONS_API,
  PROPOSAL_OT_LIST,
  PROPOSAL_SWITCH_OT,
  USER_API_URL,
  INTEGRATIONS_API_URL,
  PDF_DOWNLOAD_ENDPOINT
};

const NOTEPAD_API_URL = `${PROPOSAL_API_ENDPOINT}/api/notes`;
const PROFILE_API_URL = `${PROPOSAL_API_ENDPOINT}/api/user`;
const NOTIFICATION_API_URL = `${PROPOSAL_API_ENDPOINT}/api/app-notification`;
const EMAILTEMPLATES_API_URL = `${PROPOSAL_API_ENDPOINT}/api/proposals/emailTemplates`;
const TASKSLIST_API_URL = `${PROPOSAL_API_ENDPOINT}/api/tasks`;
const CHAT_BOT_API_URL = `${PROPOSAL_API_ENDPOINT}/api/chat-bot`;

const NOTEPAD = {
  NOTEPAD_API_URL
};

const PROFILE = {
  PROFILE_API_URL,
  PROPOSAL_API_ENDPOINT
};
const NOTIFICATION = {
  NOTIFICATION_API_URL
};

const EMAILTEMPLATES = {
  EMAILTEMPLATES_API_URL
};

const TASKSLIST = {
  TASKSLIST_API_URL
};

const CHATBOT = {
  CHAT_ENDPOINT: `${CHAT_BOT_API_URL}/chat`,
  FEEDBACK_ENDPOINT: `${CHAT_BOT_API_URL}/history-feedback`
};

const APPROVALS_URL = `${PROPOSAL_API_URL}/approvals`;
const CUSTOM_QUESTIONS_API_URL = `${PROPOSAL_API_ENDPOINT}/api/questions/custom-question`;
const CUSTOM_QUESTIONS_DELETE_API_URL = `${PROPOSAL_API_ENDPOINT}/api/questions/delete-custom-question`;
const ANALYTICS_URL = `${ANALYTICS_API_URL}/track`;

export {
  AUTH,
  PROPOSAL,
  NOTEPAD,
  UBUILD_ENABLED,
  UBUILD_ARTIFACT,
  UBUILD_ARTIFACT_V2,
  SF_HOST_URL,
  SOCKET_URL,
  PROFILE,
  NOTIFICATION,
  NOTES_SOCKET_URL,
  LAUNCH_DARKLY_CLIENT_ID,
  APPROVALS_URL,
  CUSTOM_QUESTIONS_API_URL,
  CUSTOM_QUESTIONS_DELETE_API_URL,
  ANALYTICS_URL,
  EMAILTEMPLATES,
  TASKSLIST,
  CHATBOT
};
