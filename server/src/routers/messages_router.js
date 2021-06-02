const express = require('express');
const messages_router = express.Router();
const messages_controlleur = require('../controllers/messages_controller');

const authefication_middleware = require('../middlewares/authetificationMiddleware');

messages_router.get('/conversations/', authefication_middleware, messages_controlleur.get_conversations);
module.exports = messages_router;