import React from 'react';
import {Link} from 'react-router-dom';
import AddBook from '../components/AddBook';
import ViewBook from '../components/ViewBook';
const BookHome = () => {
    return ( 
        <div className="bookHome">
           <div className="topbar">
            <div><Link to="/"><h3>Home</h3></Link></div>
            <div><Link to="/userlogin/admin"><h3>Back</h3></Link></div>
           </div>
           <div className="homeContainer">
            <div className="left_bh">
           <AddBook/>
           </div>
           <div className="right_bh">
              <ViewBook/>
              </div>
              </div>
        </div>
     );
}
 
export default BookHome;