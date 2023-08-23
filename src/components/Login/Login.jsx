import React from 'react'
import "./Login.scss";
import {  useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/");
    }

    return (
        <div className='login'>
            <input type="text" name="username" id="username" defaultValue="admin" />
            <label htmlFor="username">Username</label>
            <input type="password" name="password" id="password" defaultValue="admin" />
            <label htmlFor="password">Password</label>
            <button type='submit' onClick={() => handleSubmit()}>Submit</button>
        </div>
    )
}

export default Login