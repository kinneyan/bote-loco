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

        const hashedPassword = generateHash(_password, query[0].password.salt);
        if (query[0].password.hash !== hashedPassword.hash) throw invalidLogin;
    }
    catch (e)
    {
        response.error = e.message || e.toString();
        res.status(e.status || 500).json(response);
        return;
    }

    response.error = response.error || "";
    res.status(200).json(response);
    return;
});

module.exports = { login };