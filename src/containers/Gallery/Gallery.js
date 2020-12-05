import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  makeStyles,
  Typography,
  Grid,
  CssBaseline,
  Button,
  Container,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import Spinner from "../../commponents/Spinner/Spinner";
import ErrorHandler from "../../commponents/ErrorHandler/ErrorHandler";
import SimpleSearch from "../../commponents/SimpleSearch/SimpleSearch";
import PiecesCards from "../../commponents/PiecesCards/PiecesCards";
import * as actions from "../../store/actions";

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
            <SimpleSearch
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              serchParam={serchParam}
              setSerchParam={setSerchParam}
            />

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
      <PiecesCards
        pieces={pieces}
        isAuth={isAuth}
        currentStartIndex={currentStartIndex}
        item_per_page={item_per_page}
        piece={piece}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDetails={handleDetails}
        toggleVisibility={toggleVisibility}
        showAdminActions={isAuth}
        zoomIn={zoomIn}
        handleZoom={handleZoom}
      />

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
