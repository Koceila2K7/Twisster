const express = require('express');
const post_router = express.Router();
const post_controlleur = require('../controllers/posts_controller');
const commente_controlleur = require('../controllers/commenter_controlle');


const authefication_middleware = require('../middlewares/authetificationMiddleware');
post_router.get('/', authefication_middleware, post_controlleur.get_posts);
post_router.post('/', authefication_middleware, post_controlleur.add_post);

post_router.delete('/:id', authefication_middleware, post_controlleur.delete_post);
post_router.put('/:id', authefication_middleware, post_controlleur.update_post);

post_router.post('/:id/like', authefication_middleware, post_controlleur.like_post);
post_router.post('/:id/commente', authefication_middleware, post_controlleur.commente_post);

post_router.put('/:idpost/commente/:idcommente', authefication_middleware, commente_controlleur.update_commente);
post_router.delete('/:idpost/commente/:idcommente', authefication_middleware, commente_controlleur.delete_commente);

module.exports = post_router;