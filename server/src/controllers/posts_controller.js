const posts_model = require('../models/posts_model')
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const add_post = async (req, res) => {

    //L'utlisateur doit absolusement être authentifier
    try {

        if (req.userId) {

            //Le seul attribut Oblégatoir est le contenu 
            //Car le Id  et le nom de l'auteur peut être récupérer depuis son Token JWT 
            const post = req.body

            if (post && post.contenu) {
                //Dans ce cas créer le POST
                let auteurInfo = { id: req.userId, nom: req.user_name }
                let newPost = await posts_model.create_post(auteurInfo, post);
                res.status(201).json(newPost)

            } else {
                return res.status(422).json({ message: "merci de d'envoyer un object contenant au moins un clé contenu" });
            }
        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }


}

//Pour la requete get on a choisit d'implémenter un système de filtre
//de tel sorte l'utilisateur peut ajouter à la requete les param suivant
//*****freindOnly -> permet de filtrer les message de ses amis uniquement
//*****limit  -> permet de fixer le nombre max de message à envoyer
//*****offset -> permet de sauter un nombre X de message

//Dans le cas d'absence de ces paramètre voici leur valeur par défaut
//*****freindOnly == false
//*****limit = 100
//*****offset = 0

const get_posts = async (req, res) => {
    try {
        const { limit = 100, offset = 0, freindOnly = false } = req.query;
        console.table(req.query)
        let messages = await posts_model.get_posts(
            {
                limit: Number(limit),
                freindOnly: (!freindOnly) ? freindOnly : (freindOnly.toLowerCase() == 'true'),
                offset: Number(offset),
                userId: req.userId
            });
        console.log(messages)
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        return res.status(502).json({ message: "Probleme serveur" });
    }

}

const delete_post = async (req, res) => {
    try {
        if (req.userId) {
            let { id } = req.params
            let post = await posts_model.get_post_by_id(id);

            if (post) {
                //Le post existe on doit vérifier maintenant que l'auteur est bien celui qui veut le supprimer
                if ((post.idCreateur === req.userId) && (post.nomCreateur === req.user_name)) {
                    if (await posts_model.delete_post_by_id(post._id)) {
                        return res.status(200).send();
                    } else {
                        //le post n'as pas été supprimer pour une rainson inconnue 
                        res.status(502).json({ message: "Erreur inconnue" })
                    }
                } else {
                    //Erreur 401 l'utilisateur n'est pas autoriser à supprimer ce post
                    res.status(401).json({ message: "Vous n'est pas l'auteur de ce post" });
                }
            } else {
                res.status(404).json({ message: "Le post n'existe pas" });
            }

        } else {
            //Erreur 401 l'utilisateur
            return res.status(401).json({ message: "merci de vous authentifier" });
        }

    } catch (error) {
        console.error(error);
        return res.status(502).json({ message: "problème serveur" })
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const like_post = async (req, res) => {
    try {
        if (req.userId) {
            let { id } = req.params;
            let post = await posts_model.get_post_by_id(id);
            if (post) {
                let index = post.likes.indexOf(req.userId);
                //Toggel like
                if (index == -1) {
                    post.likes.push(req.userId);
                } else {
                    post.likes = post.likes.filter(e => e != req.userId);
                }
                //Update post in BD
                let updated = await posts_model.updateLikePost(post);
                if (update_post) {
                    return res.status(200).json(post);
                } else {
                    return res.status(502).json({ message: "problème serveur" })
                }
            } else {
                return res.status(404).json({ message: "ce post n'existe pas" })
            }

        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error);
        return res.status(502).json({ message: "problème serveur" })
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const commente_post = async (req, res) => {
    try {
        if (req.userId) {
            let { id } = req.params;
            let post = await posts_model.get_post_by_id(id);
            console.table({ ...post, imageAssocier: "hey hey captne" })
            let { contenu } = req.body;
            if (post) {
                let commentaire = posts_model.creerACommente({ userId: req.userId, user_name: req.user_name }, id, contenu);
                if (post.commentaires)
                    post.commentaires.push(commentaire);
                let updated = await posts_model.updateCommentPost(post);
                if (updated) {
                    return res.status(201).json(post);
                } else {
                    return res.status(502).json({ message: "Problème serveur" })
                }
            } else {
                return res.status(404).json({ message: "ce post n'existe pas" })
            }

        } else {
            return res.status(401).json({ message: "Merci de vous authentifier" })
        }
    } catch (error) {
        console.error(error);
        return res.status(502).json({ message: "problème serveur" });
    }
}

const update_post = async (req, res) => {
    try {
        if (req.userId) {
            let { id } = req.params;
            let post = await posts_model.get_post_by_id(id);
            if (post) {
                if (post.idCreateur == req.userId) {
                    const { contenu = null, image = null } = req.body;
                    post.contenu = contenu ? contenu : post.contenu;
                    post.image = image ? image : (post.image ? post.image : null);
                    let updated = await posts_model.updatePost(post);

                    if (updated) {
                        return res.status(200).json(post);
                    } else {
                        return res.status(502).json({ message: "erreur serveur" })
                    }

                } else {
                    return res.status(401).json({ message: "seul le créateur à le droit de modifier son post" })
                }
            } else {
                return res.status(404).json({ message: "ce post n'existe pas" })
            }

        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }


    } catch (error) {
        return res.status(502).json({ message: "erreur serveur" })
    }
}

module.exports = {
    add_post,
    get_posts,
    delete_post,
    like_post,
    commente_post,
    update_post
}