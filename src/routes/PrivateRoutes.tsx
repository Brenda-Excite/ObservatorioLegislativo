import { ComponentType } from 'react';
import {  Route , Redirect , RouteProps } from 'react-router-dom';

interface Props extends RouteProps{
    isAuthenticate:any,
    component: ComponentType<any>
}

export const PrivateRoute = ({isAuthenticate, component: Component, ...rest}:Props) => {
    
    return(
        <Route { ...rest } component={ (props:any )=>(
            (isAuthenticate) ? 
            ( <Component {...props}/>) 
             : 
            ( <Redirect to="/auth/login"/>)
        )}
          
        />
    )
}