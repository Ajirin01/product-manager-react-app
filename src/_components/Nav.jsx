import React from 'react';
import { NavLink } from 'react-router-dom';
import { getToken, removeUserSession } from '@/Utils';

function Nav() {
    function logout(e){
        console.log("logout")
        console.log(e.target.href)
        removeUserSession();
        location.reload()
    }
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                {getToken() != null ?  <NavLink to="/logout" onClick={ (e) => logout(e)} className="nav-item nav-link">logout</NavLink>  : <NavLink to="/login" className="nav-item nav-link">Login</NavLink>}
                <NavLink to="/products" className="nav-item nav-link">Products</NavLink>
            </div>
        </nav>
    );
}

export { Nav };