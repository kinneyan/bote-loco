const { expect } = require("chai");
const { signToken, verifyToken } = require("../utils/jwt");

describe("JWT", () =>
{
    require("dotenv").config();
    const secret = require("crypto").createSecretKey(process.env.JWT_SECRET, "utf-8");
    const body = { name: "Andrew" };
    const exampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJuYW1lIjoiQW5kcmV3In0.LjOCt_gyfnsiEPZQ9NwEG7zZf54VbrhW61xqxEH6i98";

    describe("#signToken()", () =>
    {
        it("Token should match expected test JWT", async () =>
        {
            const actual = await signToken(body);
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