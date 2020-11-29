import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import UploadPhotoForm from "../UploadPhotoForm/UploadPhotoForm";

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
  card: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const CreatePieceForm = (props) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  //   const
  //   const inputsElements = ["text", "text", "text", "text", "number", "year"];
  //   const inputs = inputsElements.map((elementType) =>{
  //       switch () {
  //           case value:

  //               break;

  //           default:
  //               break;
  //       }
  //   });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Añadir Obra
          </Typography>
          <UploadPhotoForm />
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
                id="author"
                //   error={error
                //   helperText={emailMesg}
                label="Autor"
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
                value={selectedDate}
                onChange={handleDateChange}
                variant="inline"
                fullWidth
                animateYearScrolling
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default CreatePieceForm;
