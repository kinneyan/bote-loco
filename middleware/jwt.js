const { encodeToken } = require("../utils/jwt");

const generateJWT = (async (req, res, next) =>
{
    res.locals.response.bearer = await encodeToken(res.locals.tokenBody);

    res.locals.response.error = res.locals.response.error || "";
    res.status(200).json(res.locals.response);
    return;
});

module.exports = { generateJWT };