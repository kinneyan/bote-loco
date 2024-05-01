const jose = require("jose");
const { createSecretKey } = require("crypto");

// generate secret
require("dotenv").config();
const secret = createSecretKey(process.env.JWT_SECRET, "utf-8");

const encodeToken = (async (body) =>
{
    return await signToken(body).setIssuedAt().setExpirationTime("2h");
});

const signToken = (async (body) =>
{
    return await new jose.SignJWT(body)
    .setProtectedHeader({ alg: "HS256", type: "JWT" })
    .sign(secret);
});

const verifyToken = (async (token) =>
{
    try
    {
        const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
        return payload;
    }
    catch (e)
    {
        // return null if token cannot be verified
        return null;
    }
});

module.exports = { encodeToken, signToken, verifyToken };
