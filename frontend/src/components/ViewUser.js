import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const ViewUser = () => {
    const [searchKey, setSearchKey] = useState('');
    const [userData, setUserData] = useState([]);
    const [found, setFound] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/code/${searchKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data);
            setFound(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/adm/users/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            console.log('User deleted successfully');
            setUserData([]); 
            setFound(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    // console.log(userData[0].active_books);
    return (
        <div className='viewBook'>
            <h2>Search/ Delete</h2>
            <div className="searchWrapperLight">
            <input
                type="text"
                placeholder="Enter user code"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {userData.length>0 && found && (
            <div className="wrapper">
                {userData.map((user, index) => (
                <div key={index} className='userDetails'>
                    <div className="user-wrappe">
                    <h3>User Info</h3>
                    <p>Name: {user.name}</p>
                    <p>Department: {user.dept}</p>
                    <p>Code: {user.code}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>Password: {user.password}</p>
                    <p>Notification: {user.notification}</p>
                    <p>Type: {(user.type === 1 && "UG") || (user.type === 2 && "PG" || (user.type === 3) && "RS" || (user.type === 4) && "Faculty")}</p>
                    <p>Max Books: {user.max_books}</p>
                    <p>Active No: {user.active_no}</p>
                    <p>Reserve No: {user.reserve_no}</p>
                    <p>Fine: {user.fine}</p>
                    <p>Valid Till: {user.valid_till}</p>
                    <p>Active Books:</p>
                    <div className='active_books'>
                    
                    {user.active_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
            <p>Reserved Books:</p>
            <div className='active_books'>
                    
                    {user.reserved_books.map(id => (
                    <Link to = {"book/"+id} key={id}>
                        <p>{id}</p>
                    </Link>
                ))}
            </div>
                </div>
                </div>
                ))}
                {found&&<button className="delete" onClick={() => {console.log(userData[0].id);deleteUser(userData[0].id);}}>Delete</button>}
                {found&&<Link to={"/editUser/"+userData[0].id}><button className='delete'>Edit</button></Link>}
            </div>
            
            )}
        </div>
        </div>
    );
};

export default ViewUser;

// {userData && (
//     <div className="wrapper">
//         <div>
//             {/* <h2>{userData.name}</h2> */}
//             <pre>{JSON.stringify(userData, null, 2)}</pre>
//         </div>
//         <button className="delete" onClick={() => deleteUser(userData.id)}>Delete</button>
//     </div>
// )}

