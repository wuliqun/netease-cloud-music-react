import axios from 'axios'
import { baseUrl } from './serviceConfig'

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

export * from './playlistService'
export * from './songService'