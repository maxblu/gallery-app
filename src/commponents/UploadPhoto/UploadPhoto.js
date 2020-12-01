import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  Grid,
  Tooltip,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

const UploadPhoto = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={props.photo}></CardMedia>

      <CardActions>
        <Grid
          container
          // direction="column"
          alignItems="center"
          alignContent="center"
          justify="center"
        >
          <Grid item>
            {/* <Tooltip title="Subir Foto" onClick={props.handleUpload}> */}
            {/* <input type="file" /> */}
            {/* <input type="file" hidden /> */}
            {/* </CloudUploadIcon> */}
            {/* </Tooltip> */}
            <Button
              variant="contained"
              component="label"
              disabled={props.disabled}
            >
              <CloudUploadIcon />
              Elegir Foto
              <input type="file" hidden onChange={props.handleUpload} />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UploadPhoto;
