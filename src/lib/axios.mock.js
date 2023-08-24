import axios from 'axios';
const baseURL = process.env.REACT_APP_URL

export const apiMock = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});