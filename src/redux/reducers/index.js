import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
import authReducer from './auth';
import sidebarReducer from './sidebar';

const rootReducer = combineReducers({
  auth: authReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  sidebar: sidebarReducer
});

export default rootReducer;
