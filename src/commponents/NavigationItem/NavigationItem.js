import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
// import { Button } from "@material-ui/core";

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem} onClick={props.sideDrawerHandler}>
      <NavLink to={props.link} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
