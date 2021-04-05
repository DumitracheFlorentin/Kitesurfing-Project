import L from "leaflet";

// Import imgs
import yellowMarker from "../../Assets/marker-icon-gold.png";
import redMarker from "../../Assets/marker-icon-red.png";
import shadowAnchor from "../../Assets/marker-shadow.png";

export const redIcon = new L.Icon({
  iconUrl: redMarker,
  iconSize: [34, 34],
  popupAnchor: [0, -15],
  shadowUrl: shadowAnchor,
  shadowAnchor: [13, 28],
});

export const yellowIcon = new L.Icon({
  iconUrl: yellowMarker,
  iconSize: [34, 34],
  popupAnchor: [0, -15],
  shadowUrl: shadowAnchor,
  shadowAnchor: [13, 28],
});
