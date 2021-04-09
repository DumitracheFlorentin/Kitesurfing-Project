import React, { useEffect, useState, useRef } from "react";

// Leaflet Setup
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Redux Tools
import { useDispatch, useSelector } from "react-redux";

// Import Bootstap Components
import { Form } from "react-bootstrap";

// Import files, functions or constants
import { GetSpots } from "../../Actions/getSpotsAction";
import { GetFavourites } from "../../Actions/getAllFavourites";
import { redIcon, yellowIcon } from "./MapIcons";
import PopupComp from "./PopupComp";
import Filter from "../../Assets/filter.png";

const MapComp = () => {
  // Hooks
  const dispatch = useDispatch();
  const countryRef = useRef();
  const windProbRef = useRef();
  const [enableFilter, setEnableFilter] = useState(false);
  const [showData, setShowData] = useState(false);
  const spots = useSelector((state) => state.spots.data);
  const favourites = useSelector((state) => state.favourites.data);
  let filteredData = spots;

  // Delete default settings for the marker
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  // Functions
  const enableFilterHandler = (e) => {
    e.preventDefault();
  };

  const applyFilterHandler = (e) => {
    e.preventDefault();
  };

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
    dispatch(GetFavourites());
  }, [dispatch]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={8}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots &&
          spots.map((spot) => {
            const checkFav =
              favourites &&
              favourites.some(
                (each) => parseInt(each.spot) === parseInt(spot.id)
              );

            return (
              <Marker
                position={[spot.lat, spot.long]}
                key={spot.id}
                icon={checkFav ? yellowIcon : redIcon}
              >
                <Popup className="popoutMarker">
                  <PopupComp
                    spot={spot}
                    colorMarker={checkFav ? true : false}
                  />
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {!enableFilter ? (
        <button className="filter" onClick={enableFilterHandler}>
          <div className="IconBoxFilter">
            <img src={Filter} alt="filter" className="FilterIcon" />
          </div>
          <div className="TextBoxFilter">
            <h1 className="FilterText">Filters</h1>
          </div>
        </button>
      ) : (
        <Form className="filterPanel">
          <Form.Group controlId="formGroupCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country..."
              ref={countryRef}
            />
          </Form.Group>
          <Form.Group controlId="formGroupWindProb">
            <Form.Label>Wind Probability</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wind prob."
              ref={windProbRef}
            />
          </Form.Group>
          <Form.Group className="ApplyFilterBtnPlace">
            <button onClick={applyFilterHandler} className="ApplyFilterBtn">
              Apply filter
            </button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default MapComp;
