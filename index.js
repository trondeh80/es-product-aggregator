const { post } = require('./http');
require('dotenv').config();

(async () => {
    // start by querying 
    await query();
    console.log('done');

})();

async function query() {
    const response = await post('/products-1/_search', createQuery());
    console.log(response);

    const onlyAggs = await post('/products-1/_search', createAggregateQuery());
    console.log(onlyAggs);
}

function createQuery(base = {}) {
    let esQuery = {
        ...base,
        "query": {
            "bool": {
            "must": [
                {
                "term": {
                    "data.attributes.category": {
                    "value": 1
                    }
                }
                }
            ]
            }
        },
        // TODO: Model the aggregation after attributes
        "aggs": {
            "year": {
                "terms": { "field": "data.attributes.year" },
                "aggs": {
                    "yearCat": {
                        "terms": { "field": "data.attributes.category" }
                    }
                }
            },
            "category": {
                "terms": { "field": "data.attributes.category" }
            }
        }    
    };


    return esQuery;
}

function createAggregateQuery() {
    return {
      "query": {"match_all": {}}, 
      "size": 0,
      "aggs": {
            "year": {
                "terms": { "field": "data.attributes.year" },
                "aggs": {
                    "yearCat": {
                        "terms": { "field": "data.attributes.category" }
                    }
                }
            },
            "category": {
                "terms": { "field": "data.attributes.category" }
            }
        }
    };
}