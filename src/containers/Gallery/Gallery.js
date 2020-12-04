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
import MuiAlert from "@material-ui/lab/Alert";

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
// import DetailsCard from "../../commponents/DetailsCard/DetailsCard";

import PieceCard from "../../commponents/PieceCard/PieceCard";
import { ArrowBack, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Backdrop, Snackbar } from "@material-ui/core";

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
  pagination: {
    padding: theme.spacing(8),
  },
}));

const piece = {
  title: "",
  image_url: null,
  thumnail: null,

  author: "",
  tec: "",
  year: new Date(),
  manif: "",
  price: 0,
  awards: "",
  visible: true,
};
const ITEM_PER_PAGE = 3;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Gallery = (props) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [zoomIn, setZoomIn] = useState({ zoom: false, index: null });
  // const [isAuth, setIsAuth] = useState(false);

  //   const [isAdminPage, setisAdminPage] = useState();
  const pieces = useSelector((state) => state.pieces, shallowEqual);
  const isAuth = useSelector((state) => state.token, shallowEqual);
  const loading = useSelector((state) => state.loading, shallowEqual);
  const loadingVisibility = useSelector((state) => state.loadingVisibility);

  const numberOfPages = Math.ceil(pieces.length / ITEM_PER_PAGE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(actions.getPieces("admin"));
    } else {
      dispatch(actions.getPieces("user"));
      setCurrentPage(1);
      setCurrentStartIndex(0);
    }
  }, [isAuth]);

  const handlePrevNext = (e, id) => {
    if (id === "next" && currentPage + 1 <= numberOfPages) {
      setCurrentStartIndex(currentStartIndex + ITEM_PER_PAGE);
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 400);
    }

    if (id === "back" && currentPage - 1 > 0) {
      setCurrentStartIndex(currentStartIndex - ITEM_PER_PAGE);
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 400);
    }
  };

  const handleCreate = () => {
    props.history.push("/create", { piece: piece, action: "CRE" });
  };

  const handleEdit = (event, index) => {
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
    const data = { visible: !pieces[index].visible };
    dispatch(actions.startCHAV());
    dispatch(actions.updatePartialPiece(pieces[index].id, data, index, isAuth));
  };

  const handleDetails = (event, index) => {
    props.history.push("/details", { piece: pieces[index] });
  };

  const handleZoom = (e, index) => {
    setZoomIn({ zoom: true, index: index });
    handleDetails(e, index);
  };
  // const toogleZoom = () => {
  //   setZoomIn({ zoom: false, index: null });
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
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
              Bienvenidos a nuestra galería donde encontrará lo que busca.
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
        <Grid container spacing={4}>
          {pieces
            .slice(currentStartIndex, currentStartIndex + ITEM_PER_PAGE)
            .map((piece, index) => (
              <Grid item key={piece.id} xs={12} sm={6} md={4}>
                <PieceCard
                  piece={piece}
                  index={index + currentStartIndex}
                  handleCreate={handleCreate}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleDetails={handleDetails}
                  toggleVisibility={toggleVisibility}
                  showAdminActions={isAuth}
                  zoomIn={zoomIn}
                  handleZoom={handleZoom}
                />
              </Grid>
            ))}
        </Grid>
      </Container>

      {numberOfPages > 1 ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.pagination}
        >
          {currentPage > 1 ? (
            <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
              <IconButton id="back" onClick={(e) => handlePrevNext(e, "back")}>
                <ArrowBackIos color="primary" />
              </IconButton>
            </Grid>
          ) : null}
          <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
            <Typography>
              {currentPage}/{numberOfPages}
            </Typography>
          </Grid>
          {currentPage < numberOfPages ? (
            <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
              <IconButton onClick={(e) => handlePrevNext(e, "next")}>
                <ArrowForwardIos color="primary" />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      ) : null}
      {/* <Snackbar open={loading} autoHideDuration={6000}>
        <Alert severity="success">Base de Datos sincrinizada</Alert>
      </Snackbar> */}
    </React.Fragment>
  );
};

export default Gallery;
