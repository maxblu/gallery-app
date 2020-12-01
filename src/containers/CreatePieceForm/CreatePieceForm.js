import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { storage } from "../../firebase/firebase";
import axios from "../../axios-orders";

import { Container, Grid, TextField, Paper, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DatePicker } from "@material-ui/pickers";
import UploadPhoto from "../../commponents/UploadPhoto/UploadPhoto";
import noImage from "../../assets/images/noImage.png";

import Spinner from "../../commponents/Spinner/Spinner";
import * as actions from "../../store/actions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const CreatePieceForm = (props) => {
  const classes = useStyles();

  const [piece, setPiece] = useState({ ...props.location.state.piece });
  const token = useSelector((state) => state.token, shallowEqual);
  const [photo, setPhoto] = useState({
    preview: noImage,
    raw: { name: "noImage.png" },
    changedPhoto: false,
  });
  const dispatch = useDispatch();

  // const [changedPhoto, setchangedPhoto] = useState(false);
  const loading = useSelector((state) => state.loading);

  console.log(piece);
  // useEffect(() => {
  //   setPiece({ ...props.location.state.piece });
  // }, []);

  useEffect(() => {
    if (piece.image_url) {
      setPhoto({ ...photo, preview: piece.image_url });
    }
  }, []);

  const handleUploadPhoto = (e) => {
    console.log(e.target.files);
    if (e.target.files.length) {
      setPhoto({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        changedPhoto: true,
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id !== "price" || (id === "price" && value >= 0)) {
      setPiece({ ...piece, [id]: value });
    }
  };

  const hanldeYearChange = (value) => {
    setPiece({ ...piece, year: value });
  };

  const handleUploadPiece = (e) => {
    e.preventDefault();

    props.location.action === "DEL"
      ? dispatch(
          actions.handleDatabaseAction(
            piece,
            piece.image_url,
            "DEL",
            props.location.index,
            token
          )
        )
      : dispatch(
          actions.crudManager(
            piece,
            photo,
            props.location.state.action,
            props.location.state.index,
            token
          )
        );
    props.history.replace("/admin");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {!loading ? (
          <form onSubmit={handleUploadPiece}>
            <Paper className={classes.paper}>
              <UploadPhoto
                handleUpload={handleUploadPhoto}
                photo={photo.preview}
              />
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    multiline
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="title"
                    value={piece ? piece.title : ""}
                    // focused={piece.title}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Título"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    multiline
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="author"
                    value={piece ? piece.author : ""}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Autor"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    multiline
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="manif"
                    value={piece ? piece.manif : ""}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Manifestación artística"
                    // value={piece?piece.manif}
                    onChange={handleChange}
                    //   onChange={handleChangeEmail}
                    //   autoComplete="email"
                    //   autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    multiline
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="tec"
                    value={piece ? piece.tec : ""}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Técnica"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    multiline
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="awards"
                    value={piece ? piece.awards : ""}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Premios"
                    onChange={handleChange}
                    placeholder="Introdusca los premios separados por comas"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="number"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="price"
                    value={piece ? piece.price : 0}
                    //   error={error
                    //   helperText={emailMesg}
                    label="Precio"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginTop: "15px" }}
                >
                  <DatePicker
                    views={["year"]}
                    label="Año"
                    value={piece ? piece.year : new Date()}
                    onChange={hanldeYearChange}
                    variant="inline"
                    fullWidth
                    animateYearScrolling
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{ marginTop: "10%" }}
              >
                <Button type="summit" color="primary" variant="contained">
                  Salvar
                </Button>
              </Grid>
            </Paper>
          </form>
        ) : (
          <Spinner />
        )}
      </Container>
    </React.Fragment>
  );
};

export default CreatePieceForm;
