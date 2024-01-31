import { BASE_URL } from './utils';

export const register = (email, password) => {
  return doRequest(
    '/signup',
    'POST',
    {email, password}
  )
}

export const login = (email, password) => {
  return doRequest(
    '/signin',
    'POST',
    {email, password}
  )
}

export const getUserData = (authToken) => {
  return doRequest(
    '/users/me',
    'GET',
    {},
    { 'Authorization' : `Bearer ${authToken}` }
  )
}

const doRequest = (endPointUrl, method, data, headers = {}) => {
  let params = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }
  if (method === 'POST') {
    params = { ...params, body: JSON.stringify(data) }
  }

  return fetch(BASE_URL + endPointUrl, params)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Api error with status ${response.status}`);
    })
}
