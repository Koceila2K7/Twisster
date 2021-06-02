const express = require("express");
const user_router = express.Router();
const user_controlle = require("../controllers/user_controlle");
const friend_controlle = require("../controllers/friend_controlle");
const authetificationMiddleware = require('../middlewares/authetificationMiddleware');

user_router.post('/signUp', user_controlle.signUp);
user_router.post('/signIn', user_controlle.signIn);
user_router.get('/', authetificationMiddleware, user_controlle.getUser);
user_router.get('/profile/:id', authetificationMiddleware, user_controlle.getUserInfo)
user_router.get('/profile/', authetificationMiddleware, user_controlle.getUserInfo)
user_router.put('/profile/', authetificationMiddleware, user_controlle.updateProfile)

user_router.post('/friend', authetificationMiddleware, friend_controlle.addFriend);
user_router.delete('/friend/:id', authetificationMiddleware, friend_controlle.deleteFriend);

module.exports = user_router;