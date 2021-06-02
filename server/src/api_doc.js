//User
//Get USER INFO
/**
 *
 * @api {GET} /user/:id Récupérer le profile d'un user
 * @apiName GET USER
 * @apiGroup USER
 * @apiDescription Permet de profil d'un utilisateur
 * @apiParam  {String} id id de l'utilisateur
 *
 * @apiSuccess (200) {Json} Success Le profil de l'utilisateur demander
 *
 *
 * @apiSuccessExample {Json} Success-Response:
 * {
 *    id:"78645",
 *    prenom:"PRENOM",
 *    nom:"NOM",
 *    personnesSuivies : [{id:"5640",prenom:"PRENOM",nom:"NOM"}],
 *    abonnes:[{id:"5640",prenom:"PRENOM",nom:"NOM"}]
 * }
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError NOT-FOUND 404 L'utilisateur n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "l'utilisateur n'existe pas"
 *     }
 *
 *
 */

//Inscription
/**
 *
 * @api {POST} /user/signIn Inscription
 * @apiName Inscription
 * @apiGroup USER
 * @apiDescription Permet la création d'un compte utilisateur
 *
 * @apiParam  {String} email l'email de l'utilisateur
 * @apiParam  {String} mot-de-passe  mot de passe l'utilisateur
 * @apiParam  {String} Image image coder en base 64
 * @apiParam  {String} Prenom prenom de l'utilisateur
 * @apiParam  {String} Nom nom de l'utilisateur
 * @apiSuccess (200) {Json} Sccess response
 *
 * @apiParamExample  {Json} Request-Example:
 * {
 *     email : "email@domain.com",
 *     password : "password",
 *     image : "IMAGE ENCODER EN BASE 64"
 *     prenom : "prenom",
 *     nom : "Nom",
 *     userName : "user name"
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *        result: {
                    email : "email@domain.com",
                    prenom: Prenom,
                    nom: Nom,
                    image:"IMAGE CODER EN BASE 64",
                    bio: "Bio"
                },
         token #token JWT encode l'id et l'email
 * }
 *
 *
 * @apiError InvalideFormatEmail 422 Le Format de l'Email est invalide
 * @apiError InvalideFormatEmail 422 Le Format du mot de passe est incorècte
 * @apiError InvalideFormatEmail 422 Le Format de l'image est incorècte
 * @apiError DuplicationDeMail 409 cette addresse mail existe déja
 * @apiError DuplicationDeMail 409 ce user name existe déja
 * @apiError Mot-De-Passe-Manquant 422 Le champ mot de passe n'est pas spécifier
 * @apiError Email-Manquant 422 Le email n'est pas spécifier
 * @apiError UserNameManquant 422 le champ userName n'est pas spécifier
 * @apiError PrenomManquant 422 le champ prenom est n'est pas spécifer
 * @apiError NomManquant 422 le champ nom est n'est pas spécifer
 * @apiError ErreurServeur 502 Erreur serveur non définie
 *
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Email Manquant
 *     {
 *       "message": "L'email n'est pas spécifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Mot de passe manquant
 *     {
 *       "message": "Le mot de passe n'est pas spécifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Invalide Email Format
 *     {
 *       "message": "Le format de l'email est invalide"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Invalide Password Format
 *     {
 *       "message": "Le format de du mot de passe est invalide (entre 4 et 8 charactère)"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 L'encodage de l'image est invalide
 *     {
 *       "message": "L'encodage de l'image est invalide"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 duplication de  L'addresse mail
 *     {
 *       "message": "l'addresse mail existe déja"
 *     }
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 duplication du userName
 *     {
 *       "message": "L'user name existe déja"
 *     }
  *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Email manquant
 *     {
 *       "message": "Le champ email n'est pas spécifier"
 *     }
  *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Mot de passe manquant
 *     {
 *       "message": "Le mot de passe n'est pas spécifier"
 *     }
  *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 nom manquant
 *     {
 *       "message": "Le champ nom n'est pas spécifier"
 *     }
  *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 nom manquant
 *     {
 *       "message": "Le champ nom n'est pas spécifier"
 *     }
 *
 *
 *
 *
 */

