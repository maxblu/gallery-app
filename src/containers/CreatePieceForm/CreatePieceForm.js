import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { storage } from "../../firebase/firebase";
import axios from "../../axios-orders";

import { Container, Grid, TextField, Paper, Button } from "@material-ui/core";
import Resizer from "react-image-file-resizer";

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

  // useEffect(() => {
  //   setPiece({ ...props.location.state.piece });
  // }, []);
  let disabled = false;
  let button_label = "Salvar";
  let color = "primary";

  if (props.location.state.action === "DEL") {
    disabled = true;
    button_label = "Eliminar";
    color = "secondary";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (piece.image_url) {
      setPhoto({ ...photo, preview: piece.image_url });
    }
  }, []);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        Math.floor(1000 * 0.5625),
        "JPEG",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const handleUploadPhoto = async (e) => {
    if (e.target.files.length) {
      const image = await resizeFile(e.target.files[0]);

      setPhoto({
        preview: URL.createObjectURL(image),
        raw: { file: image, name: e.target.files[0].name },
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

  const handleUploadPiece = async (e) => {
    e.preventDefault();
    dispatch(actions.startCRUD());
    let data = null;

    if (photo.changedPhoto && props.location.action !== "DEL") {
      const imageUrl = await actions.handlePhotoStorage(piece.image_url, photo);
      data = { ...piece, image_url: imageUrl };
    } else {
      data = { ...piece };
    }

    dispatch(
      actions.crudManager(
        data,
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
                disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled} //   onChange={handleChangeEmail

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
                    disabled={disabled}
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
                    disabled={disabled}
                    placeholder="Introduzca los premios separados por comas"
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                <Button type="submit" color={color} variant="contained">
                  {button_label}
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
