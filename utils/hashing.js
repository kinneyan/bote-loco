const { randomBytes, pbkdf2Sync } = require('crypto');

const ITERATIONS = 64000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

const generateSalt = () =>
{
    return randomBytes(128).toString('base64');
}

const generateHash = (password) =>
{
    const salt = generateSalt();
    const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST);

    return { salt: salt, hash: hash.toString('base64') };
}

const compareHash = (password, salt, hash) =>
{
    return hash === pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('base64');
}

module.exports = { generateHash, compareHash };