//Connexion
/**
 *
 * @api {POST} /user/singUp Connexion
 * @apiName Connexion
 * @apiGroup USER
 * @apiDescription Permet à l'utilisateur de s'authentifier via son mail et son mot de passe
 *
 * @apiParam  {String} email l'email de l'utilisateur
 * @apiParam  {String} password mot de passe de l'utilisateur

 *
 * @apiSuccess (200) {Json} Sccess response
 *
 * @apiParamExample  {Json} Request-Example:
 * {
 *     email : "email@domain.com",
 *     password : "password"
 * }
 *
 *
 * @apiSuccessExample {josn} Success-Response:
 * {
 *        result: {
                    email: "email",
                    nom: "nom",
                    prenom: "prenom",
                    bio: "La bio de l'utilisateur",
                    image:"IMAGE EN STRING BASE 64"
                },
         token #token JWT encode l'id et l'email
 * }
 *
 *
 * @apiError InvalideFormatEmail 422 Le Format de l'Email est invalide
 * @apiError Mot-De-Passe-Manquant 422 Le champ mot de passe n'est pas spécifier
 * @apiError Email-Manquant 422 Le email n'est pas spécifier
 * @apiError NotFound 404 Utilisateur n'existe
 * @apiError ErreurServeur 502 Erreur serveur non définie
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "L'utilisateur n'existe pas"
 *     }
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Email Manquant
 *     {
 *       "message": "L'email n'est pas spécifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Mot de passe manquant
 *     {
 *       "message": "Le mot de passe n'est pas spécifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Invalide Email Format
 *     {
 *       "message": "Le format de l'email est invalide"
 *     }
 */


//Amis

//Ajouter un ami

/**
 *
 * @api {Post} /user/friends Ajouter un Ami
 * @apiName Ajouter un Amis
 * @apiGroup USER
 * @apiDescription Permet d'ajouter une personne à sa liste d'amis  
 * @apiHeader (200) {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 * @apiParam  {String} userToId L'ID de l'utilisateur à ajouter comme Amis
 * @apiSuccess (201)  Success Ami ajouter avec sucess
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     userToId : "USER_NAME"
 * }
 * @apiError Duplication  409  la relation d'amitié existe déja
 * @apiError Demande-Non-Semantique 409 Demande D'amis avec soit  On ne peut pas être ami avec sois même
 * @apiError utilisateur-N-existe-pas 404 L'ID de l'utilisateur fournis n'existe pas
 * @apiError Donnee-Manquante 422 ID utilisateur à ajouter non fourni
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "L'utilisateur viser n'existe pas"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "ID de l'utilisateur à ajouter n'est pas fournit"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "merci de vous authentifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "message": "la relation d'amitié existe déja"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "message": "on ne peut pas être amis avec soit même"
 *     }
 */


 //Retirer un amis
/**
 *
 * @api {Delete} /user/freinds Retirer un ami
 * @apiName Retirer un ami
 * @apiGroup USER
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiDescription Permet de retirer une personne de sa liste d'amis  
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 * @apiParam  {String} userToId L'ID de l'utilisateur à retirer de la liste des amis
 *
 * @apiSuccess (200)  Succes Personne retirer avec succes
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     userToId : "USER_NAME"
 * }
 * @apiError Not-found  404  la relation d'amitié n'existe pas
 * @apiError Donnee-Manquante 422 ID utilisateur à retirer n'est pas fourni
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Il n'existe pas de relation entre ces deux utilisateur"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "ID utilisateur à retirer n'est pas fourni"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "merci de vous authentifier"
 *     }
 */

  //modifer un Post

