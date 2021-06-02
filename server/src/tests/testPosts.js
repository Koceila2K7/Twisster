const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../appTest.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');
const { assert } = require('chai');

// Configurer chai
chai.use(chaiHttp);
chai.should();


let descriptions = "Test de l'API POST "
    + "\n\t1-Connexion status de réponse 200 et body doit avoir une proprité :token"
    + "\n\t2-Publication d'un post status de réponse 201 et le body doit avoir une proprité : _id"
    + "\n\t3-LIKER  le post (res.boby.likes.length == 1)"
    + "\n\t4-DISLIKER  le post  (res.boby.likes.length == 0)"
    + "\n\t5-COMMENTER le post  (res.boby.commentaires.length == 1)"
    + "\n\t6-Supprimer le post publier status de réponse 200 : _id"
    + "\n\t7-Re-supprimer le post publier status de réponse 404 : _id"

mocha.describe(descriptions, () => {
    mocha.it("should POST : ", (done) => {
        const request = chai.request(app.default).keepOpen();
        const post = {
            contenu: "regarder mon super post",
        };
        const user = {
            email: "azul@azul.azul",
            password: "azul"
        }
        request.
            post('/api/user/signIn')
            .send(user)
            .then((res) => {
                res.should.have.status(200);
                res.body.should.have.property("token")
                let token = res.body.token;
                return (
                    request.post('/api/posts/')
                        .set({ Authorization: `Bearer ${token}` })
                        .send(post)
                        .then((res) => {
                            res.should.have.status(201);
                            res.body.should.have.property("_id");
                            let postid = res.body._id
                            return request.post('/api/posts/' + postid + '/like')
                                .set({ Authorization: `Bearer ${token}` })
                                .send()
                                .then((res) => {
                                    console.table(res.body)
                                    res.should.have.status(200)
                                    res.body.should.have.property("likes");
                                    
                                    assert.equal(res.body.likes.length, 1);
                                    return (request.post('/api/posts/' + postid + '/like')
                                        .set({ Authorization: `Bearer ${token}` })
                                        .send()
                                        .then((res) => {
                                            res.should.have.status(200)
                                            res.body.should.have.property("likes");
                                            assert.equal(res.body.likes.length, 0);
                                            return request.post('/api/posts/' + postid + "/commente")
                                                .set({ Authorization: `Bearer ${token}` })
                                                .send({ contenu: "mon super commentaire" })
                                                .then((res) => {
                                                    res.should.have.status(201);
                                                    res.body.should.have.property("commentaires");
                                                    assert.equal(res.body.commentaires.length, 1)
                                                    return (request.delete('/api/posts/' + postid)
                                                        .set({ Authorization: `Bearer ${token}` })
                                                        .send(post)
                                                        .then(res => {
                                                            res.should.have.status(200)
                                                            return(request.delete('/api/posts/' + postid)
                                                                .set({ Authorization: `Bearer ${token}` })
                                                                .send(post)
                                                                .then(res => {
                                                                    res.should.have.status(404)

                                                                }).catch(e => { console.error(e) }))
                                                        }).catch(e => { console.error(e) }))
                                                }).catch(e => console.error(e))

                                        }).catch(e => { console.error(e) })
                                    )

                                }).catch(e => { console.error(e) })

                        }).catch(e => { console.error(e) }))


            }).then(() => done(), () => done(), () => done(), () => done(),  () => done(), () => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
  
    })
})