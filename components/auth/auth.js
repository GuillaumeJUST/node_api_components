const mongoose = require('../../datasources/mongo');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    idToken: String,
    email: String,
    password: String
});

const AuthModel = mongoose.model('loginWithEmail', AuthSchema);

module.exports = AuthModel;