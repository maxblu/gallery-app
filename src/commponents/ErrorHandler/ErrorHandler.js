import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorHandler = (props) => {
  return (
    // <Dialog open={props.error}>
    <Alert onClose={props.close} severity="error">
      {props.error}
    </Alert>
    // </Dialog>
  );
};

export default ErrorHandler;
