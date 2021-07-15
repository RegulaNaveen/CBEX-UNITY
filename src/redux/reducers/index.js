import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
// import authReducer from './auth';
import sidebarReducer from './sidebar';
import ssoAuthReducer from './sso-auth';

const rootReducer = combineReducers({
  // auth: authReducer,
  ssoAuth: ssoAuthReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
