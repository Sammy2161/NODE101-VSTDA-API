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

    /// Tell the terminal to print out the newly updated list!
    console.log("NEW ITEM ADDED! Here is the updated list:", todoItems);

    res.status(201).json(newItem);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    const requestedNumber = req.params.number;

    // 1. Find the index (the seat number) of the item we want to delete
    const index = todoItems.findIndex(item => item.todoItemId === Number(requestedNumber));

    // 2. If the index is -1, it means the item wasn't found
    if (index !== -1) {
        // 3. Remove 1 item starting at that index
        const deletedItem = todoItems.splice(index, 1);
        
        console.log(`DELETED item ID: ${requestedNumber}. Updated list:`, todoItems);

        // 4. Send back the item we just deleted as a confirmation
        res.status(200).json(deletedItem[0]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// NEW ROUTE 5: Update a specific item
app.put('/api/TodoItems/:number', (req, res) => {
    // 1. Grab the ID from the URL
    const requestedNumber = req.params.number;

    // 2. Grab the updated package from the customer
    const updatedItem = req.body;

    // 3. Find the exact item in your todoItems array 
    const index = todoItems.findIndex(item => item.todoItemId === Number(requestedNumber));

    // If the item actually exists in our list...
    if (index !== -1) {
        // 4. Target that specific seat in the array and overwrite it with the new package
        todoItems[index] = updatedItem;

        // Optional: Prove it worked in your VS Code terminal!
        console.log(`UPDATED item ID: ${requestedNumber}. Updated list:`, todoItems);

        // 5. Send back a 200 OK status and a copy of the newly updated item
        res.status(200).json(updatedItem);
    } else {
        // If they asked to update an item that doesn't exist
        res.status(404).json({ error: "Item not found" });
    }
});


// Start the server
app.listen(8484, () => {
    console.log('Server running on http://localhost:8484');
});
    
module.exports = app;