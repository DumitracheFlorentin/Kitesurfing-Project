import React, { useEffect } from "react";

// Leaflet Setup
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Redux Tools
import { useDispatch, useSelector } from "react-redux";

// Import files, functions or constants
import { GetSpots } from "../../Actions/getSpotsAction";
import { redIcon } from "./MapIcons";
import PopupComp from "./PopupComp";

const MapComp = () => {
  // Hooks
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.data);

  // UseEffect
  useEffect(() => {
    dispatch(GetSpots());
  }, [dispatch]);

  // Delete default settings for the marker
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

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
            return (
              <Marker
                position={[spot.lat, spot.long]}
                key={spot.id}
                icon={redIcon}
              >
                <Popup className="popoutMarker">
                  <PopupComp spot={spot} />
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComp;
