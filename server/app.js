require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const createTodo = require("./controllers/todoController")
const getTodos = require("./controllers/todoController")
const updateTodo = require("./controllers/todoController")
const deleteTodo = require("./controllers/todoController")
const cors = require("cors")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).then(() => app.listen(PORT, () => console.log(`Server is listening to Port: ${PORT}`))).catch((err) => console.log(err))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`we're connected!`);
});


app.get("/todos", getTodos)

app.post("/create-todos", createTodo)

app.put("/update-todos/:id", updateTodo)

app.delete("/delete-todos/:id", deleteTodo)
