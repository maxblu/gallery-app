import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "absolute",
    backgroundColor: "black",
    padding: theme.spacing(4),
    width: "100%",
    bottom: 0,
    color: "white",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography color="white" variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="white"
        component="p"
      >
        Cantacto,Soporte
      </Typography>
    </footer>
  );
};

export default Footer;
