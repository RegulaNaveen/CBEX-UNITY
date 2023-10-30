import axios from 'axios';
import { ANALYTICS_URL } from '../constants/api';

export async function trackEventApi(data) {
  return axios.post(ANALYTICS_URL, data);
}
