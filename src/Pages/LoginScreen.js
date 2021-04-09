import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import files, functions or constants
import FormLogin from "../Components/LoginPage/FormLogin";
import WarningAlert from "../Components/Alerts/WarningAlert";
import { FIELDS } from "../Constants/TextAlerts";

const LoginScreen = () => {
  // Hooks
  const [alert, setAlert] = useState(false);
  let history = useHistory();

  // UseEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [alert]);

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      {!localStorage.getItem("userID") && (
        <div className="loginScreen">
          <h1 className="Logo">Kite</h1>
          {alert && <WarningAlert type={FIELDS} />}
          <FormLogin setAlert={setAlert} />
        </div>
      )}
    </>
  );
};

export default LoginScreen;
