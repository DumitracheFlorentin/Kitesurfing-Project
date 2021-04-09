import React, { useEffect } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// Import Bootstrap Components
import { Col, Row } from "react-bootstrap";

// Import FontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// Import Redux Tools
import { useDispatch, useSelector } from "react-redux";

// Import files, functions or constans
import { API_SPECIFIC_REQ, API_REQ } from "../../API/Functions";
import { GetFavourites } from "../../Actions/getAllFavourites";
import { GetSpots } from "../../Actions/getSpotsAction";
import { FAVOURITES } from "../../Constants/API";

const PopupComp = ({ spot, colorMarker }) => {
  // Hooks
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.data);

  // Functions
  const removeFavouriteHandler = (e, id) => {
    e.preventDefault();
    const getFavId = favourites.filter((fav) => fav.spot.toString() === id);

    Axios.delete(API_SPECIFIC_REQ(FAVOURITES, getFavId[0].id))
      .then(() => {
        dispatch(GetFavourites());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFavouriteHandler = (id) => {
    const date = new moment().format();

    Axios.post(API_REQ(FAVOURITES), {
      id: uuidv4(),
      createdAt: date,
      spot: id,
    })
      .then(() => {
        dispatch(GetFavourites());
        dispatch(GetSpots());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UseEffect
  useEffect(() => {
    dispatch(GetFavourites());
  }, [dispatch]);

  return (
    <>
      <div className="Container">
        <Row>
          <Col className="nameAndCountryOfSpot">
            <h3>{spot.name}</h3>
            <h5>{spot.country}</h5>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Wind probability</h3>
            <h4>{spot.probability}%</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Latitude</h3>
            <h4>{spot.lat}° N</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>Longitude</h3>
            <h4>{spot.long}° W</h4>
          </Col>
        </Row>
        <Row className="spotInfo">
          <Col>
            <h3>When to go</h3>
            <h4>{spot.month}</h4>
          </Col>
        </Row>
      </div>
      <div className="PopoutBtn">
        {colorMarker ? (
          <button
            className="button redButton"
            type="submit"
            onClick={(e) => removeFavouriteHandler(e, spot.id)}
          >
            <FontAwesomeIcon icon={faMinus} className="PopoutIcon" />
            <h1>Remove from favourites</h1>
          </button>
        ) : (
          <button
            className="button yellowButton"
            type="submit"
            onClick={() => addFavouriteHandler(spot.id)}
          >
            <FontAwesomeIcon icon={faPlus} className="PopoutIcon" />
            <h1>Add to favourites</h1>
          </button>
        )}
      </div>
    </>
  );
};

export default PopupComp;
