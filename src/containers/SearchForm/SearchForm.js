import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const top100Films = [1, 2, 3, 45, 6, 7];
const SearchForm = (props) => {
  const pieces = useSelector((state) => state.pieces, shallowEqual);
  console.log(pieces);
  return (
    <Grid container justify="center" alignContent="center" alignItems="center">
      <Grid item xs={6} style={{ paddingTop: "30%" }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={pieces.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      </Grid>
      {/* <Grid item>
        <TextField id="author"></TextField>
      </Grid>
      <Grid item>
        <TextField id="manif"></TextField>
      </Grid>
      <Grid item>
        <TextField id="tec"></TextField>
      </Grid> */}
    </Grid>
  );
};

export default SearchForm;
