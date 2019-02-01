// True since it is a parallel middleware
TodoSchema.pre('save', function (next) {
    if (!this.todo) {
        next(new Error("Todo should not be null"));
    }
    next();
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
