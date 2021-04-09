import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import files, functions and constans
import WarningAlert from "../Components/Alerts/WarningAlert";
import SignupForm from "../Components/SignupPage/SignupForm";
import { FIELDS, EMAIL } from "../Constants/TextAlerts";

const SignupScreen = () => {
  // Hooks
  let history = useHistory();
  const [warning, setWarning] = useState("");

  // UseEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [warning]);

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
          {warning === "fields" && <WarningAlert type={FIELDS} />}
          {warning === "email" && <WarningAlert type={EMAIL} />}
          <SignupForm setWarning={setWarning} />
        </div>
      )}
    </>
  );
};

export default SignupScreen;
