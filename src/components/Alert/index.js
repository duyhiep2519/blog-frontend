import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function AppAlert(props) {
  return <Alert severity={props.type}>{props.content}</Alert>;
}
