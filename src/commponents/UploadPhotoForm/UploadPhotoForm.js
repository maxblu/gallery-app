import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  Grid,
  Tooltip,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import noImage from "../../assets/images/noImage.png";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
}));

const UploadPhotoForm = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={noImage}></CardMedia>

      <CardActions>
        <Grid
          container
          // direction="column"
          alignItems="center"
          alignContent="center"
          justify="center"
        >
          <Grid item>
            <Tooltip title="Subir Foto">
              <IconButton>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UploadPhotoForm;
