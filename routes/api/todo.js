const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Importing Model
const Todo = require('../../models/Todo');

//@Route    POST
//ACCESS    PUBLIC
//DESC      Route to add new Todo
router.post('/todo', (req, res) => {
    const { name } = req.body;
    // Create new Todo
    const newTodo = new Todo({
        name
    });

    newTodo
        .save()
        .then(todo => {
            res.json(todo);
        })
        .catch(err => res.status(404).send('dbInsertError : ' + err));
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      list all todo list
router.get('/todo', (req, res) => {
    Todo.find()
        .then(todos => {
            console.log(todos);
            if (todos === []) res.json('no todos fo und');
            else res.json(todos);
        })
        .catch(err => {
            res.status(404).send('fetchTodosError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      delete todo
router.delete('/todo/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Todo.findByIdAndDelete(id)
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(404).send('deleteTodoError' + err);
        });
});

module.exports = router;
