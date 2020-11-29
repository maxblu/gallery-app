import { Grid, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import React from "react";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "number":
      inputElement = (
        <TextField
          multiline
          variant="standard"
          margin="normal"
          type="number"
          {...props}
        />
      );
      break;
    case "year":
      inputElement = <DatePicker views={["year"]} {...props} />;
      break;

    default:
      inputElement = (
        <TextField multiline variant="standard" margin="normal" {...props} />
      );
      break;
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <inputElement />
    </Grid>
  );
};

export default Input;
