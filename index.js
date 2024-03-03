const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// find port
const PORT = process.env.PORT || 8080;

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// set port
app.set('port', PORT);

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Start express
app.listen(PORT, () => 
{
    console.log('Server listening on port ' + PORT);
});

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}