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

import { shallowEqual, useDispatch, useSelector } from "react-redux";

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

const cards = [1, 2, 3, 4, 5, 6];

const piece = {
  title: "",
  image_url: "",
  author: "",
  tec: "",
  year: "",
  manif: "",
  price: 0,
  awards: null,
};

const Gallery = (props) => {
  const classes = useStyles();
  const [isAuth, setIsAuth] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState({
    title: null,
    price: null,
  });
  //   const [isAdminPage, setisAdminPage] = useState();
  const auth = useSelector((state) => state.token, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(selectedPiece);
  useEffect(() => {
    auth ? setIsAuth(true) : setIsAuth(false);
  }, [auth]);

  const handleCreate = () => {
    history.push("/create", piece);
  };

  const handleEdit = (event, id) => {
    console.log(id);
    setSelectedPiece({ ...selectedPiece, title: "45adfgggggggg" });
    history.push("/edit", piece);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.welcomeContent}>
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
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={8}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Titulo
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
                      <Button size="small" color="primary">
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
                          <Tooltip title="Retirar de la Expocición">
                            <VisibilityOffIcon />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} xl={4}>
                          <Tooltip
                            title="Editar"
                            id="edit"
                            onClick={(event) => handleEdit(event, card)}
                          >
                            {/* <IconButton aria-label="edit" > */}
                            <EditIcon />
                            {/* </IconButton> */}
                          </Tooltip>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} xl={4}>
                          <Tooltip title="Eliminar">
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
