// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let employees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', body: 'This is a comment.' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', body: 'This is another comment.' },
    
];

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Update an employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        employees[index] = { id: parseInt(id), ...req.body };
        res.json(employees[index]);
    } else {
        res.status(404).send('Employee not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
