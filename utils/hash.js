const { createHash } = require('crypto');

/**
 * Hashes text with the sha256 algorithm into base64 encoding
 * 
 * @param {string} input -  text to be hashed
 * @return {string} base64 encoded hash
 */
const shaHash = (input) =>
{
    return createHash('sha256').update(input).digest('base64');
};

module.exports = { shaHash };