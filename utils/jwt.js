const jose = require("jose");
const { createSecretKey } = require("crypto");

// generate secret
require("dotenv").config();

const encodeToken = (async (body) =>
{
    const secret = createSecretKey(process.env.JWT_SECRET, "utf-8");
    return await signToken(body, secret).setIssuedAt().setExpirationTime("2h");
});

const signToken = (async (body, secret) =>
{
    return await new jose.SignJWT(body)
    .setProtectedHeader({ alg: "HS256", type: "JWT" })
    .sign(secret);
});

const verifyToken = (async (token, secret) =>
{
    secret = secret || createSecretKey(process.env.JWT_SECRET, "utf-8");
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
