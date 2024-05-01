const { expect } = require("chai");
const { encodeToken, verifyToken } = require("../utils/jwt");

describe("JWT", () =>
{
    const secret = "testsecret123"
    const body = { name: "Andrew" };
    const exampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5kcmV3IiwiaWF0IjozLCJleHAiOjI3MTQ1MjE2MDV9.BXu_lNgCPG27e2SMgu1MYHs5R_6NCdtqX6MAgzbIUjY";

    describe("#encodeToken()", () =>
    {
        it("Token should match expected test JWT", async () =>
        {
            const actual = await encodeToken({ body: body, secret: secret, iat: 3, exp: 2714521605 });
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