import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
// import authReducer from './auth';
import sidebarReducer from './sidebar';
import ssoAuthReducer from './sso-auth';
import NotepadReducer from './notepad';
import profileReducer from './profile';

const rootReducer = combineReducers({
  // auth: authReducer,
  ssoAuth: ssoAuthReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  sidebar: sidebarReducer,
  notepad: NotepadReducer,
  profile: profileReducer
});

export default rootReducer;
