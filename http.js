const fetch = require('node-fetch');
// const API_KEY = process.env.API_KEY;

export function post(url, data) {
    return fetch(createUrl(url), {
        method: 'post',
        body: JSON.stringify(data),
        headers: createHeaders()
    });
}

export function put(url, data) {
    return fetch(createUrl(url), {
        method: 'put',
        body: JSON.stringify(data),
        headers: createHeaders()
    });
}

export function get(url) {
    return fetch(createUrl(url), {
        method: 'get',
        headers: createHeaders()
    });
}

function createHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${process.env.API_KEY}`
    };
}

const HOST = 'https://es-product-aggretaor-ria.es.eastus2.azure.elastic-cloud.com:9243';
function createUrl(urlEndpoint) {
    return `${HOST}${urlEndpoint}`;
}