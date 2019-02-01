"use strict";

const TodoCtrl = function (Todo) {

    const TodoObj = {};

    TodoObj.PostTodo = function (req, res) {
        const newTodo = new Todo(req.body);
        newTodo.save(function (err, todo) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            res.json({status: true, todo: todo});
        });
    };

    TodoObj.GetAllTodo = function (req, res) {
        Todo.find(function (err, todos) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            res.json({status: true, todos: todos});
        });
    };

    TodoObj.GetTodo = function (req, res) {
        Todo.findById(req.params.todo_id, function (err, todos) {
            if (err) return res.boom.badRequest('Something went wrong', {extra: err});
            res.json({status: true, todo: todos});
        });
    };

    TodoObj.UpdateCompletedTodo = function (req, res) {
        /** @namespace req.params.todo_id */
        Todo.findById(req.params.todo_id, function (err, todo) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            todo.completed = true;
            todo.save(function (err, todo) {
                if (err) return res.boom.badRequest('Status not updated', {internal: err});
                res.json({status: true, message: "Status updated successfully", todo: todo});
            });
        });
    };

    TodoObj.UpdateTodo = function (req, res) {
        const completed = req.body.completed;
        const name = req.body.name;
        /** @namespace req.params.todo_id */
        Todo.findById(req.params.todo_id, function (err, todo) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            todo.completed = completed;
            todo.name = name;
            todo.save(function (err, todo) {
                if (err) return res.boom.badRequest('Status not updated', {internal: err});
                res.json({status: true, message: "Status updated successfully", todo: todo});
            });
        });
    };

    TodoObj.DeleteTodo = function (req, res) {
        /** @namespace req.params.todo_id */
        Todo.remove({_id: req.params.todo_id}, function (err) {
            if (err) return res.boom.badRequest('Deleting todo is not successfully', {internal: err});
            res.json({status: true, message: "Todo deleted successfully"});
        });
    };

    return TodoObj;
};

module.exports = TodoCtrl;
