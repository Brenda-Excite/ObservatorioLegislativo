import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRouter from "./routes/AppRouter";
import ReactNotification from "react-notifications-component";
import CreatePermissions from "./seeders/permissions";
import { saveDataUserLogged } from "./helpers/validatePermissions";

CreatePermissions();
saveDataUserLogged();

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">{/*  <ReactNotification /> */}</div>
      <AppRouter />
    </Provider>
  );
}

export default App;
