import React, { useState } from 'react';

const AddUser = () => {
    const initialUserState = {
        id:10,
        name: "",
        code: "",
        email: "",
        username: "",
        password: "",
        notification: "",
        type: 1,
        max_books: 2,
        active_no: 0,
        reserve_no: 0,
        fine: 0,
        valid_till: "2024-03-16",
        active_books: [],
        reserved_books: [],
        dept: "",
    };

    const [user, setUser] = useState(initialUserState);
    const [max_books, setMaxBooks] = useState(0);

    const genMaxbooks = () => {
        fetch("http://localhost:8000/api/adm/genmaxbooks")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // Handle error if needed
            }
        })
        .then(data => {
            setMaxBooks(data.max_books);
            setUser(initialUserState);
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });
    }

    const addUser = async () => {
        console.log(user);
        console.log(JSON.stringify(user));
        fetch("http://localhost:8000/api/adm/users/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                console.log(response);
                // setUser(initialUserState); // Resetting the user state to initial values
            } else {
                // Handle error if needed
            }
        })
        .catch(error => {
            // Handle error if needed
            console.error('Error:', error);
        });
    }

    return (
        <div className='addBook'>
            <h2>Add User</h2>
            <div className="searchWrapper">
            <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <br />
            
            <input type="text" placeholder="Code" value={user.code} onChange={(e) => setUser({ ...user, code: e.target.value, username: e.target.value })} />
            <br />
            
            <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <br />
            
            {/* <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <br /> */}
            
            <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <br />
            
            <textarea className='ta' placeholder="Notification" value={user.notification} onChange={(e) => setUser({ ...user, notification: e.target.value })} />
            <br />
          
            <div className="custom-select">
            <select value={user.type} onChange={(e) => setUser({ ...user, type: parseInt(e.target.value) })}>
                <option value={1}>Undergraduate Student</option>
                <option value={2}>Postgraduate Student</option>
                <option value={3}>Research Scholar</option>
                <option value={4}>Faculty Member</option>
            </select>
            </div>
            <div className="custom-select">
            <select value={user.dept} onChange={(e) => setUser({ ...user, dept: e.target.value })}>
            <option value={""}>Select Department</option>
            <option value={"CS"}>Computer Science</option>
            <option value={"EE"}>Electrical Engineering</option>
            <option value={"MA"}>Mathematics</option>
            <option value={"EC"}>Electronics and Communication</option>
            <option value={"ME"}>Mechanical Engineering</option>
            <option value={"CH"}>Chemical Engineering</option>
            <option value={"CE"}>Civil Engineering</option>
            <option value={"CY"}>Cryptography</option>
            <option value={"PH"}>Physics</option>
            <option value={"EX"}>Experimental Science</option>
            <option value={"GG"}>Geology</option>
            <option value={"NA"}>Naval Architecture</option>
            <option value={"MT"}>Metallurgy</option>
            <option value={"BS"}>Biological Sciences</option>
            <option value={"AR"}>Architecture</option>
            <option value={"AG"}>Agriculture</option>
            <option value={"MI"}>Mining</option>
            </select>
            </div>

            <br />
            <p>Membership Valid Till: </p>
            <input type="date" placeholder="Membership validity" value={user.valid_till} onChange={(e) => setUser({ ...user, valid_till: e.target.value })} />
            <br />
            <div className='buttonJugaad'>
            <button onClick={addUser}>Save Changes</button>
            <button onClick={genMaxbooks}>Add User</button>
            </div>
            </div>
        </div>
    );
}

export default AddUser;
