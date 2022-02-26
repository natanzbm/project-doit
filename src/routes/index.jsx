import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Doit:token"));

    if (token) {
      return setAuth(true);
    }
  }, [auth]);

  return (
    <Switch>
      <Route exact path="/">
        <Home auth={auth} setAuth={setAuth} />
      </Route>
      <Route path="/signup">
        <Signup auth={auth} setAuth={setAuth} />
      </Route>
      <Route path="/login">
        <Login auth={auth} setAuth={setAuth} />
      </Route>
      <Route path="/dashboard">
        <Dashboard auth={auth} setAuth={setAuth} />
      </Route>
    </Switch>
  );
};

export default Routes;
