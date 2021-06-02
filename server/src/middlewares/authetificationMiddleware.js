const authetificationControler = require("../auth/authetificationControler");
//Ce middleware permet de de gerer l'authentification par JWT 
//il permet aussi de stocker toute authentification GOOGLE dans la table google authentification (cette tâche est déléguer 
// au controlleur de  l'authentification)
//ce qui nous permetera de garder des données cohérente dans notre BDD (exemple des relation d'amis)

const authetificationMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1].trim();
        console.log("We are in auth middleware");
        let result = await authetificationControler.getIdFromToken(token);
        console.log("USER_info", result);
        req.userId = result.id;
        req.user_name = result.name; //à ne pas confondre avec le champs username, ici le name c'est juste la concténation du prénom et du nom
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "merci de vous authentifier" });
    }
}
module.exports = authetificationMiddleware;