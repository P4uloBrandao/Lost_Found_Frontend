import { useAuth, AuthProvider } from '../../AuthContext';
import {Navigate} from 'react-router-dom'

const PoliceRoute = ({children}) =>{
    const { 
        setAuthUser,
        authUser,
        userRole,
        isLoggedIn,
        setIsLoggedIn,logout} = useAuth();
        
    if (isLoggedIn && userRole === "Police"){
       
        return children
        
    }
    
        return <Navigate to={'/login'}/>
        
    
}
export default PoliceRoute