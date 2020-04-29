import { combineReducers } from 'redux';
import proposalReducer from './proposal';

const rootReducer = combineReducers({
  proposal: proposalReducer
});

export default rootReducer;
