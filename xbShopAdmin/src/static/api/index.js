const api = require('./api');

const _basepath = 'http://localhost:1220';

export function getRequestUrl(requestUrl) {
    return `${_basepath}/${api[requestUrl]}`;
}
