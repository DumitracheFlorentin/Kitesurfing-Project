import React, { useRef, useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// Import Leaflet Tools
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// Import Redux Tools
import { useDispatch } from "react-redux";

// Import Bootstrap Components
import { Form } from "react-bootstrap";

// Import files, functions or constans
import WarningAlert from "../Alerts/WarningAlert";
import { GetSpots } from "../../Actions/getSpotsAction";
import { API_REQ } from "../../API/Functions";
import { SPOT } from "../../Constants/API";

const AddLocation = ({ setModalShow }) => {
  // Hooks
  const [alert, setAlert] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(0, 0);
  const nameRef = useRef();
  const countryRef = useRef();
  const probabilityRef = useRef();
  const monthRef = useRef();
  const dispatch = useDispatch();

  // Functions
  const Markers = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        setLat(e.latlng.lat);
        setLong(e.latlng.lng);
      },
    });

    return selectedPosition ? (
      <Marker
        key={selectedPosition[0]}
        position={selectedPosition}
        interactive={false}
      />
    ) : null;
  };

  const closeModalHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
  };

  const createNewLocationHandler = (e) => {
    e.preventDefault();

    if (
      !nameRef.current.value ||
      !countryRef.current.value ||
      !lat ||
      !long ||
      !probabilityRef.current.value ||
      !monthRef.current.value
    ) {
      setAlert(true);
    } else {
      const date = new moment().format();
      Axios.post(API_REQ(SPOT), {
        id: uuidv4(),
        createdAt: date,
        name: nameRef.current.value,
        country: countryRef.current.value,
        lat: lat.toFixed(2),
        long: long.toFixed(2),
        probability: probabilityRef.current.value,
        month: monthRef.current.value,
      })
        .then(() => {
          dispatch(GetSpots());
        })
        .catch((err) => {
          console.log(err);
        });

      setModalShow(false);
    }
  };

  // UseEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      {alert && <WarningAlert />}
      <Form className="FormContainer">
        <Form.Group controlId="formGroupName">
          <Form.Label className="Title">Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name..." ref={nameRef} />
        </Form.Group>
        <Form.Group controlId="formGroupCountry">
          <Form.Label className="Title">Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country..."
            ref={countryRef}
          />
        </Form.Group>
        <Form.Group controlId="formGroupSeason">
          <Form.Label className="Title">Wind Probabiliy</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter wind probability..."
            ref={probabilityRef}
          />
        </Form.Group>
        <Form.Group controlId="formGroupSeason">
          <Form.Label className="Title">High Season</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter season..."
            ref={monthRef}
          />
        </Form.Group>
        <Form.Group>
          <MapContainer
            center={selectedPosition || [53, 9]} // 53, 9 means europe coords
            zoom={3}
            className="modalMap"
          >
            <Markers />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Form.Group>
        <Form.Group className="FormButtons">
          <button className="FormButton CancelBtn" onClick={closeModalHandler}>
            Cancel
          </button>
          <button
            className="FormButton ConfirmBtn"
            onClick={createNewLocationHandler}
          >
            Confirm
          </button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddLocation;
