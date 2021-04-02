import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Import files, functions or constants
import NavbarComp from "../Components/NavbarComp";

const DashboardScreen = () => {
  // Hooks
  let history = useHistory();

  // UseEffect
  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      {localStorage.getItem("userID") && (
        <>
          <NavbarComp />
          <h1>hehe</h1>
        </>
      )}
    </>
  );
};

export default DashboardScreen;
