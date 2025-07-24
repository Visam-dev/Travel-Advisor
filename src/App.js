import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {

    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.0060 });
   const [bounds, setBounds] = useState({
          ne: { lat: 40.9176, lng: -73.7004 }, 
          sw: { lat: 40.4774, lng: -74.2591 }, 
          });
         
          useEffect(() => {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
              },
              (error) => {
                console.error("Geolocation error:", error);
              }
            );
          }, []);
          
          const [searchQuery, setSearchQuery] = useState("");

          useEffect(() => {
          if (
          searchQuery // Only fetch when searchQuery changes
          ) {
         getPlacesData(bounds.ne, bounds.sw)
         .then((data) => setPlaces(data))
         .catch((error) => {
          console.error("Error fetching places:", error);
         setPlaces([]);
         });
 }
}, [searchQuery]);

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
           setBounds ={setBounds}
           coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;