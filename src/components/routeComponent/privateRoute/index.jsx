import { useAuth, AuthProvider } from '../../AuthContext';
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}) =>{
    const { 
        setAuthUser,
        authUser,
        isLoggedIn,
        setIsLoggedIn,logout} = useAuth();
        
    if (!isLoggedIn){
       
        return <Navigate to={'/login'}/>
    }
    return(
        children
    )
}
export default PrivateRoute