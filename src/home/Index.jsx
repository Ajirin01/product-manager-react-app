import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - CRUD with React Hook Form</h1>
            <p>This project utilizes Reactjs and nodejs/Expressjs REST API to perform create, read, update and delete operation on Product Database</p>
            <p><Link to="products">&gt;&gt; Manage Products</Link></p>
        </div>
    );
}

export { Home };