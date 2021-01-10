import React, { useState } from 'react';
import { setUserSession } from '../Utils/Common';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleSignup = () => {
    setError(null);
    setLoading(true);
    const body = { email: email.value, password: password.value }
    
    axios.post('http://localhost:1337/signup', body).then(response => {
      setLoading(false);
      // console.log(response.data.Response.token)
      setUserSession(response.data.Response.token, response.data.Response.user);
      props.history.push('/products');
      location.reload()
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      <div className="col-12">
      <h2 className="text text-center text-primary">Signup</h2>
      <div className="form-group">
        Email<br />
        <input className="form-control" type="email" {...email} autoComplete="new-password" />
      </div>
      <div className="form-group" style={{ marginTop: 10 }}>
        Password<br />
        <input className="form-control" type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input className="form-group form-control btn btn-primary" type="button" value={loading ? 'Loading...' : 'Signup'} onClick={handleSignup} disabled={loading} /><br />
      <div className="navbar-nav"><NavLink to="/login" className="nav-item nav-link">Login</NavLink></div>
      
      </div>
       
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Signup;