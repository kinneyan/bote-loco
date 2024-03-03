const { getMongoClient } = require('../utils/database');
const { shaHash } = require('../utils/hash');
const { generateJWT } = require('../utils/auth');

const register = (async (req, res, next) => 
{
    // body: username, password, confirmPassword, firstName, lastName, email
    // response: JWT bearer token

    // initialize response object
    let ret = {};
    ret.error = '';

    let _username = '';
    let _password = '';
    let _confirmPassword = '';
    let _firstName = '';
    let _lastName = '';
    let _email = '';

    try
    {
        // process body 
        const { username, password, confirmPassword, firstName, lastName, email } = req.body;
        _username = username.trim();
        _password = password.trim();
        _confirmPassword = confirmPassword.trim();
        _firstName = firstName.trim();
        _lastName = lastName.trim();
        _email = email.trim();
    }
    catch (e) 
    {
        ret.error = 'Bad request syntax. Missing or incorrect information.'
        res.status(400).json(ret);
        return;
    }

    // check if passwords match
    if (_password !== _confirmPassword)
    {
        ret.error = "Passwords do not match.";
        res.status(200).json(ret);
        return;
    }
    
    const newUser = 
    {
        FirstName: _firstName,
        LastName: _lastName,
        Login: _username,
        Password: shaHash(_password),
        Email: _email
    }

    try
    {
        // send user to the database 
        const client = getMongoClient();
        client.connect();
        const db = client.db();

        let bearer = '';

        // check if username exists
        const duplicate = await db.collection('users').find({Login: newUser.Login}).toArray();
        if (duplicate.length > 0)
        {
            ret.error = "Username is already taken.";
        }
        else 
        {
            const res = db.collection('users').insertOne(newUser);
            const tokenBody = 
            {
                id: newUser._id.toString(),
                login: newUser.Login
            }
            bearer =  await generateJWT(tokenBody);
        }
        res.set('Authorization', 'Bearer ' + bearer);
        
        // return success
        res.status(200).json(ret);
        return;
    }
    catch (e)
    {
        ret.error = e.toString();

        // return internal server error
        res.status(500).json(ret);
        return;
    }
});

module.exports = { register };