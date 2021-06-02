const express = require("express");
const api_router = require("./api.js");
const router = express.Router();

router.use('/api', api_router);

module.exports = router;



