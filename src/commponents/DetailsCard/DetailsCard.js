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
  CardActions,
  Button,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import React, { useEffect } from "react";
import noPhoto from "../../assets/images/noImage.png";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "60px",
    height: "20%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
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
      <Container maxWidth="sm">
        {/* <Paper elevation={16}> */}
        <Card className={classes.card} elevation={16}>
          <CardHeader
            title={piece.title}
            subheader={"Autor: " + piece.author}
          />
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={piece.image_url || noPhoto}
            title={piece.title || "no title"}
          />
          <CardContent>
            <Grid
              container
              direction="column"
              alignContent="center"
              alignItems="center"
              justify="center"
              spacing={4}
            >
              <Grid item xs={12}>
                {piece.manif && (
                  <Typography variant="h6">
                    {"Manifestación: " + piece.manif}
                  </Typography>
                )}
              </Grid>

              {piece.tec && (
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {"Técnica: " + piece.tec}
                  </Typography>
                </Grid>
              )}
              {piece.price > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6">Precio: ${piece.price}</Typography>
                </Grid>
              )}
              {piece.year && (
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {"Año: " + new Date(piece.year).getFullYear()}
                  </Typography>
                </Grid>
              )}

              {piece.awards && (
                <Grid item xs={12}>
                  <Accordion elevation={0}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">Premios:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="column"
                        alignContent="center"
                        alignItems="center"
                        justify="center"
                      >
                        {piece.awards.split(",").map((award) => {
                          return (
                            <Grid item xs={12}>
                              <ListItem>
                                <Typography variant="caption">
                                  {award}
                                </Typography>
                              </ListItem>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}
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
