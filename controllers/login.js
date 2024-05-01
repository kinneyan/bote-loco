const { generateHash } = require("../utils/hashing");

const login = (async (req, res, next) =>
{
    let response = {};
    let username = null;
    let _password = null;

    try
    {
        username = req.body.username;
        _password = req.body.password;
    }
    catch (e)
    {
        response.error = "Bad request. Missing or invalid information.";
        res.status(400).json(response);
        return;
    }

    try
    {
        const invalidLogin = 
        { 
            name: "InvalidLogin", 
            message: "Username or password is incorrect", 
            status: 200 
        };
        
        const body = { username: username };
        const db = req.app.locals.db;

        const query = await db.collection("Users").find(body).toArray();
        if (query.length < 1) throw invalidLogin;

        // check passwords
        const hashedPassword = generateHash(_password, query[0].password.salt);
        if (query[0].password.hash !== hashedPassword.hash) throw invalidLogin;

        // generate bearer token
        res.locals.tokenBody = 
        {
            id: query[0]._id,
            username: username,
            email: query[0].email,
            firstName: query[0].firstName,
            lastName: query[0].lastName,
        }
        res.locals.response = response;
        next();
    }
    catch (e)
    {
        response.error = e.message || e.toString();
        res.status(e.status || 500).json(response);
        return;
    }
});

module.exports = { login };