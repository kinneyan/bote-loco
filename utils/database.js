const MongoClient = require('mongodb').MongoClient;

// get environment variables
require('dotenv').config();
const url = process.env.DB_URI;

/**
 * Creates a MongoClient object for the MONGODB_URI environment variable
 * 
 * @returns {MongoClient} MongoClient object
 */
const getMongoClient = () =>
{
    return new MongoClient(url);
};

module.exports = { getMongoClient };