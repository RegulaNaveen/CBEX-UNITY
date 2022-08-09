import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import rootReducer from './redux/reducers';
import { logout } from './redux/actions/auth-actions';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const { dispatch } = store;

const axiosInstance = axios.create();

// For POST requests
axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (
      (err.response.status === 500 &&
        err.response.data.message === 'Invalid Access Token') ||
      err.response.data.message.includes('accessToken')
    ) {
      console.log('logging out of system because of token expiry...Bye bye');
      dispatch(logout());
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export { axiosInstance, store };
