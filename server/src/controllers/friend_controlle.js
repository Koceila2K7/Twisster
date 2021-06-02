const FriendModel = require("../models/friend_model");
const friendModel = new FriendModel();
const UserModel = require("../models/user_model");
const userModel = new UserModel();

const addFriend = async (req, res) => {
    try {
        if (req.userId) {
            //Todo véifi from google auth 
            //Idea : faire une table googleAuth et a chaque auth google l'ajouter dans la table si ce n'est pas le cas 
            //imposer pour que userTo soit dans googleAuth ou dans user
            let { userToId } = req.body;
            console.log(userToId)
            if (userToId) {
                
                let isValideID = await userModel.userIdExist(userToId);
                if (isValideID) {
                    if (userToId === req.userId) {
                        res.status(409).json({ message: "on ne peut pas être amis avec soit même" })
                    } else {
                        let friendRelationExist = await friendModel.friendRelationExist(req.userId, userToId);
                        if (!friendRelationExist) {
                            let added_success = await friendModel.addFriend(req.userId, userToId);
                            if (added_success) {
                                res.status(201).json({ message: "added success" });
                            } else {
                                //Une erreur inconnue est survenue
                                return res.status(502).json({ message: "problème serveur" })
                            }
                        }
                        else {
                            return res.status(409).json({ message: "cette relation existe déja" });
                        }
                    }
                } else {
                    return res.status(404).json({ message: "l'utilisateur n'exite pas" });
                }
            } else {
                return res.status(422).json({ message: "merci de préciser l'ID de l'utilisateur à ajouter" });
            }
        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }
}
const deleteFriend = async (req, res) => {
    try {
        if (req.userId) {
            //Todo véifi from google auth 
            //Idea : faire une table googleAuth et a chaque auth google l'ajouter dans la table si ce n'est pas le cas 
            //imposer pour que userTo soit dans googleAuth ou dans user
            let { id } = req.params;
            let userToId = id
            console.log("user to id", userToId)
            console.log(id)
            if (userToId) {
                let isValideID = await userModel.userIdExist(userToId);
                if (isValideID) {

                    let friendRelationExist = await friendModel.friendRelationExist(req.userId, userToId);
                    console.log(friendRelationExist)
                    if (friendRelationExist) {
                        let delete_success = await friendModel.deleteFriendRelation(req.userId, userToId);
                        console.log(delete_success)
                        if (delete_success) {
                            res.status(200).json({ message: "supprimé avec success" });
                        } else {
                            //Une erreur inconnue est survenue
                            return res.status(502).json({ message: "problème serveur" })
                        }
                    }
                    else {
                        return res.status(404).json({ message: "cette relation n'existe pas" });
                    }

                } else {
                    return res.status(422).json({ message: "merci de préciser un ID de l'utilisateur valide" });
                }
            } else {
                return res.status(422).json({ message: "merci de préciser l'ID de l'utilisateur à supprimer dans vos amis" });
            }
        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }
}

module.exports = {
    addFriend,
    deleteFriend
}
