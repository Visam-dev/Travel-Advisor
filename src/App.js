import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CssBaseline />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map searchQuery={searchQuery} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;