import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {},
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(1),
  },
}));

const sidebar = {
  title: "About me",
  description:
    "Tôi là một người yêu thích công nghệ, đặc biệt là lập trình web. Đây là nơi chia sẻ cũng như lưu trữ những kiến thức mà tôi có được trong quá trình học tập và phát triển",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 2020", url: "#" },
    { title: "October 2020", url: "#" },
    { title: "September 2020", url: "#" },
    { title: "August 2020", url: "#" },
    { title: "July 2020", url: "#" },
    { title: "June 2020", url: "#" },
    { title: "May 2020", url: "#" },
    { title: "April 2020", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom>
            <Link href="/about"> {sidebar.title}</Link>
          </Typography>
          <Typography>{sidebar.description}</Typography>
        </Paper>
        <Typography
          variant="h6"
          gutterBottom
          className={classes.sidebarSection}
        >
          Archives
        </Typography>
        {sidebar.archives.map((archive) => (
          <Link
            display="block"
            variant="body1"
            href={archive.url}
            key={archive.title}
          >
            {archive.title}
          </Link>
        ))}
        <Typography
          variant="h6"
          gutterBottom
          className={classes.sidebarSection}
        >
          Social
        </Typography>
        {sidebar.social.map((network, index) => (
          <Link display="block" variant="body1" href="#" key={index}>
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item>
                <network.icon />
              </Grid>
              <Grid item>{network.name}</Grid>
            </Grid>
          </Link>
        ))}
      </div>
    </>
  );
}
