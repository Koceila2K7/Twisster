const UsersSqliteAccess = new require("../data/userBD");


class GoogleAuthModel {
    constructor() {
        this.data_base = new UsersSqliteAccess();

    }

    google_id_exist = (googleId) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().get("SELECT * FROM googleauthentification WHERE googleId = ?", [googleId], (err, data) => {
            if (err) reject(err);
            resolve(data || false);
            this.data_base.close();
        })
    })

    insert = (decoded_token) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().run("INSERT INTO googleauthentification (googleId, email, family_name, given_name) VALUES (?, ?, ?, ?)",
            [decoded_token.sub, decoded_token.email, decoded_token.family_name, decoded_token.given_name],
            err => {
                if (err)
                    reject(err)
                resolve(true)
                this.data_base.close();
            })
    })

    insert_if_not_exist = (decoded_token) => new Promise((resolve, reject) => {
        this.google_id_exist(decoded_token.sub)
            .then(data => {
                if (data) resolve(true)
                else this.insert(decoded_token).then(data => resolve(data))
                    .catch(e => reject(e))
            }).catch(e => reject(e))
    })
}

module.exports = GoogleAuthModel;



