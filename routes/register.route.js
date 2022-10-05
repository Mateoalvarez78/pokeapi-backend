// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const { registro } = require("../controllers/register.controller");

// router.use(cors());
// router.post("/registro", registro);

// module.exports = router;

const express = require("express");

const router = express.Router();
const { registro } = require("../controllers/register.controller");

router.post("/", registro);

module.exports = router;
