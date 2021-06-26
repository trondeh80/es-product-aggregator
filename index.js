require('dotenv').config();
const { post } = require('./http');

(async () => {
    // start by querying 
    await query();
    console.log('done');

})();

async function query() {
    const response = await post('/products-1/_search', createQuery());
    const queryJson = await response.json();
    console.log(queryJson);

    const onlyAggs = await post('/products-1/_search', createAggregateQuery());
    const onlyAggsJson = await onlyAggs.json();
    console.log(onlyAggsJson);
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