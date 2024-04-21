const { expect } = require('chai');
const { generateHash, compareHash } = require('../utils/hashing');

describe('Hashing', () =>
{
    const password = "testpassword1234";
    const exampleHash = generateHash(password);
    describe('#generateHash()', () =>
    {
        it('Hash should match test example using #compareHash()', () =>
        {
            const result = compareHash(password, exampleHash.salt, exampleHash.hash);
            expect(result).to.equal(true);
        })
    })
    describe('#compareHash()', () =>
    {
        it('Should return false if hash does not match', () =>
        {
            const actual = compareHash('', exampleHash.salt, exampleHash.hash);
            expect(actual).to.equal(false);
        })

        it('Should return true if hashes match', () =>
        {
            expect(compareHash(password, exampleHash.salt, exampleHash.hash)).to.equal(true);
        })
    })
});