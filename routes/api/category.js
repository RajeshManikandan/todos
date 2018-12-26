const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Importing Model
const Category = require('../../models/Category');

//@Route    POST
//ACCESS    PUBLIC
//DESC      Route to add new category
router.post('/', (req, res) => {
    const { name } = req.body;
    console.log(name);
    // Create new Todo
    const newCategory = new Category({
        name
    });

    newCategory
        .save()
        .then(category => {
            res.json(category);
        })
        .catch(err => res.status(404).send('dbInsertError : ' + err));
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      list all category
router.get('/', (req, res) => {
    Category.find()
        .then(categories => {
            if (categories === []) res.send([]);
            else res.json(categories);
        })
        .catch(err => {
            res.status(404).send('fetchTodosError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      Get Specific Category
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Category.findById(id)
        .then(category => {
            if (category === null) res.send('No Category found for ID');
            else res.json(category);
        })
        .catch(err => {
            res.status(404).send('fetchTodosError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      delete category
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Category.findByIdAndDelete(id)
        .then(todo => res.json(category))
        .catch(err => {
            res.status(404).send('deleteTodoError' + err);
        });
});

module.exports = router;
