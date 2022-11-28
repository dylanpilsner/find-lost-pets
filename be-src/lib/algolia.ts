// hello_algolia.js
import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch("F8WG38ZBKR", "f8a2b76593826ad7003fc6fbe85cd3a4");

// Create a new index and add a record
const index = client.initIndex("pets");

export { index };
