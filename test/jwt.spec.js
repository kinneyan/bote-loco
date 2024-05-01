const { expect } = require("chai");
const { signToken, verifyToken } = require("../utils/jwt");

describe("JWT", () =>
{
    const secret = require("crypto").createSecretKey("testsecret123", "utf-8");
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

    describe("#verifyJWT()", () =>
    {
        it("Should return null if JWT secret cannot be verified", async () =>
        {
        });
    });
});