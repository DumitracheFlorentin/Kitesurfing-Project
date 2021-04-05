import React, { useRef, useState } from "react";
import Axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

// Import Leaflet Tools
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// Import Redux Tools
import { useDispatch } from "react-redux";

// Import Bootstrap Components
import { Form } from "react-bootstrap";
import { API_REQ } from "../API/Functions";
import { SPOT } from "../Constants/API";

// Import files, functions or constans
import { GetSpots } from "../Actions/getSpotsAction";

const AddLocation = ({ setModalShow }) => {
  // Hooks
  const [selectedPosition, setSelectedPosition] = useState(0, 0);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
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

    const date = new moment().format();

    Axios.post(API_REQ(SPOT), {
      id: uuidv4(),
      createdAt: date,
      name: nameRef.current.value,
      country: countryRef.current.value,
      lat: lat,
      long: long,
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
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name..." ref={nameRef} />
        </Form.Group>
        <Form.Group controlId="formGroupCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country..."
            ref={countryRef}
          />
        </Form.Group>
        <Form.Group controlId="formGroupSeason">
          <Form.Label>Wind Probabiliy</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter wind probability..."
            ref={probabilityRef}
          />
        </Form.Group>
        <Form.Group controlId="formGroupSeason">
          <Form.Label>High Season</Form.Label>
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
        <Form.Group>
          <button onClick={closeModalHandler}>Cancel</button>
          <button onClick={createNewLocationHandler}>Confirm</button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddLocation;
