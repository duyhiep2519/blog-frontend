import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
});
export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton animation="wave" width="100%" height={30} />
      <Skeleton animation="wave" width="100%" height={30} />
      <Skeleton animation="wave" width="100%" height={30} />
    </div>
  );
}
