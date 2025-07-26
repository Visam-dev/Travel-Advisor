import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  
  const [places, setPlaces] = useState([]);
  
  const [coordinates, setCoordinates] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [bounds, setBounds] = useState({
    ne: { lat: 33.6915446, lng: 73.15372099999999 },
    sw: { lat: 33.4915446, lng: 72.953721 },
  });

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      const currentLocation = { lat: latitude, lng: longitude };
      const bounds = {
        sw: {
          lat: currentLocation.lat - 0.01,
          lng: currentLocation.lng - 0.01,
        },
        ne: {
          lat: currentLocation.lat + 0.01,
          lng: currentLocation.lng + 0.01,
        },
      };
      setBounds(bounds);
      setCoordinates(currentLocation);
    },
    (error) => {
      console.error("Geolocation error:", error);
    }
  );
}, []);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Fetching places data with bounds:", bounds);
    if (searchQuery) {
      setPlaces(() => []); 
      getPlacesData(bounds)
        .then((data) => {
          console.log("Places data fetched:", data);
          if (data) {
            setPlaces([...data]);   ;
          } else {
            console.error("No data returned from API");
          }
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
        });
    }
  }, [searchQuery, bounds]);

  return (
    <>
      <CssBaseline />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            searchQuery={searchQuery}
            setCoordinates={setCoordinates}
            bounds={bounds}
            setBounds={setBounds}
            coordinates={coordinates}
            setPlaces={setPlaces}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
