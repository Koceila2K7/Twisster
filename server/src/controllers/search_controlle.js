const posts_model = require('../models/posts_model')
const UserModel = require("../models/user_model");
const userModel = new UserModel();

const search = async (req, res) => {
    try {
        if (req.userId) {
            let { q, freindOnly = false } = req.query;
            console.log(freindOnly)
            q = q.split(' ').filter(i => i.length > 0)
            console.table(q)
            let result = {
                users: new Map(),
                posts: new Map()
            }
            let posts;
            let users;

            for (let item of q) {
                posts = await posts_model.search(item, freindOnly, req.userId);
                
                users = await userModel.search(item);



                for (let p of posts) {
                    result.posts.set(p._id, p);
                }

                for (let u of users)
                    result.users.set(u.userName, u);

            }
            posts = [...result.posts.values()];
            users = [...result.users.values()];

            res.status(200).json({ users, posts });

        } else {
            //Erreur 401 l'utilisateur
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error);
        return res.status(502).json({ message: "Probleme serveur" });
    }
}

module.exports = {
    search
}