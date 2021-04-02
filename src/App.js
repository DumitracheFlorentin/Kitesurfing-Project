import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import style
import "./style/App.scss";

// Import components
import LoginScreen from "./Components/LoginScreen";
import DashboardScreen from "./Components/DashboardScreen";

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
      </Router>
    </>
  );
};

export default App;
