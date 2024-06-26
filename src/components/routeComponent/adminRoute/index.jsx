import { useAuth } from '../../AuthContext';
import {Navigate} from 'react-router-dom'

const AdminRoute = ({children}) =>{
    const { 
        setAuthUser,isAdmin,setUserRole,userRole,
        authUser,setIsAdmin,
        isLoggedIn,logout,
        setIsLoggedIn} = useAuth();
      
    if (isAdmin && isLoggedIn){
      
        return (children )
    }
   
   return(
            
         <Navigate to={'/login'}/>
    )
    
    
}
export default AdminRoute