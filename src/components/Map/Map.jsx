import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStyles from "./styles";
import axios from "axios";
import MapEvents from "./MapEvents";
import { getPlacesData } from "../../api";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

const Map = ({ searchQuery, setCoordinates, setBounds, coordinates, bounds, setPlaces, type }) => {
  const classes = useStyles();
  const [results, setResults] = useState([]);

  // useEffect(() => {
  //   const fetchCoords = async () => {
  //     if (!searchQuery) return;
  //     try{
  //     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
  //     const { data } = await axios.get(url);
  //     if (data.length > 0) {
  //       setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
  //       setResults(data);
  //     }} catch (error) {
  //       console.error("Error fetching coordinates:", error);
  //     }
  //   };
  //   fetchCoords();
  // }, [searchQuery]); 

  useEffect(() => {
  if (searchQuery) {
    const fetchCoords = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`;
        const { data } = await axios.get(url);
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setCoordinates([lat, lng]);
          setBounds({
            ne: { lat: lat + 0.1, lng: lng + 0.1 },
            sw: { lat: lat - 0.1, lng: lng - 0.1 },
          });
          getPlacesData(bounds, type)
            .then((data) => {
              if (data) {
                setPlaces(data);
              } else {
                console.error('No data returned from API');
              }
            })
            .catch((error) => {
              console.error('Error fetching places data:', error);
            });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    fetchCoords();
  }
}, [searchQuery, type]);

  return (
    <div className={classes.mapContainer}>
      <MapContainer center={coordinates} zoom={14} style={{ height: "100%", width: "100%" }}>
  <ChangeMapView coords={coordinates} />
  <MapEvents setCoordinates={setCoordinates} setBounds={setBounds} />
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