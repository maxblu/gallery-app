import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as actions from "../../store/actions";
import Spinner from "../../commponents/Spinner/Spinner";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(10),
    // marginBottom: theme.spacing(10),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "black",
    // color: "white",
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const loading = useSelector((state) => state.loading, shallowEqual);
  const serverError = useSelector((state) => state.error, shallowEqual);
  const token = useSelector((state) => state.token, shallowEqual);

  const dispatch = useDispatch();
  // const [reducer, dispatch] = useReducer(reducer, initState);
  const [email, setEmail] = useState("Correo");
  const [password, setPassword] = useState();
  const [emailMesg, setEmailMesg] = useState("");
  const [passMesg, setPassMesg] = useState("");
  const history = useHistory();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (serverError) {
      setError(true);
      switch (serverError.message) {
        case "EMAIL_NOT_FOUND":
          setEmailMesg("correo incorrecto");
          break;
        case "INVALID_PASSWORD":
          setPassMesg("Contraseña Incorrecta");
          break;
        default:
          break;
      }
    }
    serverError ? setError(true) : setError(false);
  }, [serverError]);

  useEffect(() => {
    if (token) history.replace("/admin");
  }, [token]);

  // const [err, setError] = useState(false);
  // const [msg, setMsg] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setError(false);
    setEmailMesg();
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setError(false);
    setPassMesg();
    // setTouchedPass(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(actions.auth(email, password, null));
  };

  let form = (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entrar
      </Typography>
      <form className={classes.form} onSubmit={handleLogin} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          error={error}
          helperText={emailMesg}
          label="Correo"
          onChange={handleChangeEmail}
          // autoComplete="email"
          autoFocus
          color="black"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          error={error}
          helperText={passMesg}
          onChange={handleChangePassword}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    /> */}
        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          className={classes.submit}
        >
          Entrar
        </Button>
      </form>
    </div>
  );

  if (loading) form = <Spinner />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {form}
    </Container>
  );
}
