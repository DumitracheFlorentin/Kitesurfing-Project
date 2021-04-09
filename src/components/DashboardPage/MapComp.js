import React, { useEffect, useState } from "react";

// Import Leaflet Tools
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Import Redux Tools
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
  const [enableFilter, setEnableFilter] = useState(false);
  const [filterByCountry, setFilterByCountry] = useState("");
  const [filterByWind, setFilterByWind] = useState(0);
  let spots = useSelector((state) => state.spots.data);
  const favourites = useSelector((state) => state.favourites.data);

  // Delete default settings for the marker
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  // Functions
  const enableFilterHandler = (e) => {
    setEnableFilter(true);
    e.preventDefault();
  };

  const applyFilterHandler = (e) => {
    e.preventDefault();
    setEnableFilter(false);
  };

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
    dispatch(GetFavourites());
  }, [dispatch]);

  useEffect(() => {
    if (filterByWind == "") {
      setFilterByWind(0);
    }
  }, [filterByWind]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={[50, 0]}
        zoom={3}
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
          spots
            .filter((spot) =>
              filterByWind === 0
                ? spot.country
                    .toLowerCase()
                    .includes(filterByCountry.toLowerCase())
                : spot.country
                    .toLowerCase()
                    .includes(filterByCountry.toLowerCase()) &&
                  spot.probability === filterByWind
            )
            .map((spot) => {
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
              onChange={(e) => {
                setFilterByCountry(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupWindProb">
            <Form.Label>Wind Probability</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wind prob."
              onChange={(e) => {
                setFilterByWind(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="ApplyFilterBtnPlace">
            <button onClick={applyFilterHandler} className="ApplyFilterBtn">
              Close filter
            </button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default MapComp;
