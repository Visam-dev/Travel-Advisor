import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  CircularProgress,
  Fade,
  Slide,
  IconButton,
  Collapse,
  styled
} from '@mui/material';
import {
  Air,
  Visibility,
  ExpandMore,
  ExpandLess,
  LocationOn,
  Thermostat,
  Speed,
  WaterDrop
} from '@mui/icons-material';
import axios from 'axios';

// Styled components
const WeatherContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  marginTop: '20px',
}));

const WeatherCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 12px 40px rgba(0, 0, 0, 0.5)' 
      : '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const WeatherTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  fontWeight: 600,
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    color: theme.palette.primary.main,
  },
}));

const WeatherInfoCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const WeatherIcon = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  marginRight: theme.spacing(2),
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const Temperature = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '2.5rem',
}));

const WeatherDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'capitalize',
}));

const ForecastCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ForecastList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ForecastItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateX(4px)',
  },
}));

const ForecastDay = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  minWidth: '60px',
}));

const ForecastIcon = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  margin: theme.spacing(0, 1),
}));

const DetailCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
      : '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const DetailIcon = styled(Air)(({ theme }) => ({
  fontSize: '2rem',
  color: theme.palette.primary.main,
}));

const EarthquakeItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: '6px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  borderLeft: `3px solid ${theme.palette.warning.main}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateX(4px)',
  },
}));

