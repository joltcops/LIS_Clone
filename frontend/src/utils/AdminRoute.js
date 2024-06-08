import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AdminRoute = ({children, ...rest}) => {
    console.log("AdminRoute");
    console.log(children);
    let user = useContext(AuthContext);
    console.log(user);
    return ( 
        <Route {...rest}>
            {user["user"] === null ? <Redirect to='/' /> : user["user"]["username"] === "admin" ? children : <Redirect to='/' />}
        </Route>
     );
}
 
export default AdminRoute;