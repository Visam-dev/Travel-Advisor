import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  
  const [coordinates, setCoordinates] = useState({
    lat: 24.8607, // Karachi coordinates
    lng: 67.0011,
  });
  const [bounds, setBounds] = useState({
    ne: { lat: 24.9607, lng: 67.1011 },
    sw: { lat: 24.7607, lng: 66.9011 },
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
        
        // Load default restaurants for current location
        getPlacesData(bounds, "restaurants")
          .then((data) => {
            if (data) {
              setPlaces(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching default places:", error);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Fallback to Karachi if geolocation fails
        const karachiBounds = {
          sw: { lat: 24.7607, lng: 66.9011 },
          ne: { lat: 24.9607, lng: 67.1011 },
        };
        setBounds(karachiBounds);
        setCoordinates({ lat: 24.8607, lng: 67.0011 });
        
        // Load default restaurants for Karachi
        getPlacesData(karachiBounds, "restaurants")
          .then((data) => {
            if (data) {
              setPlaces(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching default places:", error);
          });
      }
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch places when search query changes
  useEffect(() => {
    console.log("Fetching places data with bounds:", bounds);
    if (searchQuery) {
      setPlaces([]); 
      getPlacesData(bounds, type)
        .then((data) => {
          console.log("Places data fetched:", data);
          if (data) {
            setPlaces(data);
          } else {
            console.error("No data returned from API");
          }
        })
        .catch((error) => {
          console.error("Error fetching places data:", error);
        });
    }
  }, [searchQuery, bounds, type]);

  // Fetch places when type changes (for current location)
  useEffect(() => {
    if (!searchQuery && bounds.ne && bounds.sw) {
      getPlacesData(bounds, type)
        .then((data) => {
          if (data) {
            setPlaces(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching places for type change:", error);
        });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
            places={places} 
            type={type} 
            setType={setType} 
            rating={rating} 
            setRating={setRating} 
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            searchQuery={searchQuery}
            setCoordinates={setCoordinates}
            bounds={bounds}
            setBounds={setBounds}
            coordinates={coordinates}
            setPlaces={setPlaces}
            type={type}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
