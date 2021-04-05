import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import style
import "./style/App.scss";

// Import components, functions or constans
import LoginScreen from "./Pages/LoginScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import SignupScreen from "./Pages/SignupScreen";

const App = () => {
  return (
    <>
      <Router>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>

        <Route path="/" exact>
          <DashboardScreen />
        </Route>

        <Route path="/signup" exact>
          <SignupScreen />
        </Route>
      </Router>
    </>
  );
};

export default App;
