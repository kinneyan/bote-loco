const { expect } = require("chai");
const { generateHash, compareHash } = require("../utils/hashing");

describe("Hashing", () =>
{
    // setup testing variables
    const password = "testpassword1234";
    const salt = "salt";
    const expectedHash = "BqoRIIGX7M6pYxJ3vvzmWaZsqhcCGpLVdIhk0rukrrw2XpBRK+s2XwfX1o9G5egENc5SnKZ/pSoHrJHAii3Q3A==";
    
    describe("#generateHash()", () =>
    {
        it("Hash should match expected test hash", () =>
        {
            const actual = generateHash(password, salt);
            expect(actual.hash).to.equal(expectedHash);
        })
    });

    describe("#compareHash()", () =>
    {
        it("Should return false if hashed plaintext does not match hash", () =>
        {
            const actual = compareHash('', salt, expectedHash.hash);
            expect(actual).to.equal(false);
        });

        it("Should return true if hashed plaintext matches hash", () =>
        {
            expect(compareHash(password, salt, expectedHash)).to.equal(true);
        });
    });
});