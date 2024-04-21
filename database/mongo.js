const MongoClient = require('mongodb').MongoClient;
const CONNECTION_URI = process.env.ATLAS_URI || "";

const client = new MongoClient(CONNECTION_URI);

try
{
    client.connect();
    client.db("ping").command({ ping: 1 });
}
catch (e)
{
    console.error(e);
}

module.exports = { client };