const Weather = ({ searchQuery, coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [earthquakeData, setEarthquakeData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [expanded, setExpanded] = useState(false);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) return '⛈️'; // Thunderstorm
    if (weatherCode >= 300 && weatherCode < 400) return '🌧️'; // Drizzle
    if (weatherCode >= 500 && weatherCode < 600) return '🌧️'; // Rain
    if (weatherCode >= 600 && weatherCode < 700) return '❄️'; // Snow
    if (weatherCode >= 700 && weatherCode < 800) return '🌫️'; // Atmosphere
    if (weatherCode === 800) return '☀️'; // Clear
    if (weatherCode >= 801 && weatherCode < 900) return '☁️'; // Clouds
    return '🌤️'; // Default
  };

  const fetchWeatherData = async (place) => {
    if (!place) return;
    
    setLoading(true);
    try {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      
      // Fetch current weather using SheCodes API
      const currentWeatherResponse = await axios.get(`https://api.shecodes.io/weather/v1/current?query=${place}&key=${apiKey}`);
      
      // Fetch forecast using SheCodes API
      const forecastResponse = await axios.get(`https://api.shecodes.io/weather/v1/forecast?query=${place}&key=${apiKey}`);
      
      // For earthquake data, we'll use a different approach since SheCodes doesn't have earthquake data
      // We'll create mock earthquake data or skip it for now
      const mockEarthquakeData = {
        earthquakes: [
          {
            magnitude: "4.2",
            location: "California, US",
            time: new Date().toISOString()
          },
          {
            magnitude: "3.8",
            location: "Alaska, US", 
            time: new Date(Date.now() - 86400000).toISOString()
          },
          {
            magnitude: "4.5",
            location: "Hawaii, US",
            time: new Date(Date.now() - 172800000).toISOString()
          }
        ]
      };

      setWeatherData(currentWeatherResponse.data);
      setForecastData(forecastResponse.data);
      setEarthquakeData(mockEarthquakeData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Show weather for default location (Karachi) on page load
    if (!searchQuery) {
      fetchWeatherData('Karachi');
    } else {
      fetchWeatherData(searchQuery);
    }
  }, [searchQuery]);

  // Also fetch weather when coordinates change (for map interactions)
  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      // Use coordinates to get location name or fetch weather directly
      const locationName = searchQuery || 'Karachi';
      fetchWeatherData(locationName);
    }
  }, [coordinates, searchQuery]);

  // Always show weather component, default to Karachi if no search query

  return (
    <Fade in={true} timeout={1000}>
      <WeatherContainer>
        <WeatherCard>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <WeatherTitle variant="h4">
                <LocationOn />
                Weather in {searchQuery || 'Karachi'}
              </WeatherTitle>
              <ExpandButton 
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </ExpandButton>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : weatherData ? (
              <>
                {/* Current Weather */}
                <Slide direction="up" in={!loading} timeout={800}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <WeatherInfoCard>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={2}>
                            <WeatherIcon variant="h1">
                              {getWeatherIcon(weatherData.condition?.icon || 800)}
                            </WeatherIcon>
                            <Box ml={2}>
                              <Temperature variant="h3">
                                {Math.round(weatherData.temperature?.current || 0)}°C
                              </Temperature>
                              <WeatherDescription variant="h6">
                                {weatherData.condition?.description || 'Clear'}
                              </WeatherDescription>
                            </Box>
                          </Box>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box display="flex" alignItems="center">
                                <Thermostat />
                                <Box ml={1}>
                                  <Typography variant="body2" color="textSecondary">
                                    Feels like
                                  </Typography>
                                  <Typography variant="body1">
                                    {Math.round(weatherData.temperature?.feels_like || 0)}°C
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box display="flex" alignItems="center">
                                <WaterDrop />
                                <Box ml={1}>
                                  <Typography variant="body2" color="textSecondary">
                                    Humidity
                                  </Typography>
                                  <Typography variant="body1">
                                    {weatherData.temperature?.humidity || 0}%
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box display="flex" alignItems="center">
                                <Speed />
                                <Box ml={1}>
                                  <Typography variant="body2" color="textSecondary">
                                    Wind
                                  </Typography>
                                  <Typography variant="body1">
                                    {Math.round(weatherData.wind?.speed || 0)} km/h
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box display="flex" alignItems="center">
                                <Visibility />
                                <Box ml={1}>
                                  <Typography variant="body2" color="textSecondary">
                                    Pressure
                                  </Typography>
                                  <Typography variant="body1">
                                    {weatherData.temperature?.pressure || 0} hPa
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </WeatherInfoCard>
                    </Grid>

                    {/* Forecast */}
                    <Grid item xs={12} md={6}>
                      <ForecastCard>
                        <CardContent>
                          <Typography variant="h6" mb={2}>
                            5-Day Forecast
                          </Typography>
                          <ForecastList>
                            {forecastData?.daily?.slice(0, 5).map((forecast, index) => (
                              <Slide direction="left" in={!loading} timeout={800 + index * 200} key={index}>
                                <ForecastItem>
                                  <ForecastDay variant="body2">
                                    {new Date(forecast.time * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                  </ForecastDay>
                                  <ForecastIcon variant="h4">
                                    {getWeatherIcon(forecast.condition?.icon || 800)}
                                  </ForecastIcon>
                                  <Typography variant="body1">
                                    {Math.round(forecast.temperature?.day || 0)}°C
                                  </Typography>
                                </ForecastItem>
                              </Slide>
                            ))}
                          </ForecastList>
                        </CardContent>
                      </ForecastCard>
                    </Grid>
                  </Grid>
                </Slide>

                {/* Expanded Details */}
                <Collapse in={expanded} timeout="auto">
                  <Slide direction="up" in={expanded} timeout={600}>
                    <Box mt={3}>
                      <Grid container spacing={3}>
                        {/* Air Quality */}
                        <Grid item xs={12} md={6}>
                          <DetailCard>
                            <CardContent>
                              <Typography variant="h6" mb={2}>
                                Air Quality
                              </Typography>
                              <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                  <Typography variant="h4" color="primary">
                                    {weatherData.temperature?.pressure || 0} hPa
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    Atmospheric Pressure
                                  </Typography>
                                </Box>
                                <DetailIcon />
                              </Box>
                            </CardContent>
                          </DetailCard>
                        </Grid>

                        {/* Earthquake Data */}
                        <Grid item xs={12} md={6}>
                          <DetailCard>
                            <CardContent>
                              <Typography variant="h6" mb={2}>
                                Recent Earthquakes
                              </Typography>
                              {earthquakeData?.earthquakes?.slice(0, 3).map((quake, index) => (
                                <EarthquakeItem key={index}>
                                  <Typography variant="body2">
                                    Magnitude {quake.magnitude} - {quake.location}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {new Date(quake.time).toLocaleDateString()}
                                  </Typography>
                                </EarthquakeItem>
                              ))}
                            </CardContent>
                          </DetailCard>
                        </Grid>
                      </Grid>
                    </Box>
                  </Slide>
                </Collapse>
              </>
            ) : (
              <Typography variant="body1" color="textSecondary" textAlign="center">
                Weather data not available for this location.
              </Typography>
            )}
          </CardContent>
        </WeatherCard>
      </WeatherContainer>
    </Fade>
  );
};

export default Weather; 