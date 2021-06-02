const express = require("express");
const api_router = express.Router();
const user_router = require('./routers/user_router');
const posts_router = require("./routers/posts_router");
const messages_router = require("./routers/messages_router");
const search_router = require("./routers/searchs_routers");

api_router.use('/user', user_router);
api_router.use('/posts', posts_router);
api_router.use('/messages', messages_router);
api_router.use('/search', search_router);
module.exports = api_router;