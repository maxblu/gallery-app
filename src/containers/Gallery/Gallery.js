import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

import Pagination from "@material-ui/lab/Pagination";

import IconButton from "@material-ui/core/IconButton";

import * as actions from "../../store/actions";
// import axios from "../../axios-orders";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Spinner from "../../commponents/Spinner/Spinner";
// import DetailsCard from "../../commponents/DetailsCard/DetailsCard";

import PieceCard from "../../commponents/PieceCard/PieceCard";
import { Search } from "@material-ui/icons";
import ErrorHandler from "../../commponents/ErrorHandler/ErrorHandler";

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
  const serverError = useSelector((state) => state.error, shallowEqual);
  const loadingVisibility = useSelector((state) => state.loadingVisibility);
  const [item_per_page, setItem_per_page] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [serchParam, setSerchParam] = useState("title");

  // const [result, setResult] = useState('titl');

  const numberOfPages = Math.ceil(pieces.length / item_per_page);

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth <= 960 && window.innerWidth > 600) {
      setItem_per_page(4);
    } else {
      setItem_per_page(3);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(actions.getPieces("admin"));
    } else {
      dispatch(actions.getPieces("user"));
      setCurrentPage(1);
      setCurrentStartIndex(0);
    }

    window.scrollTo(0, 200);
  }, [isAuth]);

  const handlePrevNext = (e, value) => {
    setCurrentStartIndex((value - 1) * item_per_page);
    setCurrentPage(value);
    window.scrollTo(0, 400);
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

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(actions.startCRUD);

    // if (searchQuery) {
    dispatch(actions.searchPieces(pieces, searchQuery, serchParam));
  };

  const closeAlert = () => {
    dispatch(actions.cleanError());
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
              Bienvenidos a nuestra galería.
            </Typography>

            <Grid
              container
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={7} md sm lg xl>
                <form onSubmit={handleSearch}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                  >
                    <Grid item xs={11} md={11} sm={11} lg={11} xl={11}>
                      <TextField
                        size="small"
                        fullWidth
                        type="text"
                        placeholder="Buscar"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                      <IconButton type="submit">
                        <Search color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  name="SearchParam"
                  value={serchParam}
                  onChange={(e) => {
                    setSerchParam(e.target.value);
                  }}
                  // onChange={(e)=>{setSerchParam(e.target.value)})}
                >
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                  >
                    <Grid item xs={12}>
                      <FormControlLabel
                        value={"title"}
                        control={<Radio color="primary" />}
                        label="Título"
                      />
                      <FormControlLabel
                        value="author"
                        control={<Radio color="primary" />}
                        label="Autor"
                      />
                      <FormControlLabel
                        value="manif"
                        control={<Radio color="primary" />}
                        label="Manifestación"
                      />
                      <FormControlLabel
                        value="tec"
                        control={<Radio color="primary" />}
                        label="Técnica"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              alignContent="center"
              style={{ paddingTop: "5%" }}
            >
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
          </Container>
        ) : (
          <Spinner />
        )}
      </div>
      <Grid container justify="center">
        {serverError && (
          <ErrorHandler error={serverError.message} close={closeAlert} />
        )}
      </Grid>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {pieces
            .slice(currentStartIndex, currentStartIndex + item_per_page)
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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.pagination}
      >
        <Pagination
          count={numberOfPages}
          color="primary"
          page={currentPage}
          size="medium"
          onChange={handlePrevNext}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Gallery;
