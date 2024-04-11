import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import List from "../pagesClient/List/List";
import HomeClient from "../pagesClient/Home/HomeClient";

import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const ClientRoutes = (props) => {
 
    return (
      <>
        <Switch>
    
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/hotels">
            <List/>
          </Route>
          
          <Route path="/" exact>
            <HomeClient />
          </Route>
          <Route path="*">404 Not Found</Route>
        </Switch>
      </>
    );
  };
  
  export default ClientRoutes;
  