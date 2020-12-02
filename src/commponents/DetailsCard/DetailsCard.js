import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  makeStyles,
  Grid,
  Typography,
  Container,
  Paper,
  CardActions,
  Button,
  Tooltip,
} from "@material-ui/core";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import React, { useEffect } from "react";
import noPhoto from "../../assets/images/noImage.png";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px",
    height: "20%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
}));

const DetailsCard = (props) => {
  const classes = useStyles();
  //   const { title, author, image_url, id, ...data_to_card_content } = props.piece;
  const piece = props.location.state.piece;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   for (let key in data_to_card_content) {
  //     switch (key) {
  //       case "awards":
  //         data.push();
  //         break;
  //       case "":
  //         data.push();
  //         break;

  //       default:
  //         break;
  //     }

  //     data.push({});
  //   }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        {/* <Paper elevation={16}> */}
        <Card className={classes.card} elevation={16}>
          <CardHeader
            title={piece.title}
            subheader={"Autor: " + piece.author}
          />
          <CardMedia
            className={classes.cardMedia}
            image={piece.image_url || noPhoto}
            title={piece.title}
          />
          <CardContent>
            <Grid
              container
              direction="column"
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <Typography>
                  {"Manifestación Artística: " + piece.manif}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{"Técnica: " + piece.tec}</Typography>
              </Grid>{" "}
              <Grid item xs={12}>
                <Typography>
                  {"Año: " + new Date(piece.year).getFullYear()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{"Precio: " + piece.price}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Tooltip title="Ir atrás" onClick={() => props.history.goBack()}>
              <Button>
                <ArrowBackOutlinedIcon />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
        {/* </Paper> */}
      </Container>
    </React.Fragment>
  );
};

export default DetailsCard;
