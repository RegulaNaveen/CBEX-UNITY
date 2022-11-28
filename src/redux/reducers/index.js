import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
import sidebarReducer from './sidebar';
import ssoAuthReducer from './sso-auth';
import NotepadReducer from './notepad';
import profileReducer from './profile';
import notificationReducer from './notification';
import approvalsReducer from './approvals';

const rootReducer = combineReducers({
  ssoAuth: ssoAuthReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  sidebar: sidebarReducer,
  notepad: NotepadReducer,
  profile: profileReducer,
  notification: notificationReducer,
  approvals: approvalsReducer
});

export default rootReducer;
