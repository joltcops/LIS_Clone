import React from 'react';
import {Link} from 'react-router-dom';
import AddUser from '../components/AddUser';
import ViewUser from '../components/ViewUser';
const BookHome = () => {
    return ( 
        <div className="bookHome">
           {/* <h1>Manage Books</h1> */}
           <div className="topbar">
            <div><Link to="/"><h3>Home</h3></Link></div>
            <div><Link to="/userlogin/admin"><h3>Back</h3></Link></div>
           </div>
           <div className="homeContainer">
            <div className="left_bh">
           <AddUser/>
           </div>
           <div className="right_bh">
              <ViewUser className="right_bh"/>
              </div>
              </div>
        </div>
     );
}
 
export default BookHome;