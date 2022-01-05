const { Router } = require("express");
const { getAll } = require("../controllers/event");
const router = Router();
router.route("/").get(getAll);
module.exports = router;
