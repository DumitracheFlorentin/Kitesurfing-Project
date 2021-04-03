import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux Tools
import { useDispatch } from "react-redux";

// Import files, functions or constants
import NavbarComp from "../Components/NavbarComp";
import MapComp from "../Components/MapComp";
import { specificAccount } from "../Actions/specificAccountAction";
import TabelComp from "../Components/TabelComp";

const DashboardScreen = () => {
  // Hooks
  let history = useHistory();
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      history.push("/login");
    } else {
      dispatch(specificAccount(localStorage.getItem("userID")));
    }
  }, [history, dispatch]);

  return (
    <>
      {localStorage.getItem("userID") && (
        <div className="DashboardContainer">
          <NavbarComp />
          <MapComp />
          <TabelComp />
        </div>
      )}
    </>
  );
};

export default DashboardScreen;
