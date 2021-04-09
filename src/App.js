import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import style
import "./style/App.scss";

// Import components, functions or constans
import LoginScreen from "./Pages/LoginScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import SignupScreen from "./Pages/SignupScreen";
import Error404 from "./Pages/Error404";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>

          <Route path="/" exact>
            <DashboardScreen />
          </Route>

          <Route path="/signup" exact>
            <SignupScreen />
          </Route>

          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
