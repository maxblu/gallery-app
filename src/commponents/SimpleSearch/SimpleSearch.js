import React from "react";

import {
  Grid,
  TextField,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

const SimpleSearch = (props) => {
  return (
    <Grid container justify="center" alignItems="center" alignContent="center">
      <Grid item xs={7} md sm lg xl>
        <form onSubmit={props.handleSearch}>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={11} md={11} sm={11} lg={11} xl={11}>
              <TextField
                size="small"
                fullWidth
                type="text"
                placeholder="Buscar"
                variant="outlined"
                value={props.searchQuery}
                onChange={(e) => {
                  props.setSearchQuery(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
              <IconButton type="submit">
                <Search color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          name="SearchParam"
          value={props.serchParam}
          onChange={(e) => {
            props.setSerchParam(e.target.value);
          }}
          // onChange={(e)=>{setSerchParam(e.target.value)})}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={12}>
              <FormControlLabel
                value={"title"}
                control={<Radio color="primary" />}
                label="Título"
              />
              <FormControlLabel
                value="author"
                control={<Radio color="primary" />}
                label="Autor"
              />
              <FormControlLabel
                value="manif"
                control={<Radio color="primary" />}
                label="Manifestación"
              />
              <FormControlLabel
                value="tec"
                control={<Radio color="primary" />}
                label="Técnica"
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default SimpleSearch;
