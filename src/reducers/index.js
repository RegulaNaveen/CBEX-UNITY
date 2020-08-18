import { combineReducers } from 'redux';
import proposalsReducer from './proposals';
import proposalReducer from './proposal';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer
});

export default rootReducer;
