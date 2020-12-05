import React, { memo } from "react";

import PieceCard from "../PieceCard/PieceCard";
import { makeStyles, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const PiecesCards = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {props.pieces
          .slice(
            props.currentStartIndex,
            props.currentStartIndex + props.item_per_page
          )
          .map((piece, index) => (
            <Grid item key={piece.id} xs={12} sm={6} md={4}>
              <PieceCard
                piece={piece}
                index={index + props.currentStartIndex}
                handleCreate={props.handleCreate}
                handleEdit={props.handleEdit}
                handleDelete={props.handleDelete}
                handleDetails={props.handleDetails}
                toggleVisibility={props.toggleVisibility}
                showAdminActions={props.isAuth}
                zoomIn={props.zoomIn}
                handleZoom={props.handleZoom}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default memo(PiecesCards);
