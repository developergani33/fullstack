// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeCard from './components/EmployeeCard/EmployeeCard';
import './App.css'
const App = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [newData, setNewData] = useState({ name: '', email: '', body: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments');

        setEmployees(response.data);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setNewData({ name: employee.name, email: employee.email, body: employee.body });
    };

    const handleUpdate = async () => {
        const updatedEmployee = { ...editingEmployee, ...newData };

        

        setEmployees((prev) => 
            prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );

        setEditingEmployee(null);
        setNewData({ name: '', email: '', body: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='container'>
            <h1>Employee Dashboard</h1>
            <div className='cardContainer'>
                {employees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} onEdit={handleEdit} />
                ))}
            </div>
            {editingEmployee && (
                <div className='editForm'>
                    <h2>Edit Employee</h2>
                    <input 
                        type="text" 
                        name="name" 
                        value={newData.name} 
                        onChange={handleChange} 
                        placeholder="Name"
                    />
                    <input 
                        type="text" 
                        name="email" 
                        value={newData.email} 
                        onChange={handleChange} 
                        placeholder="Email"
                    />
                    <textarea 
                        name="body" 
                        value={newData.body} 
                        onChange={handleChange} 
                        placeholder="Comment"
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};



export default App;
