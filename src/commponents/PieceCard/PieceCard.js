import React, { memo } from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  Tooltip,
  makeStyles,
  IconButton,
  CardActionArea,
  Hidden,
} from "@material-ui/core";
import {
  DetailsRounded,
  VisibilityOff,
  Visibility,
  Edit,
  Delete,
} from "@material-ui/icons";

import noImage from "../../assets/images/noImage.png";

const useStyles = makeStyles((theme) => ({
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
}));

const PieceCard = ({
  piece,
  index,
  showAdminActions,
  handleEdit,
  handleDelete,
  handleDetails,
  toggleVisibility,
  zoomIn,
  handleZoom,
}) => {
  const classes = useStyles();

  console.log("redender");

  return (
    <Card elevation={15} className={classes.card}>
      <Hidden only={("lg", "xl", "xs")}>
        <CardActionArea
          onClick={(e) => {
            handleZoom(e, index);
          }}
        >
          <CardMedia
            className={classes.cardMedia}
            image={piece.image_url || noImage}
            title={piece.title || "no title"}
          />
        </CardActionArea>
      </Hidden>

      <Hidden smUp>
        <CardMedia
          component="img"
          image={piece.image_url || noImage}
          title="Image title"
        />
      </Hidden>

      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {piece.title}
        </Typography>
        <Typography variant="caption">De: {piece.author}</Typography>
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
            <Tooltip title="Detalles">
              <Button
                size="small"
                color="primary"
                onClick={(event) => handleDetails(event, index)}
              >
                <DetailsRounded></DetailsRounded>
              </Button>
            </Tooltip>
          </Grid>
          {showAdminActions && (
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
                    title="Ocultar"
                    onClick={(event) => toggleVisibility(event, index)}
                  >
                    <IconButton color="inherit">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Mostrar"
                    onClick={(event) => toggleVisibility(event, index)}
                  >
                    <IconButton>
                      <VisibilityOff />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Tooltip
                  title="Editar"
                  id="edit"
                  onClick={(event) => handleEdit(event, index)}
                >
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={4} sm={4} md={4} xl={4}>
                <Tooltip
                  title="Eliminar"
                  onClick={(event) => handleDelete(event, index)}
                >
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PieceCard;
