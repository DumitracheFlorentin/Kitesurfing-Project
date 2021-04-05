import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import style
import "./style/App.scss";

// Import components
import LoginScreen from "./Pages/LoginScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import AddLocation from "./Pages/AddLocation";

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
        <Route path="/createLocation" exact>
          <AddLocation />
        </Route>
      </Router>
    </>
  );
};

export default App;
