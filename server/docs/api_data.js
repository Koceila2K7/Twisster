define({ "api": [
  {
    "type": "GET",
    "url": "/message/",
    "title": "Message instantaner",
    "name": "Message_instantaner",
    "group": "Message",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Ce lien permet de se brancher par le biais des sockets ce qui permerta à l'utilisateur d'envoiyer et de recevoir des messages en temps réel</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Message"
  },
  {
    "type": "POST",
    "url": "/posts/:id/commente/",
    "title": "Commenter POST",
    "name": "Commenter_un_Post",
    "group": "Post",
    "description": "<p>Permet Commenter un POST</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 201 Post Commente Created Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"Bonjour10\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n \"likes\": [\"ID_USER\"],\n  \"commentaires\": [{\n            _id: \"5874sd484\",\n            idCreateur: \"456832154548sdsd78\",\n            nomCreateur: \"Koceila KIRECHE\",\n            likes: [],\n            contenu: \"Bonjour 11\",\n            posteLe: \"2021-03-19T15:41:18.364Z\"\n        }],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>le texte du commentaire</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    contenu : \"Bonjour 11\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 Le post n'existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 Contenu manquant</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce post\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce POST n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"Contenu non fournit\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "GET",
    "url": "/posts?limit=NUMBER&offset=NUMBER&freindsOnly=BOOLEAN",
    "title": "Récupérer les POSTS",
    "name": "GET_POSTS",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Permet de récupérer les poste de twistter avec un système de filtre pour ne pas récupérer des quantités immenses de messages à la fois, le filtre comporte la limte qui est le max de message qu'on veut récupérer, l'offset le nombre de message à sauter, un boolean freindOnly quand il est à True l'utilisateur récupérera uniquement les messages de ses amis</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>[par defaut = 10] permet de fixer le nombre max de posts à récupérer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>[par defaut = 0] permet de sauter un certain nomber de posts</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "freindsOnly",
            "description": "<p>[par defaut = false] permet de ce limiter aux posts des amis seulement</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "Success",
            "description": "<p>renvoi un tableau de posts demander</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n [\n    {\n        \"idCreateur\": \"456s74d7s8d\",\n        \"nomCreateur\": \"Melissa Larbi\",\n        \"contenu\": \"Bonjour10\",\n        \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n        \"likes\": [],\n        \"commentaires\": [],\n        \"_id\": \"I9lADoRY3e83hAbd\"\n    },\n    {\n        \"idCreateur\": \"ds8dsd97854\",\n        \"nomCreateur\": \"Koceila KIRECHE\",\n        \"contenu\": \"Bonjour8\",\n        \"posteLe\": \"2021-03-16T17:23:03.962Z\",\n        \"likes\": [],\n        \"commentaires\": [],\n        \"_id\": \"UlwAyDVuojGz4beT\"\n    }]\n}",
          "type": "type"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "GET",
    "url": "/posts/:id/?limit=NUMBER&offset=NUMBER",
    "title": "Récupérer les POSTS d'un user spécifique",
    "name": "GET_POSTS_OF_SPECIFIC_USER",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Permet de récupérer les poste de twistter avec un système de filtre pour ne pas récupérer des quantités immenses de messages à la fois, le filtre comporte la limte qui est le max de message qu'on veut récupérer, l'offset le nombre de message à sauter, un boolean freindOnly quand il est à True l'utilisateur récupérera uniquement les messages de ses amis</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>[par defaut = 10] permet de fixer le nombre max de posts à récupérer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>[par defaut = 0] permet de sauter un certain nomber de posts</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>L'id of USER</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "Success",
            "description": "<p>renvoi un tableau de posts demander</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n [\n    {\n        \"idCreateur\": \"ds8dsd97854\",\n        \"nomCreateur\": \"Koceila KIRECHE\",\n        \"contenu\": \"Bonjour8\",\n        \"posteLe\": \"2021-03-16T17:23:03.962Z\",\n        \"likes\": [],\n        \"commentaires\": [],\n        \"_id\": \"UlwAyDVuojGz4beT\"\n    }\n]\n}",
          "type": "type"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 L'utilisateur n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"l'utilisateur n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "POST",
    "url": "/posts/:id/like",
    "title": "Like POST",
    "name": "Liker_un_Post",
    "group": "Post",
    "description": "<p>Permet Liker un POST (si ce n'est pas le cas sinon le disliker)</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 200 Post Liked Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"Bonjour10\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n \"likes\": [\"ID_USER\"],\n  \"commentaires\": [],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 Le post n'existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce post\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce POST n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "PUT",
    "url": "/posts/:id/",
    "title": "Modifier Un POST",
    "name": "Modifier_un_POST",
    "group": "Post",
    "description": "<p>Permet de modifier un POST</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>Le text contenu dans le Post</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>L'image du post coder en String en base 64</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    contenu : \"MON POST\",\n    image : \"Mon image coder en base 64\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 200 Post Udated Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"MON POST\",\n  \"image\":\"Mon image coder en base 64\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n  \"likes\": [\"ID_USER\"],\n  \"commentaires\": [],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-different-de-auteur",
            "description": "<p>401 L'utilisateur n'est pas l'auteur</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 aucun des deux param n'as été envoier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Non-Valide",
            "description": "<p>422 Image Mal Encoder</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 ce post n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce POST\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce commentaire n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"aucun des paramètre (contenu , image) n'est fournit\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "PUT",
    "url": "/posts/:id/commente/:idcommente",
    "title": "Modifier Un Commentaire",
    "name": "Modifier_un_commentaire",
    "group": "Post",
    "description": "<p>Permet la modification d'un commentaire</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 201 Post Commente Created Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"Bonjour10\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n \"likes\": [\"ID_USER\"],\n  \"commentaires\": [{\n    contenu : \"Bonjour 45\",\n}],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    contenu : \"Bonjour 45\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-different-de-auteur",
            "description": "<p>401 L'utilisateur ne n'est pas l'auteur</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "COMMENTE-NOT-FOUND",
            "description": "<p>404 ce commentaire n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "POST-NOT-FOUND",
            "description": "<p>404 ce POST n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce commentaire\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce commentaire n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce Post n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"Contenu non fournit\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "POST",
    "url": "/posts/",
    "title": "Poster un post",
    "name": "Poster_un_Post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Permet de Poster un post avec un contenu text et une image [l'image est facutative le contenu est obligatoir]</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>Le text contenu dans le Post OBLIGATOIR</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>L'image du post coder en String en base 64</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    contenu : \"MON POST\",\n    image : \"Mon image coder en base 64\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 201 Created Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"Bonjour10\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n \"likes\": [],\n  \"commentaires\": [],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 Contenu manquant</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Non-Valide",
            "description": "<p>422 Image Mal Encoder</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Not Found\n{\n  \"message\": \"Image Mal Encoder\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"Contenu non fournit\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"merci de vous authentifier\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "DELETE",
    "url": "/posts/:id/commente/:idcommente",
    "title": "Supprimer Un Commentaire",
    "name": "Supprimer_un_Commentaire",
    "group": "Post",
    "description": "<p>Permet de supprimer un commentaire qu'on a écrit seul l'auteur peut supprimer ses commentaire</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 201 Post Commente Created Success\n{\n \"idCreateur\": \"456832154548sdsd78\",\n  \"nomCreateur\": \"Koceila KIRECHE\",\n  \"contenu\": \"Bonjour10\",\n  \"posteLe\": \"2021-03-19T15:41:18.364Z\",\n \"likes\": [\"ID_USER\"],\n  \"commentaires\": [],\n  \"_id\": \"I9lADoRY3e83hAbd\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-different-de-auteur",
            "description": "<p>401 L'utilisateur ne n'est pas l'auteur</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "COMMENTE-NOT-FOUND",
            "description": "<p>404 ce commentaire n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "POST-NOT-FOUND",
            "description": "<p>404 ce post n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce commentaire\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce Post n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce commentaire n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"Contenu non fournit\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "DELETE",
    "url": "/posts/:id",
    "title": "Supprimer un post",
    "name": "Supprimer_un_Post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Permet de supprimer un post qu'on a écrit seul l'auteur peut supprimer ses poste</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Deleted Success",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Utilisateur-different-de-auteur",
            "description": "<p>401 Seul l'auteur peut supprimer son post</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 Le post n'existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas l'auteur de ce post\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce post n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "Post"
  },
  {
    "type": "Post",
    "url": "/user/friends",
    "title": "Ajouter un Ami",
    "name": "Ajouter_un_Amis",
    "group": "USER",
    "description": "<p>Permet d'ajouter une personne à sa liste d'amis</p>",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userToId",
            "description": "<p>L'ID de l'utilisateur à ajouter comme Amis</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    userToId : \"USER_NAME\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "optional": false,
            "field": "Success",
            "description": "<p>Ami ajouter avec sucess</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Duplication",
            "description": "<p>409  la relation d'amitié existe déja</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Demande-Non-Semantique",
            "description": "<p>409 Demande D'amis avec soit  On ne peut pas être ami avec sois même</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "utilisateur-N-existe-pas",
            "description": "<p>404 L'ID de l'utilisateur fournis n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 ID utilisateur à ajouter non fourni</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"L'utilisateur viser n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"ID de l'utilisateur à ajouter n'est pas fournit\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"merci de vous authentifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"la relation d'amitié existe déja\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"on ne peut pas être amis avec soit même\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  },
  {
    "type": "POST",
    "url": "/user/singUp",
    "title": "Connexion",
    "name": "Connexion",
    "group": "USER",
    "description": "<p>Permet à l'utilisateur de s'authentifier via son mail et son mot de passe</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>l'email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>mot de passe de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    email : \"email@domain.com\",\n    password : \"password\"\n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Json",
            "optional": false,
            "field": "Sccess",
            "description": "<p>response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       result: {\n                    email: \"email\",\n                    nom: \"nom\",\n                    prenom: \"prenom\",\n                    bio: \"La bio de l'utilisateur\",\n                    image:\"IMAGE EN STRING BASE 64\"\n                },\n         token #token JWT encode l'id et l'email\n}",
          "type": "josn"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalideFormatEmail",
            "description": "<p>422 Le Format de l'Email est invalide</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Mot-De-Passe-Manquant",
            "description": "<p>422 Le champ mot de passe n'est pas spécifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Email-Manquant",
            "description": "<p>422 Le email n'est pas spécifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>404 Utilisateur n'existe</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErreurServeur",
            "description": "<p>502 Erreur serveur non définie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"L'utilisateur n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Email Manquant\n{\n  \"message\": \"L'email n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Mot de passe manquant\n{\n  \"message\": \"Le mot de passe n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Invalide Email Format\n{\n  \"message\": \"Le format de l'email est invalide\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  },
  {
    "type": "GET",
    "url": "/user/:id",
    "title": "Récupérer le profile d'un user",
    "name": "GET_USER",
    "group": "USER",
    "description": "<p>Permet de profil d'un utilisateur</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id de l'utilisateur</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Json",
            "optional": false,
            "field": "Success",
            "description": "<p>Le profil de l'utilisateur demander</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   id:\"78645\",\n   prenom:\"PRENOM\",\n   nom:\"NOM\",\n   personnesSuivies : [{id:\"5640\",prenom:\"PRENOM\",nom:\"NOM\"}],\n   abonnes:[{id:\"5640\",prenom:\"PRENOM\",nom:\"NOM\"}]\n}",
          "type": "Json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 L'utilisateur n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"l'utilisateur n'existe pas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  },
  {
    "type": "POST",
    "url": "/user/signIn",
    "title": "Inscription",
    "name": "Inscription",
    "group": "USER",
    "description": "<p>Permet la création d'un compte utilisateur</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>l'email de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mot-de-passe",
            "description": "<p>mot de passe l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Image",
            "description": "<p>image coder en base 64</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Prenom",
            "description": "<p>prenom de l'utilisateur</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Nom",
            "description": "<p>nom de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    email : \"email@domain.com\",\n    password : \"password\",\n    image : \"IMAGE ENCODER EN BASE 64\"\n    prenom : \"prenom\",\n    nom : \"Nom\",\n    userName : \"user name\"\n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Json",
            "optional": false,
            "field": "Sccess",
            "description": "<p>response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       result: {\n                    email : \"email@domain.com\",\n                    prenom: Prenom,\n                    nom: Nom,\n                    image:\"IMAGE CODER EN BASE 64\",\n                    bio: \"Bio\"\n                },\n         token #token JWT encode l'id et l'email\n}",
          "type": "type"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalideFormatEmail",
            "description": "<p>422 Le Format de l'Email est invalide</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DuplicationDeMail",
            "description": "<p>409 cette addresse mail existe déja</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Mot-De-Passe-Manquant",
            "description": "<p>422 Le champ mot de passe n'est pas spécifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Email-Manquant",
            "description": "<p>422 Le email n'est pas spécifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNameManquant",
            "description": "<p>422 le champ userName n'est pas spécifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PrenomManquant",
            "description": "<p>422 le champ prenom est n'est pas spécifer</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NomManquant",
            "description": "<p>422 le champ nom est n'est pas spécifer</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ErreurServeur",
            "description": "<p>502 Erreur serveur non définie</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Email Manquant\n{\n  \"message\": \"L'email n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Mot de passe manquant\n{\n  \"message\": \"Le mot de passe n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Invalide Email Format\n{\n  \"message\": \"Le format de l'email est invalide\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Invalide Password Format\n{\n  \"message\": \"Le format de du mot de passe est invalide (entre 4 et 8 charactère)\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 L'encodage de l'image est invalide\n{\n  \"message\": \"L'encodage de l'image est invalide\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 duplication de  L'addresse mail\n{\n  \"message\": \"l'addresse mail existe déja\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 duplication du userName\n{\n  \"message\": \"L'user name existe déja\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Email manquant\n{\n  \"message\": \"Le champ email n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Mot de passe manquant\n{\n  \"message\": \"Le mot de passe n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 nom manquant\n{\n  \"message\": \"Le champ nom n'est pas spécifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 nom manquant\n{\n  \"message\": \"Le champ nom n'est pas spécifier\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  },
  {
    "type": "PUT",
    "url": "/user/:id/",
    "title": "Modifier Un Profil",
    "name": "Modifier_un_Profil",
    "group": "USER",
    "description": "<p>Permet de modifier la bio ou la photo d'un user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Le text de la bio</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>L'image du post coder en String en base 64</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    bio : \"ma bio\",\n    image : \"Mon image coder en base 64\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 200 Post Udated Success\n {\n   id:\"78645\",\n   prenom:\"PRENOM\",\n   nom:\"NOM\",\n   personnesSuivies : [{id:\"5640\",prenom:\"PRENOM\",nom:\"NOM\"}],\n   abonnes:[{id:\"5640\",prenom:\"PRENOM\",nom:\"NOM\"}]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-different-du_profil-viser",
            "description": "<p>401 L'utilisateur n'est pas propriétaire  ce profil</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 aucun des deux param n'as été envoier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Non-Valide",
            "description": "<p>422 Image Mal Encoder</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NOT-FOUND",
            "description": "<p>404 cette user n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Merci de vous authenftifier\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Vous n'etes pas le propriétaire \"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 NOT-FOUND\n{\n  \"message\": \"Ce user n'existe pas\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"aucun des paramètre (bio , image) n'est fournit\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  },
  {
    "type": "Delete",
    "url": "/user/freinds",
    "title": "Retirer un ami",
    "name": "Retirer_un_ami",
    "group": "USER",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>La clé JWT qui permet d'authentifier l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{authorization : \"BEARER YOUR TOKEN\"}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Permet de retirer une personne de sa liste d'amis</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userToId",
            "description": "<p>L'ID de l'utilisateur à retirer de la liste des amis</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    userToId : \"USER_NAME\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Succes",
            "description": "<p>Personne retirer avec succes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not-found",
            "description": "<p>404  la relation d'amitié n'existe pas</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Donnee-Manquante",
            "description": "<p>422 ID utilisateur à retirer n'est pas fourni</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>401 L'utilisateur ne c'est pas authentifier</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Erreur-Serveur",
            "description": "<p>502 Erreur serveur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Il n'existe pas de relation entre ces deux utilisateur\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\": \"ID utilisateur à retirer n'est pas fourni\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"merci de vous authentifier\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api_doc.js",
    "groupTitle": "USER"
  }
] });
