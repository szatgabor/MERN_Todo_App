const todoModel = require("../models/todo");

const createTodo = async (req, res) => {
    try{
        const newTodo = await todoModel.create({task: req.body.task, completed: req.body.completed})
        res.status(201).json({message: "Todo created!", data: newTodo})
    }catch(err){
        res.status(404).json({message: "Oooops, there is an error", error: err})
    }
    
}

const getTodos = async (req, res) => {
    try{
        const todos = await todoModel.find({})
        res.status(201).json({message: "Here are the Todos", data: todos})
    }catch(err){
        res.status(404).json({message: "failed to get todos", error: err})
    }
}

const updateTodo = async (req, res) =>{
    try{
        const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            useFindAndModify: false,
        })
        res.status(201).json({message: "Todo edited", data: todo})
    }catch(err){
        res.status(404).json({message: "failed to edit todos", error: err})
    }
}

const deleteTodo = async (req, res) =>{
    try{
        const removeTodo = await todoModel.findByIdAndDelete(req.params.id)
        res.status(202).json({message: "Todo deleted!", data: removeTodo})
    }catch(err){
        res.status(204).json({message: "failed to delete todo", error: err})
    }
}

// const todoFunctions = {
//     createTodo,
//     getTodos,
//     updateTodo,
//     deleteTodo,
// }
// // default exports
// module.exports = todoFunctions;

// named exports
const myModule = module.exports;
myModule.createTodo = createTodo;
myModule.getTodos = getTodos;
myModule.updateTodo = updateTodo;
myModule.deleteTodo = deleteTodo;
