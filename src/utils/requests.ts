import axios from 'axios';

export const requests = {
  fetchOriginals: '/movies?genre=originals',
  fetchAction: '/movies?genre=action',
  fetchComedy: '/movies?genre=comedy',
  fetchFamily: '/movies?genre=family',
}

export const instance = axios.create({
  baseURL: 'https://movies-api-jyotisko-001.herokuapp.com/api/v1',
  timeout: 30000
});
