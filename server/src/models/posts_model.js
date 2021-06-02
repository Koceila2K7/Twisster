const posts_data = require("../data/post_bd");
const FriendModel = require("./friend_model");
const friend_model = new FriendModel();

class PostModel {

    create_post = (user_info, post) => {
        let new_post = {
            idCreateur: user_info.id,
            nomCreateur: user_info.nom,
            contenu: post.contenu,
            posteLe: new Date(),
            likes: [],
            commentaires: []
        }
        if (post.imageAssocier) {
            new_post.imageAssocier = post.imageAssocier;
        }
        return new Promise((resolve, reject) => {
            posts_data.insert(new_post, (err, document) => (err) ? reject(err) : resolve(document))
        })
    }

    get_post_by_id = (id) => new Promise((resolve, reject) =>
        posts_data.findOne({ _id: id }, (err, data) =>
            err ? reject(err) : resolve(data)))
    /**
     * 
     * @param {String} id L'id du post à supprimer
     * @returns {Promise<Boolean>} True si le post à été supprimer False sinon
     */
    delete_post_by_id = id => new Promise((resolve, reject) =>
        posts_data.remove({ _id: id }, {}, (err, numRemoved) =>
            err ? reject(err) : resolve((numRemoved > -1))))

    get_posts_of = id => new Promise((resolve, reject) => {
        posts_data.find({ idCreateur: id })
            .exec((err, docs) => err ? reject(err) : resolve(docs));
    })
    /**
     * 
     * @param {Object} queryFilter 
     * @param {Number} queryFilter.limit la limit de messages à récupérer
     * @param {Boolean} queryFilter.freindOnly récupérer uniquement les message des amis
     * @param {Number} queryFilter.offset sauter un nombre X de messages
     * @param {String} queryFilter.userId l'id de l'utilisateur qui a fait la requete
     */
    get_posts = async queryFilter => new Promise(async (resolve, reject) => {
        let query = {}
        if (queryFilter.freindOnly) {

            let freinds = await friend_model.get_freinds_of(queryFilter.userId);
            freinds = freinds.map(item => item.userTo);
            console.log("freinds", freinds)

            query = { idCreateur: { $in: freinds } };
        }

        posts_data.find(query)
            .sort({ posteLe: -1 })
            .skip(queryFilter.offset)
            .limit(queryFilter.limit)
            .exec((err, result) => err ? reject(err) : resolve(result));

    })


    updateLikePost = post => new Promise((resolve, reject) => {
        posts_data.update({ _id: post._id }, { $set: { likes: post.likes } }, {}, (err, numRemplaced) => err ? reject(err) : resolve(true))
    })

    updateCommentPost = post => new Promise((resolve, reject) => {
        posts_data.update({ _id: post._id }, { $set: { commentaires: post.commentaires } }, {}, (err, numRemplaced) => err ? reject(err) : resolve(true));
    });
    /**
     * 
     * @param {Object} userInfo 
     * @param {String} userInfo.userId
     * @param {String} userInfo.user_name
     * @param {String} contenu 
     */
    creerACommente = (userInfo, postId, contenu) => {
        let date = new Date();
        return ({
            _id: `${postId}${userInfo.userId}${date.toISOString()}`,
            idCreateur: userInfo.userId,
            nomCreateur: userInfo.user_name,
            likes: [],
            contenu: contenu,
            posteLe: date
        })
    }

    updatePost = post => new Promise((resolve, reject) =>
        posts_data.update({ _id: post._id }, { $set: { contenu: post.contenu, image: post.image } }, {}, (err, numRemplaced) => err ? reject(err) : resolve(true)));

    get_liked_post_by = (id) => new Promise((resolve, reject) => {
        posts_data.find({ likes: { $elemMatch: id } })
            .exec((err, docs) => err ? reject(err) : resolve(docs))
    });
    /**
     * 
     * @param {String} q 
     * @param {*} freindOnly 
     * @param {*} userId 
     */
    search = async (q, freindOnly, userId) => new Promise(async (resolve, reject) => {
        q = q.trim()
        let query = {
            $or: [{ contenu: { $regex: RegExp(q) } },
            { contenu: { $regex: RegExp(q.toLowerCase()) } },
            { contenu: { $regex: RegExp(q.toUpperCase()) } }]
        }
       
        freindOnly = Boolean(freindOnly)
        if (freindOnly ===true) {
            let freinds = await friend_model.get_freinds_of(userId);
            freinds = freinds.map(item => item.userTo);
            


            query = { $and: [{ ...query }, { idCreateur: { $in: [...freinds, userId] } }] };
        }
        posts_data.find(query)
            .sort({ posteLe: -1 })
            .exec((err, result) => err ? reject(err) : resolve(result));

    })
}


module.exports = new PostModel();



