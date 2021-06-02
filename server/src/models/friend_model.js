const UsersSqliteAccess = new require("../data/userBD");


class FriendModel {
    constructor() {
        this.data_base = new UsersSqliteAccess();
    }

    addFriend = (userFrom, userTo) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().run("INSERT INTO friend (userFrom, userTo) VALUES (?,?)", [userFrom, userTo], err => {
            if (err) reject(err)
            else resolve(true);
            this.data_base.close();
        })
    })

    friendRelationExist = (userFrom, userTo) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().get("SELECT * FROM   friend WHERE (userFrom = ? AND userTo = ?)", [userFrom, userTo], (err, data) => {
            if (err) reject(err);
            resolve(data || false);
            this.data_base.close();
        })
    })

    deleteFriendRelation = (userFrom, userTo) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().run("DELETE FROM friend WHERE userFrom = ? AND userTo = ?", [userFrom, userTo], err => {
            if (err) reject(err);
            resolve(true);
            this.data_base.close();
        })
    })

    get_freinds_of = id => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().all("SELECT userTo FROM friend WHERE userFrom = ?", [id], (err, data) => {
            this.data_base.close();
            err ? reject(err) : resolve(data);
        });
    });

    who_has_as_friends = id => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().all("SELECT * FROM friend WHERE userTo = ?", [id], (err, data) => {
            this.data_base.close();
            err ? reject(err) : resolve(data);
        })
    })
}

module.exports = FriendModel;



