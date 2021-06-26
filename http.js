const fetch = require('node-fetch');
// const API_KEY = process.env.API_KEY;
console.log('HEADERs: ', createHeaders());

function post(url, data) {
    return fetch(createUrl(url), {
        method: 'post',
        body: JSON.stringify(data),
        headers: createHeaders()
    });
}

function put(url, data) {
    return fetch(createUrl(url), {
        method: 'put',
        body: JSON.stringify(data),
        headers: createHeaders()
    });
}
function get(url) {
    return fetch(createUrl(url), {
        method: 'get',
        headers: createHeaders()
    });
}

function createHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${process.env.API_KEY}`
    };
}

const HOST = 'https://es-product-aggretaor-ria.es.eastus2.azure.elastic-cloud.com:9243';
function createUrl(urlEndpoint) {
    return `${HOST}${urlEndpoint}`;
}

module.exports = {
    get,
    post,
    put
};