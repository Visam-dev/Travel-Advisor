import React, {useState, useEffect} from "react";
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box, Chip } from "@mui/material";
import { FlightTakeoff, Restaurant, Hotel, Attractions } from "@mui/icons-material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({places, type, setType, rating, setRating}) => {
    const classes = useStyles();
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        if (places && places.length > 0) {
            let filtered = places;
            
            // Filter by rating if rating is selected
            if (rating && rating > 0) {
                filtered = places.filter(place => 
                    place.rating && parseFloat(place.rating) >= parseFloat(rating)
                );
            }
            
            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces([]);
        }
    }, [places, rating]);

    return (
        <div className={classes.container}>
            <Box className={`${classes.titleContainer} fadeInUp`}>
                <Typography variant="h4" className={`${classes.title} pulse`}>
                    <FlightTakeoff className={`${classes.titleIcon} bounce`} />
                    Explore Your New Adventure
                </Typography>
                <Box className={classes.subtitleContainer}>
                    <Chip 
                        icon={<Restaurant />} 
                        label="Restaurants" 
                        className={classes.typeChip}
                        color={type === 'restaurants' ? 'primary' : 'default'}
                    />
                    <Chip 
                        icon={<Hotel />} 
                        label="Hotels" 
                        className={classes.typeChip}
                        color={type === 'hotels' ? 'primary' : 'default'}
                    />
                    <Chip 
                        icon={<Attractions />} 
                        label="Attractions" 
                        className={classes.typeChip}
                        color={type === 'attractions' ? 'primary' : 'default'}
                    />
                </Box>
            </Box>
            <div className={classes.formControlsWrapper}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={(e) => setRating(e.target.value)} >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={4}>Above  4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>
            </div>
      
          <Grid container spacing={3} className={classes.list}>
                 {filteredPlaces?.map((place, i) => (
                    <Grid item key={i} xs={12}>
                        <PlaceDetails place={place} />
                        </Grid>
                 ))}
                        </Grid>
                
                    
        </div>
    );
    }

export default List;