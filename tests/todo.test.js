const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Initialize MongoDB Memory Server
const Todo = require('../models/todo');
const request = require('supertest');
const app= require ('../app'); // Replace '../app' with the correct path to your application entry point
const server= app.listen(8080,() => console.log('testingnonport8080'));

let mongoServer=

// Connect to the in-memory database
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Todo.deleteMany();
});

// Clear the database and disconnect
afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});


describe('Test the todo endpoints', () => {
  // Create a sample todo item before each test
  beforeEach(async () => {
    const sampleTodo = new Todo({
      title: 'Sample Todo',
      description: 'This is a sample todo item',
    });
    await sampleTodo.save();
  });

  // Clear the todo collection after each test
  afterEach(async () => {
    await Todo.deleteMany();
  });

  // Test the GET /todos endpoint
  describe('GET /todos', () => {
    it('should get all todo items', async () => {
      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Sample Todo');
      expect(response.body[0].description).toBe('This is a sample todo item');
    });
  });


  // Test the POST /todos endpoint
  describe('POST /todos', () => {
    it('should create a new todo item', async () => {
      const todoData = {
        title: 'Start cleaning',
        description: 'This is a new todo cleaning item',
      };
      const response = await request(app)
        .post('/todos')
        .send(todoData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Start cleaning');
      expect(response.body.description).toBe('This is a new todo cleaning item');
    });
  });


  // Test the GET /todos/:id endpoint
  describe('GET /todos/:id', () => {
    it('should get a specific todo item', async () => {
      const sampleTodo = await Todo.findOne({ title: 'Sample Todo' });
      const response = await request(app).get(`/todos/${sampleTodo._id}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Sample Todo');
      expect(response.body.description).toBe('This is a sample todo item');
    });

    it('should return 404 if todo item is not found', async () => {
      const invalidId = '123456789012345678901234'; // Invalid ID
      const response = await request(app).get(`/todos/${invalidId}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Todo not found');
    });
  });

  // Test the PUT /todos/:id endpoint
  describe('PUT /todos/:id', () => {
    it('should update a specific todo item', async () => {
      const sampleTodo = await Todo.findOne({ title: 'Sample Todo' });
      const updatedData = {
        title: 'Updated Todo',
        description: 'This is an updated todo item',
        completed: true,
      };
      const response = await request(app)
        .put(`/todos/${sampleTodo._id}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Todo');
      expect(response.body.description).toBe('This is an updated todo item');
    });
  });
});