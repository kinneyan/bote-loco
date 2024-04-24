const router = require("express").Router();

router.post("/login", require("../controllers/login").login);

module.exports = router;