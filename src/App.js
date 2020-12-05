import "./App.css";
import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Gallery from "./containers/Gallery/Gallery";
import LogIn from "./containers/LogIn/LogIn";
import CreatePieceForm from "./containers/CreatePieceForm/CreatePieceForm";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { authCheckState } from "./store/actions";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DetailsCard from "./commponents/DetailsCard/DetailsCard";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.token, shallowEqual);

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  let routes = (
    <Switch>
      <Route path="/details" component={DetailsCard} />
      <Route path="/login" component={LogIn} />
      <Route path="/admin" component={Gallery} />
      <Route path="/create" component={CreatePieceForm}></Route>
      <Route path="/edit" component={CreatePieceForm}></Route>
      <Route path="/delete" component={CreatePieceForm} />

      <Redirect from="/" to="/admin" />
    </Switch>
  );

  if (!isAuth) {
    routes = (
      <Switch>
        <Route path="/home" component={Gallery} />

        <Route path="/login" component={LogIn} />
        <Route path="/details" component={DetailsCard} />
        <Redirect from="/" to="/home" />
      </Switch>
    );
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
