import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { storage } from "../../firebase/firebase";

import {
  Container,
  Grid,
  TextField,
  Card,
  CardMedia,
  CardActions,
  Tooltip,
  IconButton,
  CardContent,
  Paper,
  LinearProgress,
  Button,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DatePicker } from "@material-ui/pickers";
import UploadPhoto from "../../commponents/UploadPhoto/UploadPhoto";
import noImage from "../../assets/images/noImage.png";
import { FileCopyOutlined } from "@material-ui/icons";

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

  const [piece, setPiece] = useState({ ...props.location.state });
  // const [photo, setPhoto] = useState(noImage);
  const [photo, setPhoto] = useState({
    preview: noImage,
    raw: { name: "NoPhoto.png" },
  });
  const [progress, setProgress] = useState(0);

  console.log(piece);
  const handleUploadPhoto = (e) => {
    console.log(e.target.files);
    if (e.target.files.length) {
      setPhoto({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const hanldeTitleChange = (e) => {
    setPiece({ ...piece, title: e.target.value });
  };

  const hanldeAuthorChange = (e) => {
    setPiece({ ...piece, author: e.target.value });
  };

  const hanldeTecChange = (e) => {
    setPiece({ ...piece, tec: e.target.value });
  };

  const hanldeManifChange = (e) => {
    setPiece({ ...piece, manif: e.target.value });
  };

  const hanldePriceChange = (e) => {
    setPiece({ ...piece, price: e.target.value });
  };

  const hanldeYearChange = (value) => {
    setPiece({ ...piece, year: value });
  };

  const handleUploadPiece = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`/images/${photo.raw.name}`).put(photo.raw);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        const currentProgress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setProgress(currentProgress);
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
            setPhoto((prevObject) => ({ ...prevObject, preview: fireBaseUrl }));
            setProgress(0);
          });
      }
    );
  };

  console.log("render");
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <form onSubmit={handleUploadPiece}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Añadir Obra
            </Typography>
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
                  //   error={error
                  //   helperText={emailMesg}
                  label="Título"
                  value={piece.title}
                  onChange={hanldeTitleChange}
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
                  id="author"
                  //   error={error
                  //   helperText={emailMesg}
                  label="Autor"
                  value={piece.author}
                  onChange={hanldeAuthorChange}
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
                  id="manifestacion"
                  //   error={error
                  //   helperText={emailMesg}
                  label="Manifestación artística"
                  value={piece.manif}
                  onChange={hanldeManifChange}
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
                  id="tecnica"
                  //   error={error
                  //   helperText={emailMesg}
                  label="Técnica"
                  value={piece.tec}
                  onChange={hanldeTecChange}
                  //   onChange={handleChangeEmail}
                  //   autoComplete="email"
                  //   autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  type="number"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="price"
                  //   error={error
                  //   helperText={emailMesg}
                  label="Precio"
                  value={piece.price}
                  onChange={hanldePriceChange}
                  //   onChange={handleChangeEmail}
                  //   autoComplete="email"
                  //   autoFocus
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
                  value={piece.year}
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
              {progress ? (
                <LinearProgress variant="determinate" value={progress} />
              ) : (
                <Button type="summit" color="primary" variant="contained">
                  Añadir Obra
                </Button>
              )}
            </Grid>
          </Paper>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default CreatePieceForm;
