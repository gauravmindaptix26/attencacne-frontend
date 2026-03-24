import React from 'react'
import {useAuth} from '../context/authcontext'
const RoleBaseRoutes = ({children,requiredRole}) => {
    const {user,loading}=useAuth();

  if(loading){
     return <div>Loading....</div>
  }
   return user ? children:<Navigate to="/login"/>
   
  if(!requiredRole.includes(user.role)){

    return <Navigate to="/unauthorized"/>

   }

   return children;
 
}

export default RoleBaseRoutes
