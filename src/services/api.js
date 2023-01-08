import axios from 'axios';
import {NAPSTER_API_KEY, BASE_URL} from '@env';
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: NAPSTER_API_KEY,
  },
});
export default instance;
