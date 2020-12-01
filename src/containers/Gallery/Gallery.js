import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import noImage from "../../assets/images/noImage.png";
import * as actions from "../../store/actions";
// import axios from "../../axios-orders";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Spinner from "../../commponents/Spinner/Spinner";
import DetailsCard from "../../commponents/Details/DetailsCard";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  welcomeContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  filterButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const piece = {
  title: "",
  image_url: null,

  author: "",
  tec: "",
  year: new Date(),
  manif: "",
  price: 0,
  awards: "",
  visible: true,
};

const Gallery = (props) => {
  const classes = useStyles();
  // const [isAuth, setIsAuth] = useState(false);

  //   const [isAdminPage, setisAdminPage] = useState();
  const pieces = useSelector((state) => state.pieces, shallowEqual);
  const isAuth = useSelector((state) => state.token, shallowEqual);
  const loading = useSelector((state) => state.loading);
  const [details, setDetails] = useState(false);

  const dispatch = useDispatch();

  const handleCreate = () => {
    props.history.push("/create", { piece: piece, action: "CRE" });
  };

  const handleEdit = (event, index) => {
    console.log(index);

    props.history.push("/edit", {
      piece: pieces[index],
      index: index,
      action: "UPD",
    });
  };

  const handleDelete = (event, index) => {
    props.history.push("/delete", {
      piece: pieces[index],
      index: index,
      action: "DEL",
    });
  };

  const toggleVisibility = (event, index) => {
    const data = { ...pieces[index], visible: !pieces[index].visible };

    dispatch(actions.updatePiece(data, index, isAuth));
  };

  const handleDetails = (event, index) => {
    props.history.push("/details", { piece: pieces[index] });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.welcomeContent}>
        {!loading ? (
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Galería Dream Solutions
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Bienvenidos a nuestra galeria donde encontrará lo que busca.
            </Typography>
            <div className={classes.filterBottons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Buscar
                  </Button>
                </Grid>
                <Grid item>
                  {isAuth && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreate}
                    >
                      Añadir Obra
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        ) : (
          <Spinner />
        )}
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={8}>
          {pieces.map((piece, index) => (
            <Grid item key={piece.id} xs={12} sm={6} md={4}>
              <Card elevation={15} className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={piece.image_url || noImage}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {piece.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    // direction="column"
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                  >
                    <Grid item xs={3} sm={3} md={3} xl={3}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={(event) => handleDetails(event, index)}
                      >
                        Detalles
                      </Button>
                    </Grid>
                    {isAuth && (
                      <Grid
                        container
                        // direction="column"
                        alignItems="center"
                        alignContent="center"
                        justify="center"
                      >
                        <Grid item xs={4} sm={4} md={4} xl={4}>
                          {piece.visible ? (
                            <Tooltip
                              title="Visible"
                              onClick={(event) =>
                                toggleVisibility(event, index)
                              }
                            >
                              <VisibilityIcon />
                            </Tooltip>
                          ) : (
                            <Tooltip
                              title="Oculta"
                              onClick={(event) =>
                                toggleVisibility(event, index)
                              }
                            >
                              <VisibilityOffIcon />
                            </Tooltip>
                          )}
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} xl={4}>
                          <Tooltip
                            title="Editar"
                            id="edit"
                            onClick={(event) => handleEdit(event, index)}
                          >
                            {/* <IconButton aria-label="edit" > */}
                            <EditIcon />
                            {/* </IconButton> */}
                          </Tooltip>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} xl={4}>
                          <Tooltip
                            title="Eliminar"
                            onClick={(event) => handleDelete(event, index)}
                          >
                            <DeleteIcon />
                          </Tooltip>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Gallery;
