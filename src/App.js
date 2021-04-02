// Import style
import "./style/App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import components
import LoginScreen from "./Components/LoginScreen";
import DashboardScreen from "./Components/DashboardScreen";

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" exact>
          <LoginScreen />
        </Route>

        <Route path="/dashboard" exact>
          <DashboardScreen />
        </Route>
      </Router>
    </>
  );
};

export default App;
