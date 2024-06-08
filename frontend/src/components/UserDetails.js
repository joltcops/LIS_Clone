import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {useContext} from 'react';
import Recommended from './Recommended';
const UserDetails = ({user}) => {
    const url=`/userloginstatus/${user.code}`;
    let {logoutUser} = useContext(AuthContext); 
    console.log(user, "user");
    return ( 
        <div className="userdetailspage">
            <div className="userleftpage">
            <div>
        <div className="user">
            <div className="userWrapper">
                <div className="userContent">
            <h2>{user.name}</h2>
            </div>
                <h3>Name: {user.name}</h3>
                <h3>Code Number: {user.code}</h3>
                <h3>Email: {user.email}</h3>
            </div>
            
                <button className='statusbutton' > <Link to ={url} className='underline'>
                User Status </Link></button>
                <div><button className='searchbutton' onClick={(e) => logoutUser()}>Logout</button></div>
                <Link to={"/request/"+user.code}><div><button className='searchbutton'>Make Request</button></div></Link>
            </div>
            <div className = "Recommended">
                <Recommended id={user.id} />

            </div>
            </div>
        </div>
        </div>
     );
}
 
export default UserDetails;