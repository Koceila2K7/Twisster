const UserModel = require("../models/user_model");
const userModel = new UserModel();
const FriendModel = require("../models/friend_model");
const friendModel = new FriendModel();
const posts_model = require('../models/posts_model')

const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './src/config/.env' });
const authetificationControler = require('../auth/authetificationControler.js')

const getUser = async (req, res) => {
    try {
        if (req.userId) {
            let users = await userModel.getAllUsers();

            res.json(users);
        } else {
            res.status(401).json({ message: "merci de vous authentifier" })
        }
    } catch (e) {
        res.status(501).json(e)
    }
}

/**
 * Controlleur charger de l'inscription des Utilisateurs --Ajout d'un user
 * @param {Request} req 
 * @param {Response} res 
 */
const signUp = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, password, bio, profilePicture } = req.body
        if (userName && firstName && lastName && email && password) {
            // Tout les paramètres importants sont présents il faut procéder aux controlles 
            let userNameExist = await userModel.userNameExist(userName);
            let emailExist = await userModel.emailExist(email);

            if (userNameExist) {
                return res.status(409).json({ message: "Le nom d'utilisateur est déja utiliser" });
            } else if (emailExist) {
                return res.status(409).json({ message: "L'utilisateur est déja inscrit" });
            }

            let hashedPassword = await bcrypt.hash(password, Number.parseInt(process.env.BCRYPT_SALT));
            let user = await userModel.createUser({ userName, firstName, lastName, email, password: hashedPassword, bio });

            let token = authetificationControler.generateToken(user);
            res.status(201).json({
                result: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    bio: user.bio
                },
                token
            })

        } else {
            return res.status(422).json({ message: "merci de préciser tout les paramètres" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }
}


/**
 * Controlleur charger de l'authetification  des Utilisateurs --Connexion d'un user
 * @param {Request} req 
 * @param {Response} res 
 */
const signIn = async (req, res) => {
    console.log("SIGN_UP")
    try {
        const { email, password } = req.body;
        if (password && email) {
            let user = await userModel.getUserByEmail(email.trim());
            if (user) {
                let passwordMathch = await bcrypt.compare(password, user.password);
                if (passwordMathch) {
                    let token = authetificationControler.generateToken(user);

                    return res.status(200).json({
                        result: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            bio: user.bio
                        },
                        token
                    })
                }
            }


            return res.status(404).json({ message: "cet utilisateur n'existe pas" })

        } else {
            return res.status(422).json({ message: "merci de préciser le mot de passe et l'email" });
        }



    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }
}


const getUserInfo = async (req, res) => {
    try {
        if (req.userId) {
            let { id } = req.params;
            id = id ? id : req.userId;
            let userExist = await userModel.userIdExist(id);
            if (!userExist)
                return res.status(404).json({ message: "l'utilisateur n'existe pas" });

            let infoProfil = await userModel.getUserInfo(id);
            let abonnements = await friendModel.get_freinds_of(id);
            let abonnes = await friendModel.who_has_as_friends(id);
            let posts = await posts_model.get_posts_of(id);
            let postLiker = await posts_model.get_liked_post_by(id);

            return res.status(200).json({ ...infoProfil, abonnes, abonnements, posts, postLiker });
        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème server" });

    }


}


const updateProfile = async (req, res) => {
    console.log("we are in update controlleur")

    try {
        if (req.userId) {
            let { bio, firstName, lastName, password } = req.body;
            if (password) {
                password = await bcrypt.hash(password, Number.parseInt(process.env.BCRYPT_SALT));
            }

            let userInfos = [
                { name: "bio", value: bio },
                { name: "firstName", value: firstName },
                { name: "lastName", value: lastName },
                { name: "password", value: password },
            ]
            const updated = await userModel.updateProfile({ userInfos, id: req.userId });
            if (updated) {
                return res.status(204).send("");
            } else {
                return res.status(502).json({ message: "problème server" });

            }

        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });

        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème server" });

    }
}

module.exports = {
    getUser,
    signUp,
    signIn,
    getUserInfo,
    updateProfile
}


