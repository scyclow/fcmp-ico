import _ from 'utils/_';

async function get(route = '', headers = {}) {
  const response = await fetch(API_ROOT + route, { headers });
  return response.json();
}

async function post(route = '', withBody = {}, withHeaders = {}) {
  const method = 'POST';
  const headers = _.assign({ 'Content-Type': 'application/json' }, withHeaders);
  const body = JSON.stringify(withBody);

  const response = await fetch('https://fastcashmoneyplus.herokuapp.com/api/' + route, { headers, body, method });
  return response.json();
}

export default { get, post };
