import {  Route , Redirect , RouteProps} from 'react-router-dom'
import { ComponentType } from 'react';


interface Props extends RouteProps{
    isAuthenticate:any,
    component: ComponentType<any>
}

export const PublicRoute = ({isAuthenticate, component : Component, ...rest}:Props) => {
    return(
        <Route { ... rest} component = { (props:any )=>(
            (isAuthenticate) ? 
            ( <Redirect to="/"/>) 
             : 
            ( <Component {...props}/>)
        )}
          
        />
    )
}