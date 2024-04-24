const MongoClient = require('mongodb').MongoClient;
const CONNECTION_URI = process.env.ATLAS_URI || "";

const client = new MongoClient(CONNECTION_URI);
let db = null;

try
{
    client.connect();
    db = client.db();
    db.command({ ping: 1 });
}
catch (e)
{
    console.error(e);
}

module.exports = { db };