import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
import sidebarReducer from './sidebar';
import ssoAuthReducer from './sso-auth';
import NotepadReducer from './notepad';
import profileReducer from './profile';
import notificationReducer from './notification';
import approvalsReducer from './approvals';
import searchReducer from './search';
import uiReducer from './ui';
import unityTabsReducer from './unityTabs';
import timelineReducer from './timeline';
import emailTemplatesReducer from './emailTemplates';
import tasksReducer from './tasks';
import opportunitiesReducer from './opportunities';

const rootReducer = combineReducers({
  ssoAuth: ssoAuthReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  sidebar: sidebarReducer,
  notepad: NotepadReducer,
  profile: profileReducer,
  notification: notificationReducer,
  approvals: approvalsReducer,
  search: searchReducer,
  ui: uiReducer,
  unitytab: unityTabsReducer,
  timeline: timelineReducer,
  emailTemplates: emailTemplatesReducer,
  tasks: tasksReducer,
  opportunities: opportunitiesReducer
});

export default rootReducer;
