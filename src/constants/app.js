const DEFAULT = {
  OK: 'Ok',
  DELETE: 'Delete',
  DUPLICATE: 'Duplicate',
  EMAIL: 'Email',
  ALERT: 'Alert',
  CLOSE: 'Close',
  SUCCESS: 'Success',
  CANCEL: 'Cancel',
  CHANGE: 'Change',
  SELECT_ITEM: 'Select item...',
  SELECT_OPTION_MSG: 'You can select one option',
  ERROR_400: 'Error 400 bad request !!',
  ERROR_404: 'Error 404 not found !!',
  REQUEST_FAILED: 'Request failed due to an error !!',
  CLICK_TO_ANS: 'Click to answer',
  CLICK_ICON_TO_BEGIN: 'Click icon to begin'
};

const PROPOSAL = {
  QUESTION_TEMP_VERSION: 'Question Template Version',
  OPPORTUNITY_TYPE: 'Opportunity Type',
  SWITCH_TEMP: 'Switch Template',
  SWITCH_TEMP_MODAL_TITLE: 'Opportunity Type Override',
  SWITCH_TEMP_MODAL_DESCRIPTION:
    'Choose from available types if you wish. Changing template types may take a few moments',
  SWITCH_TEMP_SUCCESS: 'Opportunity type has been changed successfully',
  SWITCH_TEMP_FAILED: 'Operation failed due to error',
  SWITCH_TEMP_PROGRESS_TITLE: 'Opportunity Type Change',
  SWITCH_TEMP_PROGRESS_MSG: 'Switching template is in progress..',
  EVENT_LAUNCHER: 'Event Launcher',
  LAUNCH_OUTLOOK: 'Launch Outlook',
  SELECT_VARIABLES: 'Select Variables',
  ATTENDEES: 'Attendees'
};

const PROFILE = {
  ACCOUNT_PREFERENCES: 'Account Preferences',
  RECENT_ACTIVITY: 'Recent Activity',
  EMAIL: 'Email',
  USER_ROLE: 'User Role',
  ROLE_HELPER_TEXT:
    'Your role will help determine the most appropriate questions displayed',
  TIME_ZONE: ' Time Zone',
  TIME_ZONE_HELPER_TEXT:
    'Your time zone can determine when notifications are sent',
  ERROR_TEXT: 'Something went wrong, Please try after sometime.',
  NOTIFICATION_PREFERENCE: 'Notification Preferences',
  NOTIFICATION: 'Notification',
  IN_APP: ' In-App',
  NOT_FOUND: ' Not found!',
  EMAIL_PREFERENCES: 'Email Preferences',
  LOGOUT: ' Log Out'
};

const REFRESH_WEBSOCKET_CONNECTION = 60000; // 1 minute
export const QUESTION_UNLOCK_TIMEOUT = 90 * 1000; // 90 seconds (1.5minutes)
export const URL_REGEXP = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
export const PROPOSAL_TEAM_USER_MATCH_REGEXP = /([a-zA-Z0-9\W]*\w)(\(.*\))/; // matches proposal team individual user
export const RTE_DATA_ATTR_REGEXP = /data-[a-zA-Z0-9-]*=\"[a-zA-Z0-9-]*\"/g; // matches RichTextEditor data attributes

export { DEFAULT, PROPOSAL, REFRESH_WEBSOCKET_CONNECTION, PROFILE };
