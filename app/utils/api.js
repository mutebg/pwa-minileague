import config from '../config';

const apiFetch = (url, method = 'get', data = {}) => {
  const options = {
    method,
    headers: {
      'X-Auth-Token': '5f3f1456287843238d1c82405f83e652',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options).then(response => response.json());
};

// ajax get method
export const get = path => apiFetch(config.API_URL + path, 'GET', null);

// ajax post method
export const post = (path, data) => apiFetch(config.API_URL + path, 'POST', data);

// ajax delete method
export const remove = (path, data) => apiFetch(config.API_URL + path, 'DELETE', data);

// ajax patch method
export const patch = (path, data) => apiFetch(config.API_URL + path, 'PATCH', data);
