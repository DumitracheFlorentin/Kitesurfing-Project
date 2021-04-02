// Leaflet Setup
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Import Bootstrap components
import { Container } from "react-bootstrap";

const MapComp = () => {
  return (
    <div className="mapContainer">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>Test</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComp;
