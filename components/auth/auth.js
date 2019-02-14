const mongoose = require('../../datasources/mongo');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    idToken: String,
    email: String,
    expiresIn: Number,
    created_at: {type: Date, default: Date.now}
});

const AuthModel = mongoose.model('Auth', AuthSchema);

module.exports = AuthModel;