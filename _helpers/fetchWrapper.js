import { authHeader } from './auth-header';
const COMMON_URL = process.env.REACT_APP_BACKEND_URL;

function get(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    credentials: 'include',
  };
  return fetch(COMMON_URL + url, requestOptions).then(handleResponse);
}

function post(url, body, contentType) {
  let requestOptions = {
    method: 'POST',
    body: contentType ? body : JSON.stringify(body),
    credentials: 'include',
  };
  if (!contentType) {
    requestOptions.headers = authHeader();
  }

  return fetch(COMMON_URL + url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(body),
    credentials: 'include',
  };
  return fetch(COMMON_URL + url, requestOptions).then(handleResponse);
}

function patch(url, body) {
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(body),
    credentials: 'include',
  };
  return fetch(COMMON_URL + url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
    credentials: 'include',
  };
  return fetch(COMMON_URL + url, requestOptions).then(handleResponse);
}

// helper functions
function handleResponse(response) {
  return response.text().then((text) => {
    try {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.statusCode === 401) {
          window.location.reload(false);
        }
        const error = (data && data) || response;
        return Promise.reject(error);
      }
      return data;
    } catch (e) {
      return Promise.reject(response);
    }
  });
}

export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};
