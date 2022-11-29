// hello_algolia.js
import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch(
  process.env.ALGOLIA_KEY,
  process.env.ALGOLIA_TOKEN
);

// Create a new index and add a record
const index = client.initIndex("pets");

export { index };
