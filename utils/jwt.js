const jose = require("jose");
const { createSecretKey } = require("crypto");

// generate secret
require("dotenv").config();

const encodeToken = (async (options) =>
{
    const secret = createSecretKey(options.secret || process.env.JWT_SECRET, "utf-8");

    return await new jose.SignJWT(options.body)
    .setProtectedHeader({ alg: options.alg || "HS256", typ: "JWT" })
    .setIssuedAt(options.iat || undefined)
    .setExpirationTime(options.exp || "2h")
    .sign(secret);
});

const verifyToken = (async (token, secret) =>
{
    try
    {
        secret = createSecretKey(secret || process.env.JWT_SECRET, "utf-8");
        const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
        return payload;
    }
    catch (e)
    {
        // return null if token cannot be verified
        return null;
    }
});

module.exports = { encodeToken, verifyToken };
