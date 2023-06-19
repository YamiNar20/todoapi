const Todo = require('../models/todo');

// Get all todo items
exports.getAllTodoItems = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new todo item
exports.createTodoItem = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific todo item by ID
exports.getSpecificTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a specific todo item by ID
exports.updateTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific todo item by ID
exports.deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo) {
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
