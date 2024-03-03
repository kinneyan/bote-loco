const jose = require('jose');
const { createSecretKey } = require('crypto');
require('dotenv').config();

const secret = createSecretKey(process.env.JWT_SECRET, 'utf-8');

/**
 * Generate a JWT bearer token
 * 
 * @param {Object} body - information to be encoded
 * @returns {string} bearer token
 */
const generateJWT = (async (body) =>
{
    return await new jose.SignJWT(body)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .sign(secret);
});

/**
 * Verify a JWT bearer token
 * 
 * @param {string} token - JWT token to be verified
 * @returns payload extracted from the token
 */
const verifyJWT = (async (token) =>
{
    try 
    {
        const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
        return payload;
    }
    catch (e)
    {
        return {};
    }
});

module.exports = { generateJWT, verifyJWT };