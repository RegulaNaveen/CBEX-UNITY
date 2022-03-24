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
  RESET_PASSWORD_ERROR: 'reset_password_error',
  ON_GET_LOOKUP_USERS: 'on_get_lookup_users',
  ERROR_ON_GET_LOOKUP_USERS: 'error_on_get_lookup_users'
};

const SSO_AUTH = {
  ON_USER_LOGIN: 'on_user_login',
  ON_USER_LOGOUT: 'on_user_logout',
  ERROR_ON_USER_LOGIN: 'error_on_user_login',
  ON_CHANGE_ROLE: 'on_change_role',
  ERROR_ON_CHANGE_ROLE: 'error_on_change_role',
  ON_REFRESH_USER_DATA: 'on_refresh_user_data',
  ON_GET_LOOKUP_USERS: 'on_get_lookup_users',
  ERROR_ON_GET_LOOKUP_USERS: 'error_on_get_lookup_users',
  DEFAULT_ROLE: 'All'
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
  PROPOSAL_SET_QUESTION_ERROR: 'proposal-set-question-error',
  PROPOSAL_BOX_ID: 'proposal_box_id',
  PROPOSAL_BOX_ID_LOADING: 'proposal_box_id_loading',
  PROPOSAL_BOX_ID_ERROR: 'proposal_box_id_error',
  UPDATE_MODIFIED_QUESTION: 'update_modified_question',
  ON_FETCHING_VALIDATED_PROPOSAL_DATA: 'on_fetching_validated_proposal_data',
  VALIDATED_PROPOSAL_DATA: 'validated_proposal_data',
  VALIDATED_PROPOSAL_DATA_ERROR: 'validated_proposal_data_error',
  ON_APPLY_QUESTIONS_FILTER: 'on_apply_questions_filter',
  ON_QUESTIONS_FILTERED: 'on_questions_filtered',
  CLEAR_QUESTIONS_FILTER: 'clear_questions_filter',
  RESET_QUESTIONS_FILTER: 'reset_questions_filter',
  EXPAND_ALL_SECTIONS: 'expand_all_sections',
  SET_EDIT_QUESTION_DATA: 'set_edit_question_data',
  PROPOSAL_EDIT_QUESTION: 'proposal_edit_question',
  PROPOSAL_DELETE_QUESTION: 'proposal_delete_question',
  OPPORTUNITY_INFO: 'opportunity_info',
  UPDATE_BOX_BIDS: 'update-box-bids',
  CHANGE_BID: 'CHANGE_BID',
  ADD_NEW_BID: 'ADD_NEW_BID'
};

const PROPOSALS = {
  SET_PROPOSAL_VIEW_TYPE: 'set_proposal_view_type',
  ON_GET_PROPOSALS: 'on_get_proposals',
  ERROR_ON_GET_PROPOSALS: 'error_on_get_proposals',
  ON_PROPOSALS_LOADING: 'on_proposals_loading',
  ON_FILTER_PROPOSALS: 'on_filter_proposals',
  ON_SET_PROPOSALS_FILTERS: 'on_set_proposals_filters',
  SET_PROPOSAL_FILTERING: 'set_proposal_filtering',
  SET_PAGE: 'set_page',
  SET_NUM_OF_ROWS: 'set_num_of_rows'
};

const SIDEBAR = {
  OPEN_SECTION: 'open_section',
  IS_OPEN: 'is_open'
};

const NOTEPAD = {
  FETCH_NOTES: 'fetch_notes',
  FETCH_NOTES_DONE: 'fetch_notes_done',
  ERROR_FETCHING_NOTES: 'error_fetching_notes',
  ADD_NOTE: 'add_note',
  ADD_NOTE_DONE: 'add_note_done',
  UPDATE_NOTE: 'update_note',
  UPDATE_NOTE_DONE: 'update_note_done',
  ERROR_UPDATING_NOTE: 'error_updating_note',
  ERROR_ADDING_NOTE: 'error_adding_note',
  MODE_DEFAULT: 'notepad_mode_default',
  MODE_READ: 'notepad_mode_read',
  MODE_EDIT: 'notepad_mode_edit',
  CHANGE_MODE: 'notepad_change_mode'
};

const UBUILD_ADMIN = 'ubuildAdmin';
export { AUTH, SSO_AUTH, PROPOSALS, PROPOSAL, SIDEBAR, NOTEPAD, UBUILD_ADMIN };
