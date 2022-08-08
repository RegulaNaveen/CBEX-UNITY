// axios implementation for app
import axios from 'axios';
import { logout } from '../redux/actions/auth-actions';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { API } from '../constants';

const { API_KEY } = API.PROPOSAL;

const axiosInstance = axios.create({
  headers: {
    'x-api-key': API_KEY,
    'x-access-token': getAccessToken()
  }
});

// For POST requests
axiosInstance.interceptors.response.use(
  res => {
    if (res.status === 500) console.log('500 error came with res ', res);
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
