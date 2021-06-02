const sql = require("sqlite3").verbose();
require('dotenv').config({ path: './src/config/.env' });

class UsersSqliteAccess {
    constructor() {
        this.db = null;
    }
    connect() {
        this.db = new sql.Database(process.env.USER_BDD, (err) => {
            if (err)
                throw err;
            else
                console.log("DB created");
            this.init();
        });
    }

    init() {
        this.db.run("CREATE TABLE IF NOT EXISTS user (" +
            "userName VARCHAR(20) PRIMARY KEY," +
            "firstName VARCHAR(20)," +
            "lastName VARCHAR(20)," +
            "email VARCHAR(50)," +
            "password VARCHAR(20)," +
            "bio VARCHAR(100)" +
            ")", err => (err) ? console.error(err) : console.log("USER DB CREATED"));

        this.db.run("CREATE TABLE IF NOT EXISTS friend (" +
            "userFrom VARCHAR(20) NOT NULL," +
            "userTo VARCHAR(20) NOT NULL," +
            "PRIMARY KEY (userFrom, userTo)" +
            ")", err => (err) ? console.error(err) : console.log("FREIND DB CREATED"));

        this.db.run("CREATE TABLE IF NOT EXISTS googleauthentification (" +
            "googleId VARCHAR(100) PRIMARY KEY," +
            "email VARCHAR(50)," +
            "family_name VARCHAR(20)," +
            "given_name VARCHAR(20))", err => (err) ? console.error(err) : console.log("googleauthentification DB CREATED"));
    }

    getBd() {
        return this.db;
    }
    
    close() {
        this.db.close(err => console.error(err));
    }
}
module.exports = UsersSqliteAccess;