import { Route , Switch} from "react-router-dom";
import LoginScreen from "../views/auth/loginScreen";
const AuthRouter = () => {
    return (
        <Switch>
           <Route 
             exact 
             path="/auth/login"
             component={LoginScreen}
            /> 
        </Switch>
           
    );
};

export default AuthRouter;