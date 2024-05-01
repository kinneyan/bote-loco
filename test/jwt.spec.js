const { expect } = require("chai");
const { signToken, verifyToken } = require("../utils/jwt");
const { createSecretKey } = require("crypto");

describe("JWT", () =>
{
    const secret = createSecretKey("testsecret123", "utf-8");
    const body = { name: "Andrew" };
    const exampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJuYW1lIjoiQW5kcmV3In0.dt9f9MOk-SGAKbbrw7c-kQU8UXamoEnZ6FBpQbLn5UI";

    describe("#signToken()", () =>
    {
        it("Token should match expected test JWT", async () =>
        {
            const actual = await signToken(body, secret);
            expect(actual).to.equal(exampleJWT);
        });

    });

    describe("#verifyToken()", () =>
    {
        it("Should return null if JWT secret cannot be verified", async () =>
        {
            const badSecret = "bad";
            expect(await verifyToken(exampleJWT, badSecret)).to.equal(null);
        });

        it("Should return JWT body if token was verified", async () =>
        {
            expect(await verifyToken(exampleJWT, secret)).to.have.property("name");
        });
    });
});