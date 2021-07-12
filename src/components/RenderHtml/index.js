import React from "react";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const RenderHtml = (props) => {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const clean = DOMPurify.sanitize(props.html);
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0}>
        <div
          className={classes.root}
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </Paper>
    </>
  );
};

export default RenderHtml;
