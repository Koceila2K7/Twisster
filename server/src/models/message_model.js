const db = require('../data/message_bd');


class Message {
    constructor() {
        this.db = db;
    }
    new_conversation(users = [], messages = []) {
        return {
            users,
            messages
        }
    }

    insert_new_message({ data, to, from }) {
        db.find({
            $or: [
                { $and: [{ users: { $elemMatch: to } }, { users: { $elemMatch: from } }] },
                { $and: [{ users: { $elemMatch: from } }, { users: { $elemMatch: to } }] },
            ]
        },
            function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    if (docs.length > 0) {
                        let newmessages = [...docs[0].messages, { from, to, data, date: new Date() }];
                        db.update({
                            $or: [
                                {
                                    $and: [
                                        { users: { $elemMatch: to } },
                                        { users: { $elemMatch: from } }
                                    ]
                                },
                                {
                                    $and: [
                                        { users: { $elemMatch: from } },
                                        { users: { $elemMatch: to } }
                                    ]
                                }
                            ]
                        },
                            {
                                $set: {
                                    messages: newmessages
                                }
                            }
                            , {}
                            , err => err ? console.log(err) : null)
                    } else {
                        db.insert({
                            users: [to, from],
                            messages: [{ from, to, data, date: new Date() }]
                        })
                    }
                }
            })
    }

    get_conversations = async (userId) => new Promise((resolve, reject) => this.db.find(
        {
            users:
                { $elemMatch: userId }
        }, (err, docs) => err ? reject(err) : resolve(docs)))


}

module.exports = Message;