/**
 *
 * @api {PUT} /user/:id/ Modifier Un Profil
 * @apiName Modifier un Profil
 * @apiGroup USER
 * @apiDescription Permet de modifier la bio ou la photo d'un user
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 * @apiParam  {String} bio Le text de la bio 
 * @apiParam {String} image L'image du post coder en String en base 64

 * @apiParamExample  {type} Request-Example:
 * {
 *     bio : "ma bio",
 *     image : "Mon image coder en base 64"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Post Udated Success
 {
 *    id:"78645",
 *    prenom:"PRENOM",
 *    nom:"NOM",
 *    personnesSuivies : [{id:"5640",prenom:"PRENOM",nom:"NOM"}],
 *    abonnes:[{id:"5640",prenom:"PRENOM",nom:"NOM"}]
 * }

 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError User-different-du_profil-viser 401 L'utilisateur n'est pas propriétaire  ce profil
 * @apiError Donnee-Manquante 422 aucun des deux param n'as été envoier
 * @apiError Donnee-Non-Valide 422 Image Mal Encoder
 * @apiError NOT-FOUND 404 cette user n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas le propriétaire "
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce user n'existe pas"
 *     }
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "aucun des paramètre (bio , image) n'est fournit"
 *     }
 */


 //Post

 //Poster un post
/**
 *
 * @api {POST} /posts/ Poster un post
 * @apiName Poster un Post
 * @apiGroup Post
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiDescription Permet de Poster un post avec un contenu text et une image [l'image est facutative le contenu est obligatoir]
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}

 * @apiParam  {String} contenu Le text contenu dans le Post OBLIGATOIR
 * @apiParam {String} image L'image du post coder en String en base 64

 * @apiParamExample  {type} Request-Example:
 * {
 *     contenu : "MON POST",
 *     image : "Mon image coder en base 64"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 Created Success
 * {
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "Bonjour10",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *  "likes": [],
 *   "commentaires": [],
 *   "_id": "I9lADoRY3e83hAbd"
 *  }
 * @apiError Donnee-Manquante 422 Contenu manquant
 * @apiError Donnee-Non-Valide 422 Image Mal Encoder
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Not Found
 *     {
 *       "message": "Image Mal Encoder"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Contenu non fournit"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "merci de vous authentifier"
 *     }
 */

 //Supprimer un Post 
/**
 *
 * @api {DELETE} /posts/:id Supprimer un post
 * @apiName Supprimer un Post
 * @apiGroup Post
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiDescription Permet de supprimer un post qu'on a écrit seul l'auteur peut supprimer ses poste
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}

 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Deleted Success
 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Utilisateur-different-de-auteur 401 Seul l'auteur peut supprimer son post
 * @apiError NOT-FOUND 404 Le post n'existe
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce post"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce post n'existe pas"
 *     }
 */


 //Liker un post
/**
 *
 * @api {POST} /posts/:id/like Like POST
 * @apiName Liker un Post
 * @apiGroup Post
 * @apiDescription Permet Liker un POST (si ce n'est pas le cas sinon le disliker)
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur

 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Post Liked Success
 *{
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "Bonjour10",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *  "likes": ["ID_USER"],
 *   "commentaires": [],
 *   "_id": "I9lADoRY3e83hAbd"
 *  }
 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError NOT-FOUND 404 Le post n'existe
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce post"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce POST n'existe pas"
 *     }
 */




 //Commenter un post
/**
 *
 * @api {POST} /posts/:id/commente/  Commenter POST
 * @apiName Commenter un Post
 * @apiGroup Post
 * @apiDescription Permet Commenter un POST
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur

 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 Post Commente Created Success
 *{
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "Bonjour10",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *  "likes": ["ID_USER"],
 *   "commentaires": [{
            _id: "5874sd484",
            idCreateur: "456832154548sdsd78",
            nomCreateur: "Koceila KIRECHE",
            likes: [],
            contenu: "Bonjour 11",
            posteLe: "2021-03-19T15:41:18.364Z"
        }],
 *   "_id": "I9lADoRY3e83hAbd"
 *  }
 * @apiParam {String} contenu le texte du commentaire

 * @apiParamExample  Request-Example:
 * {
 *     contenu : "Bonjour 11",
 * }
 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError NOT-FOUND 404 Le post n'existe
 * @apiError Donnee-Manquante 422 Contenu manquant
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce post"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce POST n'existe pas"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Contenu non fournit"
 *     }
 */



