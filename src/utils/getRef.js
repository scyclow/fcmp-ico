// @flow

function getQueryParams() {
  return location.search.slice(1).split('&').reduce((params, param) => {
    const [key, value] = param.split('=');
    params[key] = value;
    return params
  }, {})
}

export function getRef() {
  const params = getQueryParams();
  const ref = params.r || params.ref || params.referral || localStorage.getItem('ref');

  if (ref) localStorage.setItem('ref', ref)

  return ref || ''
}
