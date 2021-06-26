const { post } = require('./http');
require('dotenv').config();

(async () => {
    // start by querying 
    await query();
    console.log('done');
    
})();

async function query() {
    const esQuery = {};
    const response = await post(url, createQuery(esQuery));
    console.log(response);
}

function createQuery(base = {}) {
    let esQuery = {
        ...base,
        query: {
            
        },
        aggs: {
            isLeisure: {
                terms: { field: 'attributes.is_leisure' }
            },
            
            isPro: {
                terms: { field: 'attributes.is_pro' }
            }
        }
    };


    return esQuery;
}