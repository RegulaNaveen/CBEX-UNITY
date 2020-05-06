import { combineReducers } from 'redux';
import proposalReducer from './proposal';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  proposal: proposalReducer
});

export default rootReducer;
