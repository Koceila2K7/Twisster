const Datastore = require('nedb');
require('dotenv').config({ path: './src/config/.env' });

const db = new Datastore({
    filename: process.env.POSTS_FILE_PATH,
    autoload: true,
    onload: err => console.error(err)
});


module.exports = db;

