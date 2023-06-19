<h1>Lab Overview</h1>

<h2>Lab Purpose</h2>
The purpose of this api is to create a todo that can provide a 
  title: {type: String, required: true},
  description: String,
  completed:{ type: Boolean, default: false},
  
along with an endpoint that will showcase each created todo, a new create todo item, get a specific todo item by ID, and delete a specific todo item by ID.

<h2>server.js</h2>

create a server.js file to set up which domain we'll connect to
we'll need to require in our server the dependencies such as mongoose to connect our app to our Mongodb database that will hold our created users
we connect our database using mongoose.connect and in the parameters of connect input the connection string with dot notation from nodejs
we'll establish the port we'll use to listen for server pings(this one will be 3000)
since we created a separate app.js to separate what logic our app will be using, we will require our app.js file that's exported to be able to apply it's functionality to our server
we can console.log a message to confirm that it connects


<h2>app.js</h2>

Later an app.js was created
in app.js we require the needed dependencies such as express(to send json data) morgan(to log the http requests) and mongoose(to connect to the database)
since I created a separate folder that holds our user routes we'll need to require that to utilize their functions in each endpoint in our app.

<h2>User Routes</h2>

I created a folder called routes and inside it the userRoutes.js was created. That is require because of the needed dependencies in the case that would just be express
a variable called router was created that utilizes the express router method that calls the endpoints to the functions they will run and also the type of request they will send
since it utilize mvc architecture that was created in a file named userController.js that holds each endpoints logic that will direct the flow of our routes then export router so it can be accessed by app.js

<h2>Controllers</h2>

we create a controller.js file

we require the needed dependencies like our schema from our user model, bcrypt for the hashing algorithm for our password security, our jsonwebtoken to require authorization before certain endpoints are reached

<h3>Authorization</h3>
we created an auth function and we're telling it to try to create a variable named token that will be equal to the web token we put in the bearer field in the authorization header
we then create a variable called data that'll verify the web token and our secret key
then we create a user variable that'll search in our database to find a specific user to compare it's web token to the one put into the authorization header but if a user does not exist that matches it, it will throw an error, but if one exists it will be equal to the user it then moves on to the next function for that path that's specified in the routes

<h3>getAllTodoItems</h3>
This function retrieves all todo items from the database using the Todo.find() method. It returns the list of todo items as a JSON response.

<h3>createTodoItem</h3>
This function creates a new todo item based on the request body data. It creates a new instance of the Todo model using new Todo(req.body) and saves it to the database using todo.save(). It then returns the created todo item as a JSON response with a status code of 201.

<h3>getSpecificTodoItem</h3>
This function retrieves a specific todo item from the database based on the provided ID. It uses the Todo.findById(id) method to find the todo item and checks if it exists. If the todo item is found, it is returned as a JSON response. If not found, it returns a JSON response with a status code of 404 and an error message.


<h3>updateTodoItem</h3>
This function updates a specific todo item in the database based on the provided ID and the data in the request body. It uses the Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true }) method to find and update the todo item. If the todo item is successfully updated, the updated todo item is returned as a JSON response. If the todo item is not found, it returns a JSON response with a status code of 404 and an error message.

<h3>deleteTodoItem</h3>
This function deletes a specific todo item from the database based on the provided ID. It uses the Todo.findByIdAndDelete(id) method to find and delete the todo item. If the todo item is successfully deleted, it returns a JSON response with a message indicating that the todo item was deleted. If the todo item is not found, it returns a JSON response with a status code of 404 and an error message.

<h2>Models</h2>
we create a models folder for the m in mvc architecture and inside make user.js file
in this file we make the schema which is a blueprint for how we want the data structured
it is also gonna encrypt any passwords sent into has using the bcrypt dependency that we installed
the model will hold logic to generate a web token that will be called when authorization is needed
we then create a User(capital u) variable that export all this logic to be accessed by other files

<h2>Testing With Supertest and Jest</h2>

we created a directory called tests that holds our file called user.test.js and in this is our test suite
for this we'll have to set these tests to a new port separate from the one our api is using
we require mongodb memory server here because we want to make sure the users created for the are pushed into a memory server and not our actual main database
we set before All and after All functions to make sure that a memory server database is created before the test suite and to close and stop the server after the testing is done
we then create test cases for each route to make sure they are properly functioning

<h2>Load Testing With Artillery</h2>

we create scenarios for each of our routes beginning with config, then choose localhost:3000 which is the port our api is using
we then set the phases to be 20 users arriving per second for a minute straight before all scenarios
for our index and create user routes we only need to make one http request because we don't need authorization unlike the other routes
for the routes that require authorization we begin by creating a user to be able to capture the web token and assign it to a variable that will be used for the request that we are initially testing for

<h2> These functions handle the basic CRUD (Create, Read, Update, Delete) operations for todo items in the database. They receive HTTP requests, interact with the database using the Todo model, and send appropriate JSON responses back to the client.

</h2>