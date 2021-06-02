const express = require("express");
const search_router = express.Router();
const authefication_middleware = require('../middlewares/authetificationMiddleware');
const searchController = require('../controllers/search_controlle');
search_router.get("/", authefication_middleware, searchController.search)

module.exports = search_router;