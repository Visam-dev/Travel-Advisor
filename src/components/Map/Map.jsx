
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStyles from "./styles";
import axios from "axios";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

const Map = ({ searchQuery }) => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState([40.7128, -74.0060]); // NYC default
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchCoords = async () => {
      if (!searchQuery) return;
      try{
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
      const { data } = await axios.get(url);
      if (data.length > 0) {
        setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        setResults(data);
      }} catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    fetchCoords();
  }, [searchQuery]);

  return (
    <div className={classes.mapContainer}>
      <MapContainer center={coordinates} zoom={14} style={{ height: "100%", width: "100%" }}>
        <ChangeMapView coords={coordinates} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results.map((place, idx) => (
          <Marker
            key={idx}
            position={[parseFloat(place.lat), parseFloat(place.lon)]}
          >
            <Popup>
              {place.display_name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;