import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    console.log("PrivateRoute");
    console.log(children);
    let user = useContext(AuthContext);
    console.log(user);
    return ( 
        <Route {...rest}>
            {user["user"] === null ? <Redirect to='/' /> : children}
        </Route>
     );
}
 
export default PrivateRoute;