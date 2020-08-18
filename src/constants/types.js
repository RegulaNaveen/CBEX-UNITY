// @flow

const AUTH = {
  AUTH_SUCCESS: 'auth_success',
  AUTH_LOADING: 'auth_loading',
  AUTH_ERROR: 'auth_error',
  LOGOUT_IN_PROGRESS: 'logout_in_progress',
  LOGOUT_SUCCESS: 'logout_sucess',
  LOGOUT_ERROR: 'logout_error',
  REFRESH_TOKEN_IN_PROGRESS: 'refresh_token_in_progress',
  REFRESH_TOKEN_SUCCESS: 'refresh_token_success',
  REFRESH_TOKEN_ERROR: 'refresh_token_error',
  PUT_ROLE_IN_PROGRESS: 'put_role_in_progress',
  PUT_ROLE_SUCCESS: 'put_role_success',
  PUT_ROLE_ERROR: 'put_role_error',
  FORGOT_PASSWORD_IN_PROGRESS: 'forgot_password_in_progress',
  FORGOT_PASSWORD_SUCCESS: 'forgot_password_success',
  FORGOT_PASSWORD_ERROR: 'forgot_password_error',
  RESET_PASSWORD_IN_PROGRESS: 'reset_password_in_progress',
  RESET_PASSWORD_SUCCESS: 'reset_password_success',
  RESET_PASSWORD_ERROR: 'reset_password_error'
};

const PROPOSAL = {
  PROPOSAL_INFO: 'proposal_info',
  PROPOSAL_INFO_LOADING: 'proposal_info_loading',
  PROPOSAL_INFO_ERROR: 'proposal_info_error',
  PROPOSAL_ANSWER: 'proposal_answer',
  PROPOSAL_ANSWER_LOADING: 'proposal_answer_loading',
  PROPOSAL_ANSWER_ERROR: 'proposal_answer_error',
  QUESTION_SECTION_INFO: 'question_section_info',
  QUESTION_SECTION_LOADING: 'question_section_loading',
  QUESTION_SECTION_ERROR: 'question_section_error',
  ANSWER_TYPES_INFO: 'answer_types_info',
  ANSWER_TYPES_LOADING: 'answer_types_loading',
  ANSWER_TYPES_ERROR: 'answer_types_error',
  ROLES_INFO: 'roles_info',
  ROLES_LOADING: 'roles_loading',
  ROLES_ERROR: 'roles_error',
  PROPOSAL_SET_QUESTION: 'proposal-set-question',
  PROPOSAL_SET_QUESTION_LOADING: 'proposal-set-question-loading',
  PROPOSAL_SET_QUESTION_ERROR: 'proposal-set-question-error'
};

const PROPOSALS = {
  SET_PROPOSAL_VIEW_TYPE: 'set_proposal_view_type'
};

export { AUTH, PROPOSALS, PROPOSAL };
