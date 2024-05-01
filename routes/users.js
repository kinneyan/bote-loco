const router = require("express").Router();

const { generateJWT } = require("../middleware/jwt");

router.post("/login", require("../controllers/login").login);
router.post("/login", generateJWT);

router.post("/register", require("../controllers/register").register);
router.post("/register", generateJWT);

module.exports = router;