//Supprimer un commentaire
/**
 *
 * @api {DELETE} /posts/:id/commente/:idcommente Supprimer Un Commentaire
 * @apiName Supprimer un Commentaire
 * @apiGroup Post 
 * @apiDescription Permet de supprimer un commentaire qu'on a écrit seul l'auteur peut supprimer ses commentaire
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur

 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 Post Commente Created Success
 *{
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "Bonjour10",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *  "likes": ["ID_USER"],
 *   "commentaires": [],
 *   "_id": "I9lADoRY3e83hAbd"
 *  }

 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError User-different-de-auteur 401 L'utilisateur ne n'est pas l'auteur
 * @apiError COMMENTE-NOT-FOUND 404 ce commentaire n'existe pas
 * @apiError POST-NOT-FOUND 404 ce post n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce commentaire"
 *     }
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce Post n'existe pas"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce commentaire n'existe pas"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Contenu non fournit"
 *     }
 */



//Modifier un commentaire
/**
 *
 * @api {PUT} /posts/:id/commente/:idcommente Modifier Un Commentaire
 * @apiName Modifier un commentaire
 * @apiGroup Post
 * @apiDescription Permet la modification d'un commentaire
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur

 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 Post Commente Created Success
 *{
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "Bonjour10",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *  "likes": ["ID_USER"],
 *   "commentaires": [{
 *     contenu : "Bonjour 45",
 * }],
 *   "_id": "I9lADoRY3e83hAbd"
 *  }
 * @apiParam {String} contenu

 * @apiParamExample  Request-Example:
 * {
 *     contenu : "Bonjour 45",
 * }
 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError User-different-de-auteur 401 L'utilisateur ne n'est pas l'auteur
 * @apiError COMMENTE-NOT-FOUND 404 ce commentaire n'existe pas
 * @apiError POST-NOT-FOUND 404 ce POST n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce commentaire"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce commentaire n'existe pas"
 *     }
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce Post n'existe pas"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Contenu non fournit"
 *     }
 */





 //modifer un Post

/**
 *
 * @api {PUT} /posts/:id/ Modifier Un POST
 * @apiName Modifier un POST
 * @apiGroup Post
 * @apiDescription Permet de modifier un POST
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 *
 * @apiParam  {String} contenu Le text contenu dans le Post
 * @apiParam {String} image L'image du post coder en String en base 64

 * @apiParamExample  {type} Request-Example:
 * {
 *     contenu : "MON POST",
 *     image : "Mon image coder en base 64"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Post Udated Success
 *{
 *  "idCreateur": "456832154548sdsd78",
 *   "nomCreateur": "Koceila KIRECHE",
 *   "contenu": "MON POST",
 *   "image":"Mon image coder en base 64",
 *   "posteLe": "2021-03-19T15:41:18.364Z",
 *   "likes": ["ID_USER"],
 *   "commentaires": [],
 *   "_id": "I9lADoRY3e83hAbd"
 *}

 *
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError User-different-de-auteur 401 L'utilisateur n'est pas l'auteur
 * @apiError Donnee-Manquante 422 aucun des deux param n'as été envoier
 * @apiError Donnee-Non-Valide 422 Image Mal Encoder
 * @apiError NOT-FOUND 404 ce post n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Vous n'etes pas l'auteur de ce POST"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "Ce commentaire n'existe pas"
 *     }
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "aucun des paramètre (contenu , image) n'est fournit"
 *     }
 */

 //Get POST
