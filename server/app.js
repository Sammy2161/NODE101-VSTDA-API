const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

const todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the VSTDA API" });
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(todoItems);
});

app.get('/api/TodoItems/:number', (req, res) => {
    const requestedNumber = req.params.number;
    const foundItem = todoItems.find(item => item.todoItemId === Number(requestedNumber));

   if (foundItem) {
        res.status(200).json(foundItem);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.post('/api/TodoItems', (req, res) => {
    const newItem = req.body;
    todoItems.push(newItem);

    console.log("NEW ITEM ADDED! Here is the updated list:", todoItems);

    res.status(201).json(newItem);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    const requestedNumber = req.params.number;

    const index = todoItems.findIndex(item => item.todoItemId === Number(requestedNumber));

    if (index !== -1) {
       
        const deletedItem = todoItems.splice(index, 1);
        
        console.log(`DELETED item ID: ${requestedNumber}. Updated list:`, todoItems);

        res.status(200).json(deletedItem[0]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});


app.put('/api/TodoItems/:number', (req, res) => {

    const requestedNumber = req.params.number;

    const updatedItem = req.body;

    const index = todoItems.findIndex(item => item.todoItemId === Number(requestedNumber));

    if (index !== -1) {

        todoItems[index] = updatedItem;


        console.log(`UPDATED item ID: ${requestedNumber}. Updated list:`, todoItems);

        res.status(200).json(updatedItem);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

    
module.exports = app;