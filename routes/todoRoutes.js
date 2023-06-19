const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getAllTodoItems);//GET /todos: Get all todo items
router.post('/', todoController.createTodoItem);//POST /todos: Create a new todo item.
router.get('/:id', todoController.getSpecificTodoItem);//GET /todos/:id: Get a specific todo item.
router.put('/:id', todoController.updateTodoItem); // PUT /todos/:id: Update a specific todo item.
router.delete('/:id', todoController.deleteTodoItem); // DELETE /todos/:id: Delete a specific todo item.


module.exports = router
