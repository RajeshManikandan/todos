const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
var TimeSpan = require('../../middlewares/TimeSpan');
/*
Routes Required
add todo - name, category ./
add description to todo - description ./
list todo by category ./
change status todo - todo-id and status ./
start todo counting - todo-id ./
pause todo counting and update time - todo-id ./
delete todo - todo-id ./
add sub-task - todo-id and sub-task-name ./
change status of sub-task - todo-id and sub-task-id
*/

//Importing Model
const Todo = require('../../models/Todo');
const Category = require('../../models/Category');

//@Route    POST
//ACCESS    PUBLIC
//DESC      Route to add new Todo
router.post('/', (req, res) => {
    const { name, categoryId } = req.body;
    Category.findById(categoryId)
        .then(category => {
            if (category != null) {
                // Create new Todo
                const newTodo = new Todo({
                    name,
                    category
                });
                //Save Todo
                newTodo
                    .save()
                    .then(todo => {
                        res.json(todo);
                    })
                    .catch(err => res.status(404).send('dbInsertError : ' + err));
            } else res.status(404).send('No Category found for ID');
        })
        .catch(err => res.status(404).send('categoryFindError : ' + err));
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      get all todo list
router.get('/', (req, res) => {
    Todo.find()
        .then(todos => {
            if (todos === []) res.json('no todos found');
            else res.json(todos);
        })
        .catch(err => {
            res.status(404).send('fetchTodosError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      get all todo list by category
router.get('/category/:categoryid', (req, res) => {
    var categoryID = req.params.categoryid;
    Todo.find({ category: categoryID })
        .then(todos => {
            if (todos === []) res.json('no todos found');
            else res.json(todos);
        })
        .catch(err => {
            res.status(404).send('fetchTodosError' + err);
        });
});

//@Route    DELETE
//ACCESS    PUBLIC
//DESC      delete todo
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Todo.findByIdAndDelete(id)
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(404).send('deleteTodoError' + err);
        });
});

//@Route    POST
//ACCESS    PUBLIC
//DESC      Add Description to Todo
router.post('/desc', (req, res) => {
    const { desc, todoId } = req.body;
    Todo.findByIdAndUpdate({ _id: todoId }, { $set: { description: desc } }, { new: true })
        .then(todo => {
            res.send(todo);
        })
        .catch(err => {
            res.status(404).send('updateDescError' + err);
        });
});

//@Route    POST
//ACCESS    PUBLIC
//DESC      Update Todo Status
router.post('/status', (req, res) => {
    const { status, todoId } = req.body;
    Todo.findByIdAndUpdate({ _id: todoId }, { $set: { status: status } }, { new: true })
        .then(todo => {
            res.send(todo);
        })
        .catch(err => {
            res.status(404).send('updateDescError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      Start Todo Counting
router.get('/:todoID/play', (req, res) => {
    const { todoID } = req.params;
    Todo.findByIdAndUpdate({ _id: todoID }, { $set: { status: 'Playing', lastStartTime: Date.now() } }, { new: true })
        .then(todo => {
            res.send(todo);
        })
        .catch(err => {
            res.status(404).send('updateDescError' + err);
        });
});

//@Route    GET
//ACCESS    PUBLIC
//DESC      Pause Todo Counting
router.get('/:todoID/pause', (req, res) => {
    const { todoID } = req.params;
    Todo.findByIdAndUpdate({ _id: todoID }, { $set: { status: 'Open' } }, { new: true })
        .then(todo => {
            var timeDiff = Date.now() - todo.lastStartTime;

            if (todo.totalWorkTime) {
                timeDiff = timeDiff + TimeSpan().toMilliseconds(todo.totalWorkTime);
            }

            todo.totalWorkTime = TimeSpan(timeDiff).toJson();
            todo.lastStartTime = null;
            todo
                .save()
                .then(todo => res.json(todo))
                .catch(err => res.status(404).send('updateTimeError' + err));
        })
        .catch(err => {
            res.status(404).send('updateDescError' + err);
        });
});

//@Route    POST
//ACCESS    PUBLIC
//DESC      Add Sub Task
router.post('/subtask', (req, res) => {
    const { todoID, name } = req.body;
    Todo.findById({ _id: todoID })
        .then(todo => {
            const newSubTask = {
                name
            };
            console.log(todo);
            todo.subtasks.push(newSubTask);
            todo
                .save()
                .then(todo => {
                    res.send(todo);
                })
                .catch(err => {
                    res.status(404).send('addSubTaskError' + err);
                });
        })
        .catch(err => {
            res.status(404).send('addSubTaskError' + err);
        });
});

//@Route    POST
//ACCESS    PUBLIC
//DESC      Add Sub Task
router.post('/subtask/status', (req, res) => {
    const { todoID, subtask_id, status } = req.body;
    Todo.findById({ _id: todoID })
        .then(todo => {
            todo.subtasks.forEach(subtask => {
                if (subtask.id === subtask_id) {
                    subtask.isCompleted = status;
                }
            });

            todo
                .save()
                .then(todo => {
                    res.send(todo);
                })
                .catch(err => {
                    res.status(404).send('updateSubTaskStatusError' + err);
                });
        })
        .catch(err => {
            res.status(404).send('updateSubTaskStatusError' + err);
        });
});

module.exports = router;
