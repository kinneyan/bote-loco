const { hash } = require("../utils/hashing");

const register = (async (req, res, next) =>
{
    let response = {};
    let body = {};

    try
    {
        body.username = req.body.username;
        body._password = req.body.password;
        body.firstName = req.body.firstName;
        body.lastName = req.body.lastName;
        body.email = req.body.email;
        if (body.username == null || body._password == null || body.firstName == null || 
            body.lastName == null || body.email == null) throw new Error();
    }
    catch (e)
    {
        response.error = "Bad request. Missing or invalid information.";
        res.status(400).json(response);
        return;
    }

    try
    {
        const db = req.app.locals.db;

        // check if username is taken
        const usernameCheck = await db.collection("Users").find({ username: body.username }).toArray();
        if (usernameCheck.length > 0)
        {
            const usernameTaken = 
            {
                name: "UsernameTaken",
                message: "Username is already taken.",
                status: 409
            }
            throw usernameTaken;
        }

        // hash password
        body.password = hash(body._password);
        delete(body._password);
        
        const add = await db.collection("Users").insertOne(body);
        if (add.acknowledged === false)
        {
            const serverFailed = 
            {
                name: "ServerFailed",
                message: "Server failed to register user.",
                status: 500
            }
            throw serverFailed;
        }

        // return success
        res.status(200).json(response);
        return;
    }
    catch (e)
    {
        response.error = e.message || e.toString();
        res.status(e.status || 500).json(response);
        return;
    }
});

module.exports = { register };