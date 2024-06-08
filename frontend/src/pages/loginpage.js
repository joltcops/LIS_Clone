import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext); 
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='loginfull'>
            <div className='half1'> 
                <h2 className='LoginPage'>LOGIN PAGE</h2>
                <input name="username" className='textbox' type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
                <input name="password" className='password' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className='savechangesbutton' onClick={(e) => loginUser(userId, password)}><p className='viewBookContentunderline'>Login</p></button>
                <button className='savechangesbutton'><Link className='viewBookContentunderline' to='/'>Back to Home</Link></button>
            </div>
            <div className='half2'></div>
        </div>
    );
};

export default LoginPage;