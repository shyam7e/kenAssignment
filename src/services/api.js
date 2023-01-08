import axios from 'axios';
import {NAPSTER_API_KEY, BASE_URL} from '@env';
const headers = {
  apikey: NAPSTER_API_KEY,
};
const instance = axios.create({
  baseURL: BASE_URL,
  headers: headers,
});
export {instance, headers};
