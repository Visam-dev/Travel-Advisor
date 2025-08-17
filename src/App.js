import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, ThemeProvider, createTheme, Box, Card, CardContent, Typography } from "@mui/material";
import { LocationOn, Restaurant, Hotel, Attractions, Star } from "@mui/icons-material";
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
  
  // Apply body class for dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);
  
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
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
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
    // Set default Karachi bounds and coordinates immediately
    const karachiBounds = {
      sw: { lat: 24.7607, lng: 66.9011 },
      ne: { lat: 24.9607, lng: 67.1011 },
    };
    setBounds(karachiBounds);
    setCoordinates({ lat: 24.8607, lng: 67.0011 });
    
    // Load default restaurants for Karachi immediately
    console.log("Loading default restaurants for Karachi...");
    getPlacesData(karachiBounds, "restaurants")
      .then((data) => {
        console.log("Default restaurants data:", data);
        if (data) {
          setPlaces(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching default places:", error);
      });

    // Then try to get user's current location
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
        
        // Load restaurants for current location
        console.log("Loading restaurants for current location...");
        getPlacesData(bounds, "restaurants")
          .then((data) => {
            console.log("Current location restaurants data:", data);
            if (data) {
              setPlaces(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching current location places:", error);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Karachi is already set as default above
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
  }, [searchQuery, bounds, type]); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [type, bounds]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Grid container spacing={0} style={{ width: "100%", marginTop: "64px" }}>
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
            
            {/* Quick Stats Panel */}
            <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Card sx={{ 
                flex: 1, 
                minWidth: 200,
                background: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)' }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    Current Location
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery || 'Karachi'}
                  </Typography>
                </CardContent>
              </Card>
              
              <Card sx={{ 
                flex: 1, 
                minWidth: 200,
                background: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)' }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  {type === 'restaurants' && <Restaurant sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                  {type === 'hotels' && <Hotel sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                  {type === 'attractions' && <Attractions sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                  <Typography variant="h6" gutterBottom>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {places.length} places found
                  </Typography>
                </CardContent>
              </Card>
              
              <Card sx={{ 
                flex: 1, 
                minWidth: 200,
                background: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-2px)' }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Star sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    Top Rated
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {places.filter(p => p.rating >= 4.5).length} places
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            
            <Weather 
              searchQuery={searchQuery || 'Karachi'}
              coordinates={coordinates}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;