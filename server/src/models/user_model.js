const UsersSqliteAccess = new require("../data/userBD");


class UserModel {
    constructor() {
        this.data_base = new UsersSqliteAccess();
    }
    /**
     * 
     * @param {String} userName 
     * @return {Promise<Boolean>} true if user name exist in BD.
     */
    userNameExist(userName) {
        return new Promise((resolve, reject) => {
            this.data_base.connect();
            this.data_base.getBd().get("SELECT * FROM user WHERE userName = ?", [userName], (err, data) => {
                if (err) reject(err);
                (data) ? resolve(true) : resolve(false);
            })
        })
    }
    /**
     * 
     * @param {String} email 
     * @return {Promise<Boolean>} true if user email exist in BD.
     */
    emailExist(email) {
        return new Promise((resolve, reject) => {
            this.data_base.connect();
            this.data_base.getBd().get("SELECT * FROM user WHERE email = ?", [email], (err, data) => {
                if (err) reject(err);
                (data) ? resolve(true) : resolve(false);
                this.data_base.close()
            })
        })
    }
    createUser = ({ userName, firstName, lastName, email, password, bio }) => {

        return new Promise((resolve, reject) => {
            this.data_base.connect();
            if (bio) {
                this.data_base.getBd().run("INSERT INTO USER (userName, firstName, lastName, email,password, bio) VALUES (?,?,?,?,?,?)",
                    [userName.trim(), firstName.trim(), lastName.trim(), email.trim(), password.trim(), bio.trim()],
                    err => err ? reject(err) : resolve({ userName, firstName, lastName, email, password, bio }))
            } else {
                this.data_base.getBd().run("INSERT INTO USER (userName, firstName, lastName, email,password) VALUES (?,?,?,?,?)",
                    [userName.trim(), firstName.trim(), lastName.trim(), email.trim(), password.trim()],
                    err => err ? reject(err) : resolve({ userName, firstName, lastName, email, password }))
            }
            this.data_base.close()
        })
    }

    getUserByEmail = (email) => new Promise((resolve, reject) => {
        this.data_base.connect()
        this.data_base.getBd().get("SELECT * FROM user WHERE email = ?", [email.trim()], (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
            this.data_base.close()
        })
    })
    getUserInfo = (id) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().get("SELECT userName, firstName, lastName, email, bio FROM user WHERE userName = ?", [id.trim()], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
            this.data_base.close();
        });
    });

    getAllUsers = async () => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().all('SELECT * FROM user', [], (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data)
            this.data_base.close();
        })
    })
    google_id_exist = (googleId) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().get("SELECT * FROM googleauthentification WHERE googleId = ?", [googleId], (err, data) => {
            if (err) reject(err);
            resolve(data || false);
            this.data_base.close();
        })
    });

    userIdExist = (id) => new Promise((resolve, reject) => {
        this.data_base.connect();
        this.data_base.getBd().get("SELECT * FROM user WHERE userName = ?", [id], (err, data) => {
            if (err) reject(err);
            console.log(data)
            this.data_base.close();
            if (data) {
                resolve(true);
            } else {
                this.google_id_exist(id)
                    .then(d => resolve(d))
                    .catch(e => reject(e))
            }
        })
    })

    search = q => new Promise((resolve, reject) => {
        this.data_base.connect();
        q = "%" + q + "%"
        this.data_base.getBd().all("SELECT userName, firstName, lastName, email, bio FROM USER WHERE userName LIKE ? OR firstName LIKE ? OR lastName LIKE ?", [q, q, q], (err, data) => {
            (err) ? reject(err) : resolve(data)
            this.data_base.close();
        })
    })

    updateProfile({ userInfos, id, password }) {
        return new Promise((resolve, reject) => {
            let reqHeader = "UPDATE USER SET  ";
            let reqCondition = "WHERE userName = '" + id + "'";
            
            let reqBody = userInfos.map(item => {
                if (item.value) {
                    return item.name + " =  '" + item.value + "'";
                }
            });

            reqBody = reqBody.filter(item => item != undefined);
            reqBody = reqBody.reduce((a, b) => a + ',' + b);
            let req = reqHeader + reqBody + reqCondition;
            this.data_base.connect();
            this.data_base.getBd().run(req, [], (err => {
                this.data_base.close();
                return err ? reject(err) : resolve(true);
            }))
        })
    }
}

module.exports = UserModel;



