
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StatusUserDetails from '../components/StatusUserDetails';
// import "../styles/userlogin.css";

const UserLoginStatus = () => {
    const { idNumber } = useParams();
    console.log(idNumber, "idNumber");
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                let response = await fetch(`http://localhost:8000/api/users/code/${idNumber}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                let data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        getUser();
    }, [idNumber]);

    // Log user outside useEffect to see the updated value
    console.log(user[0]);

    return (
        <div className="wrapper">
        {user.map((usr, index) => (
        <div key={index} className='userdetails'>
            <StatusUserDetails user={usr}/>
        </div>))}
        </div>
    );
};

export default UserLoginStatus;