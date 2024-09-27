
import React from 'react';
import './EmployeeCard.css'

const EmployeeCard = ({ employee, onEdit }) => {
    return (
        <div className='card'>
            <h3>{employee.name}</h3>
            <p>Email: {employee.email}</p>
            <p>Comment: {employee.body}</p>
            <button onClick={() => onEdit(employee)}>Edit</button>
        </div>
    );
};




export default EmployeeCard;
