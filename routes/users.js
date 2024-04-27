const router = require("express").Router();

router.post("/login", require("../controllers/login").login);
router.post("/register", require("../controllers/register").register);

module.exports = router;