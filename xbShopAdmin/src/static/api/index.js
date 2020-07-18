const api = require('./api');

const _basepath = 'http://localhost:1220';
// const _basepath = 'http://localhost:3000';
const _apiprefix = 'api/v1';

export function getRequestUrl(type, requestUrl) {
    return `${_basepath}/${_apiprefix}/${type}/${api[type][requestUrl]}`;
}
