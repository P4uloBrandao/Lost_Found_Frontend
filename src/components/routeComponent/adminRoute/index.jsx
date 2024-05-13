import { useAuth } from '../../AuthContext';
import {Navigate} from 'react-router-dom'

const AdminRoute = ({children}) =>{
    const { 
        setAuthUser,isAdmin,setUserRole,userRole,
        authUser,setIsAdmin,
        isLoggedIn,logout,
        setIsLoggedIn} = useAuth();
     console.log(isAdmin, "-----",isLoggedIn,"---", userRole) 
     console.log(authUser)  
    if (isAdmin && isLoggedIn){
        return (children )
    }
    else{
        logout()
    }
   return(
            
         <Navigate to={'/login'}/>
    )
    
    
}
export default AdminRoute