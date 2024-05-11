import { useAuth } from '../../AuthContext';
import {Navigate} from 'react-router-dom'

const AdminRoute = ({children}) =>{
    const { 
        setAuthUser,isAdmin,setUserRole,userRole,
        authUser,setIsAdmin,
        isLoggedIn,
        setIsLoggedIn,logout} = useAuth();
     console.log(isAdmin, "-----",isLoggedIn,"---", userRole) 
     console.log(authUser)  
    if (isAdmin && isLoggedIn){
        return (children )
    }
   return(
         <Navigate to={'/login'}/>
    )
    
    
}
export default AdminRoute