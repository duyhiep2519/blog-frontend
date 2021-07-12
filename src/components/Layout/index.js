import { Container, Grid, IconButton, makeStyles } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { SideBar } from "components";
import Scroll from "react-scroll";
import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: { marginTop: 90 },
  toTop: {
    position: "fixed",
    bottom: 20,
    right: 20,
    color: "#fafafa",
    width: "40px",
    height: "40px",
    backgroundColor: "#f44336",
    "&:hover": {
      color: "#fafafa",
      width: "40px",
      height: "40px",
      backgroundColor: "#f44336",
    },
  },
});

const Layout = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  if (user && user.user.role !== null && user.user.role === "admin")
    return (
      <Container maxWidth="lg">
        <Header />
        <Grid className={classes.root} spacing={3} container direction="row">
          {props.children}
        </Grid>
        <IconButton
          onClick={() => Scroll.animateScroll.scrollToTop()}
          className={classes.toTop}
        >
          <ArrowUpwardIcon fontSize="large"></ArrowUpwardIcon>
        </IconButton>

        <Footer />
      </Container>
    );
  return (
    <Container maxWidth="lg">
      <Header />
      <Grid className={classes.root} spacing={3} container direction="row">
        <Grid item lg={9} md={9} xs={12}>
          {props.children}
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <SideBar />
        </Grid>
      </Grid>
      <IconButton
        onClick={() => Scroll.animateScroll.scrollToTop()}
        className={classes.toTop}
      >
        <ArrowUpwardIcon fontSize="large"></ArrowUpwardIcon>
      </IconButton>

      <Footer />
    </Container>
  );
};

export default Layout;
