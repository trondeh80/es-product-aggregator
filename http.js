const fetch = require('node-fetch');

const headers = createHeaders();

function post(url, data) {
    return fetch(createUrl(url), {
        method: 'post',
        body: JSON.stringify(data),
        headers
    });
}

function put(url, data) {
    return fetch(createUrl(url), {
        method: 'put',
        body: JSON.stringify(data),
        headers
    });
}
function get(url) {
    return fetch(createUrl(url), {
        method: 'get',
        headers
    });
}

function createHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${process.env.API_KEY}`
    };
}

// const HOST = 'https://es-product-aggretaor-ria.es.eastus2.azure.elastic-cloud.com:9243';
const HOST = 'https://api.elastic-cloud.com/api/v1/deployments';
function createUrl(urlEndpoint) {
    return `${HOST}${urlEndpoint}`;
}

module.exports = {
    get,
    post,
    put
};