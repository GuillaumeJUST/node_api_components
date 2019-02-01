const mongoose = require('../../datasources/mongo');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: String,
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now}
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
