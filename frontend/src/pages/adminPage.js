import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {useContext} from 'react';

const AdminPage = () => {
    let {logoutUser} = useContext(AuthContext); 
    return ( 
        <div className="adminHome">
            <div className="admHomeContainer">
            <h1>LIBRARY ADMINISTRATION</h1>
            <div className="options">
                <Link to="/book-home"><h2>Manage Books</h2></Link>
                <Link to="/user-home"><h2>Manage Users</h2></Link>
                <Link to="/issue-reserve"><h2>Book Transanctions</h2></Link>
                <Link to="/defaulters"><h2>Send Notification</h2></Link>
                <Link to="/alltransactions"><h2>View Transactions</h2></Link>
                <Link to="/allrequests"><h2>View Requests</h2></Link>
                <h2 onClick={(e) => logoutUser()}>Logout</h2>
            </div>
            </div>
        </div>
     );
}
 
export default AdminPage;