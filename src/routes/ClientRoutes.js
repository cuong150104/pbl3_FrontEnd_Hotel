import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const GuestRoutes = (props) => {
 
    return (
      <>
        <Switch>
    
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </>
    );
  };
  
  export default AppRoutes;
  