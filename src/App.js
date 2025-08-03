import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Weather from "./components/Weather/Weather";
import { getPlacesData } from "./api";

const App = () => {
  
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  const [coordinates, setCoordinates] = useState({
    lat: 24.8607, // Karachi coordinates
    lng: 67.0011,
  });
  const [bounds, setBounds] = useState({
    ne: { lat: 24.9607, lng: 67.1011 },
    sw: { lat: 24.7607, lng: 66.9011 },
  });

  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: darkMode ? '#1a1a1a' : '#f5f5f5',
        paper: darkMode ? '#2a2a2a' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      },
      divider: darkMode ? '#404040' : '#e0e0e0',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#2a2a2a' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: darkMode ? '1px solid #404040' : '1px solid #e0e0e0',
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#2a2a2a' : '#ffffff',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: darkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#2a2a2a' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            '&:hover': {
              backgroundColor: darkMode ? '#3a3a3a' : '#f5f5f5',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#404040' : '#e0e0e0',
            color: darkMode ? '#ffffff' : '#000000',
          },
        },
      },
    },
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
    if (searchQuery) {
      setPlaces([]); 
      getPlacesData(bounds, type)
        .then((data) => {
          if (data) {
            setPlaces(data);
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
      <ThemeProvider theme={theme}>
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Grid container spacing={0} style={{ width: "100%" }}>
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
            <Weather 
              searchQuery={searchQuery}
              coordinates={coordinates}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;