/**
 *
 * @api {GET} /posts?limit=NUMBER&offset=NUMBER&freindsOnly=BOOLEAN Récupérer les POSTS
 * @apiName GET POSTS
 * @apiGroup Post
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 * @apiDescription Permet de récupérer les poste de twistter avec un système de filtre pour ne pas récupérer des quantités immenses de messages à la fois, le filtre comporte la limte qui est le max de message qu'on veut récupérer, l'offset le nombre de message à sauter, un boolean freindOnly quand il est à True l'utilisateur récupérera uniquement les messages de ses amis
 * @apiParam  {Number} limit [par defaut = 10] permet de fixer le nombre max de posts à récupérer
 * @apiParam  {Number} offset [par defaut = 0] permet de sauter un certain nomber de posts
 * @apiParam   {Boolean} freindsOnly [par defaut = false] permet de ce limiter aux posts des amis seulement

 * @apiSuccess (200) {json} Success renvoi un tableau de posts demander
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  [
    {
        "idCreateur": "456s74d7s8d",
        "nomCreateur": "Melissa Larbi",
        "contenu": "Bonjour10",
        "posteLe": "2021-03-19T15:41:18.364Z",
        "likes": [],
        "commentaires": [],
        "_id": "I9lADoRY3e83hAbd"
    },
    {
        "idCreateur": "ds8dsd97854",
        "nomCreateur": "Koceila KIRECHE",
        "contenu": "Bonjour8",
        "posteLe": "2021-03-16T17:23:03.962Z",
        "likes": [],
        "commentaires": [],
        "_id": "UlwAyDVuojGz4beT"
    }]
 * }
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 *
 *
 */

 //Get POST of specific USER
  //Get POST
/**
 *
 * @api {GET} /posts/:id/?limit=NUMBER&offset=NUMBER Récupérer les POSTS d'un user spécifique
 * @apiName GET POSTS OF SPECIFIC USER
 * @apiGroup Post
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiDescription Permet de récupérer les poste de twistter avec un système de filtre pour ne pas récupérer des quantités immenses de messages à la fois, le filtre comporte la limte qui est le max de message qu'on veut récupérer, l'offset le nombre de message à sauter, un boolean freindOnly quand il est à True l'utilisateur récupérera uniquement les messages de ses amis
 * 
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}
 * @apiParam  {Number} limit [par defaut = 10] permet de fixer le nombre max de posts à récupérer
 * @apiParam  {Number} offset [par defaut = 0] permet de sauter un certain nomber de posts
 * @apiParam  {String} Id L'id of USER
 * @apiSuccess (200) {json} Success renvoi un tableau de posts demander
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *  [
    {
        "idCreateur": "ds8dsd97854",
        "nomCreateur": "Koceila KIRECHE",
        "contenu": "Bonjour8",
        "posteLe": "2021-03-16T17:23:03.962Z",
        "likes": [],
        "commentaires": [],
        "_id": "UlwAyDVuojGz4beT"
    }
]
 * }
 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError NOT-FOUND 404 L'utilisateur n'existe pas
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 NOT-FOUND
 *     {
 *       "message": "l'utilisateur n'existe pas"
 *     }
 **/

 //Message 
/**
 * 
 * @api {GET} /message/ Message instantaner
 * @apiName Message instantaner
 * @apiGroup Message
 * @apiHeader   {String} authorization La clé JWT qui permet d'authentifier l'utilisateur
 * @apiDescription Ce lien permet de se brancher par le biais des sockets ce qui permerta à l'utilisateur d'envoiyer et de recevoir des messages en temps réel
 * @apiHeaderExample {json} Request-Example:
 *    {authorization : "BEARER YOUR TOKEN"}

 * @apiError Unauthorized 401 L'utilisateur ne c'est pas authentifier
 * @apiError Erreur-Serveur 502 Erreur serveur
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Merci de vous authenftifier"
 *     }
 */

 //
//Envoiyer un message

