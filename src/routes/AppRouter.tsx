import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/authActions";
import LoadingSpinner from "../components/uiComponents/loadingSpinner";
import { auth } from "../firebase/firebase-config";
import { useAppDispatch } from "../hooks/redux-hooks";
import CommissionScreen from "../views/commision/commissionScreen";
import DistrictsScreen from "../views/districts/districtsScreen";
import GlobalSettingScreen from "../views/global-settings/globalSettingScreen";
import LegislativeObservatoryScreen from "../views/home/legislativeObservatoryScreen";
import LegislatureScreen from "../views/legilature/legislatureScreen";
import PoliticalPartiesScreen from "../views/politicalParties/politicalPartiesScreen";
import PoliticianScreen from "../views/politicians/politicianScreen";
import PoliticianShowScreen from "../views/politicians/politicianShowScreen";
import AssignCommissions from "../views/assingComision/assingComisionScreen";
import Permissions from "../views/permissions/index";
import Roles from "../views/roles";
import User from "../views/users/index";
import AuthRouter from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoutes";
import { PublicRoute } from "./PublicRoutes";

import { saveDataUserLogged } from "../helpers/validatePermissions";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const [loadingscreen, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        await saveDataUserLogged();
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, [dispatch]);

  if (loadingscreen) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth" isAuthenticate={isLoggedIn} component={AuthRouter} />
        <PrivateRoute exact path="/" isAuthenticate={isLoggedIn} component={LegislativeObservatoryScreen} />
        <PrivateRoute exact path="/legislatures" isAuthenticate={isLoggedIn} component={LegislatureScreen} />
        <PrivateRoute exact path="/commissions" isAuthenticate={isLoggedIn} component={CommissionScreen} />
        <PrivateRoute exact path="/cargo-comiciones" isAuthenticate={isLoggedIn} component={AssignCommissions} />
        <PrivateRoute exact path="/political-parties" isAuthenticate={isLoggedIn} component={PoliticalPartiesScreen} />
        <PrivateRoute exact path="/districts" isAuthenticate={isLoggedIn} component={DistrictsScreen} />
        <PrivateRoute exact path="/politicians" isAuthenticate={isLoggedIn} component={PoliticianScreen} />
        <PrivateRoute exact path="/politician-show/:id" isAuthenticate={isLoggedIn} component={PoliticianShowScreen} />
        <PrivateRoute exact path="/users" isAuthenticate={isLoggedIn} component={User} />
        <PrivateRoute exact path="/global-settings" isAuthenticate={isLoggedIn} component={GlobalSettingScreen} />

        <PrivateRoute exact path="/permissions" isAuthenticate={isLoggedIn} component={Permissions} />
        <PrivateRoute exact path="/roles" isAuthenticate={isLoggedIn} component={Roles} />
        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
