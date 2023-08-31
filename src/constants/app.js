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
  REFRESH: 'Refresh',
  SELECT_ITEM: 'Select item...',
  SELECT_OPTION_MSG: 'You can select one option.',
  SELECT_OPTION_LATEST_MSG: 'You are on the latest version.',
  SELECT_OPTION_REFRESH_MSG: 'Please refresh to update the template.',
  ERROR_400: 'Error 400 bad request !!',
  ERROR_404: 'Error 404 not found !!',
  REQUEST_FAILED: 'Request failed due to an error !!',
  CLICK_TO_ANS: 'Click to answer',
  CLICK_ICON_TO_BEGIN: 'Click icon to begin',
  ARE_YOU_SURE: 'Are you sure?'
};

const PROPOSAL = {
  QUESTION_TEMP_VERSION: 'Question Template Version',
  OPPORTUNITY_TYPE: 'Opportunity Type',
  SWITCH_TEMP: 'Update Template',
  SWITCH_TEMP_MODAL_TITLE: 'Opportunity Type Override',
  SWITCH_TEMP_MODAL_DESCRIPTION:
    'Choose from available types if you wish. Changing template types may take a few moments.',
  SWITCH_TEMP_SUCCESS: 'Opportunity type has been updated successfully',
  SWITCH_TEMP_FAILED: 'Operation failed due to error',
  SWITCH_TEMP_PROGRESS_TITLE: 'Opportunity Type Update',
  SWITCH_TEMP_PROGRESS_MSG: 'Updating template',
  EVENT_LAUNCHER: 'Event Launcher',
  LAUNCH_OUTLOOK: 'Launch Outlook',
  SELECT_VARIABLES: 'Select Variables',
  ATTENDEES: 'Attendees'
};

export const DashboardSFUpDATE = {
  Phase_P__c: 'phase',
  Name: 'customer',
  Legacy_Quintiles_Opportunity_Number__c: 'CRM #',
  Bid_Due_Date__c: 'bid due date',
  Line_of_Business__c: 'Line of business',
  Is_this_IQVIA_Biotech__c: 'Is this IQVIA Biotech',
  Therapy_Area__c: 'Therapeutic area',
  Protocol_Number__c: 'protocol number',
  Drug_Product_Name__c: 'Product name',
  Verbatim_Indication_Term__c: 'verbatim indication',
  StageName: 'opportunity status'
};

export const OpportunitySFUpDATE = {
  Phase_P__c: 'Phase',
  Name: 'Customer',
  Legacy_Quintiles_Opportunity_Number__c: 'CRM #',
  Bid_Due_Date__c: 'Bid due date',
  Line_of_Business__c: 'Line of business',
  Is_this_IQVIA_Biotech__c: 'Is this IQVIA Biotech',
  Therapy_Area__c: 'Therapeutic area',
  Protocol_Number__c: 'Protocol number',
  Drug_Product_Name__c: 'Product name',
  Verbatim_Indication_Term__c: 'Verbatim indication',
  StageName: 'Opportunity status',
  Early_Engagement_Development_Plan__c: 'earlyEngagementDevelopmentPlan'
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

const APPROVALS = {
  DELETE_MSG:
    'Delete this approval section if the additional approval is not required.',
  ACTION_BUTTON_LOCKED_TOOLTIP_MSG:
    'Another user is editing this Approval. These buttons will be enabled once they have completed and saved.'
};

const SEARCH = {
  TITLE_FILTERED_RESULTS: 'Filtered Results',
  CONTENT_FILTERED_RESULTS:
    'The filters you have applied will affect the search results',
  TITLE_SEARCH_ACTIVE: 'Search Active',
  CONTENT_SEARCH_ACTIVE:
    'The filters you are applying will affect your search results'
};

const BID_TYPES = {
  Early_Engagement_Bid: 'Early Engagement',
  Clinical_Bid: 'Bid'
};

const REFRESH_WEBSOCKET_CONNECTION = 60000; // 1 minute
export const QUESTION_UNLOCK_TIMEOUT = 90 * 1000; // 90 seconds (1.5minutes)
export const PROPOSAL_TEAM_USER_MATCH_REGEXP = /([a-zA-Z0-9\W]*\w)(\(.*\))/; // matches proposal team individual user
export const PROPOSAL_TEAM_EMAIL_MATCH_REGEXP = /[a-zA-Z\w]*\((.*@.*)\)/; // matches proposal team user email
export const RTE_DATA_ATTR_REGEXP = /data-[a-zA-Z0-9-]*=\"[a-zA-Z0-9-]*\"/g; // matches RichTextEditor data attributes
export const NOTEPAD_UI_ID = Symbol('NOTEPAD');
export const DEFAULT_TABS_LEN = 4;

export {
  DEFAULT,
  PROPOSAL,
  REFRESH_WEBSOCKET_CONNECTION,
  PROFILE,
  APPROVALS,
  SEARCH,
  BID_TYPES
};
