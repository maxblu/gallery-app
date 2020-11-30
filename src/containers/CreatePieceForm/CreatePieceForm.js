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
import { Flag } from "@material-ui/icons";
import { shallowEqual, useSelector } from "react-redux";

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

  const [piece, setPiece] = useState(props.location.state.piece);
  const [isEdit, setIsEdit] = useState(props.location.state.isEdit);
  const token = useSelector((state) => state.token, shallowEqual);
  // const [photo, setPhoto] = useState(noImage);
  const [photo, setPhoto] = useState({
    preview: noImage,
    raw: { name: "noImage.png" },
  });

  const [changedPhoto, setchangedPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log(piece);
  // useEffect(() => {
  //   console.log("is runnig");
  //   setPiece({ ...props.location.state });
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
      });
      setchangedPhoto(true);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log([id, value]);
    setPiece({ ...piece, [id]: value });
  };

  // const hanldePriceChange = (e) => {
  //   if (e.target.value >= 0) {
  //     setPiece({ ...piece, price: e.target.value });
  //   }
  // };

  const saveToDatabase = (fireBaseUrl) => {
    if (!isEdit) {
      axios
        .post("/pieces.json?auth=" + token, {
          ...piece,
          image_url: fireBaseUrl,
        })
        .then((resp) => {});
    } else {
      axios
        .put("/pieces/" + piece.id + ".json?auth=" + token, {
          ...piece,
          image_url: fireBaseUrl,
        })
        .then((resp) => {});
    }
  };

  const hanldeYearChange = (value) => {
    setPiece({ ...piece, year: value });
  };

  const handleUploadPiece = (e) => {
    e.preventDefault();
    setLoading(true);
    if (piece.image_url && changedPhoto) {
      const deleteRef = storage.refFromURL(piece.image_url);

      deleteRef
        .delete()
        .then((resp) => {})
        .catch(e);
    }

    if (changedPhoto) {
      console.log("va a cambiar foto");
      const uploadTask = storage
        .ref(`/images/${photo.raw.name}`)
        .put(photo.raw);

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          // const currentProgress = Math.round(
          //   (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          // );
          // setProgress(currentProgress);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(photo.raw.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              saveToDatabase(fireBaseUrl);
              setLoading(false);

              props.history.goBack("/admin");
            });
        }
      );
    } else {
      saveToDatabase(piece.image_url);
      setLoading(false);

      props.history.goBack("/admin");
    }
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
