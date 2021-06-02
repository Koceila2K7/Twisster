const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './src/config/.env' });
const GoogleAuthModel = require("../models/google_auth_model");
const google_auth_model = new GoogleAuthModel();

const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            id: user.userName,
            name: `${user.firstName}  ${user.lastName}`
        }, process.env.JWT_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRE });
}

const getIdFromToken = async (token) => {
    const isCostomAuth = token.length < 500;
    let decodedData;
    if (token && isCostomAuth) {
        decodedData = jwt.verify(token, process.env.JWT_KEY);
        return { id: decodedData.id, name: decodedData.name };

    } else {
        decodedData = jwt.decode(token);
        await google_auth_model.insert_if_not_exist(decodedData);
        return { id: decodedData.sub, name: decodedData.name };
    }
}

module.exports = {
    generateToken,
    getIdFromToken
}