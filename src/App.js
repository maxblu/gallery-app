import "./App.css";
import React, { useEffect, useState } from "react";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Gallery from "./containers/Gallery/Gallery";
import LogIn from "./containers/LogIn/LogIn";
import CreatePieceForm from "./containers/CreatePieceForm/CreatePieceForm";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { authCheckState, getPieces } from "./store/actions";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.token, shallowEqual);

  useEffect(() => {
    dispatch(authCheckState());
    dispatch(getPieces());
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/admin" component={Gallery} />
            <Route path="/create" component={CreatePieceForm}></Route>
            <Route path="/edit" component={CreatePieceForm}></Route>
            <Route path="/delete" component={CreatePieceForm} />
            <Route path="/home" component={Gallery} />
            <Route path="/login" component={LogIn} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Layout>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
