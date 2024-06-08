import {createContext, useState, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [ user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true);
    let history = useHistory();

    let loginUser = async(username, password) => {
    

        console.log(username);
        console.log(password);
        console.log('form submitted');
        
        
        let response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username' : username,
            'password' : password
        })


    });

    

    if (!response.ok) {
        console.error('Failed to fetch:', response.status, response.statusText);
        window.alert('Invalid Credentials');
        return;
    }

    let data = await response.json();
    console.log('Response data:', data);
    setAuthTokens(data);
    setUser(jwtDecode(data.access))
    localStorage.setItem('authTokens', JSON.stringify(data));
    history.replace('/userlogin/'+username);
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.replace('/');
    }

    let updateToken = async() => {
        console.log('Updating token');
        let response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'refresh' : authTokens.refresh,
        })});

        if (!response.ok) {
            console.error('Failed to fetch:', response.status, response.statusText);
            logoutUser();
            return;
        }
    
        let data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
    }

    let contextData = {
        user: user, 
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(() => {
        let oneHr = 3600000;
       let interval = setInterval(() => {
        if (authTokens) {
            updateToken();
        }
       }, oneHr)
       return () => clearInterval(interval);

    }, [authTokens, loading])

    return(
        
        <AuthContext.Provider value={contextData}> 
            {children}
        </AuthContext.Provider>
    )
}
