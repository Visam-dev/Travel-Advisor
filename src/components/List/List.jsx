import React, {useState, useEffect} from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
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
            <Typography variant="h3" className={classes.title}>Explore Your New HOLIDAY!!!</Typography>
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