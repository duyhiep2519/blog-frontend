import { Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { UserTable } from "Admin";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    color: "#3f51b5",
  },
}));
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
export default function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <Typography align="center" color="primary" component="h2" variant="h2">
          Admin Dashboards
        </Typography>
        <Grid container spacing={1} className={classes.root}>
          <Grid item lg={2}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              aria-label="Vertical tabs example"
              className={classes.tabs}
              value={value}
              onChange={handleChange}
            >
              <Tab
                className={classes.tab}
                label="Dashboards"
                {...a11yProps(0)}
              ></Tab>
              <Tab
                className={classes.tab}
                label="Manage User"
                {...a11yProps(1)}
              ></Tab>
              <Tab
                className={classes.tab}
                label="Manage Article"
                {...a11yProps(2)}
              ></Tab>
              <Tab
                className={classes.tab}
                label="Notifications"
                {...a11yProps(3)}
              ></Tab>
              <Tab
                className={classes.tab}
                label="Sign Out"
                {...a11yProps(4)}
              ></Tab>
              <Tab
                className={classes.tab}
                label="Charts"
                {...a11yProps(5)}
              ></Tab>
            </Tabs>
          </Grid>
          <Grid item lg={10}>
            <TabPanel value={value} index={0}>
              Dashboards
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Mange Article
            </TabPanel>
            <TabPanel value={value} index={3}>
              Notifications
            </TabPanel>
            <TabPanel value={value} index={4}>
              SignOut
            </TabPanel>
            <TabPanel value={value} index={5}>
              Chart
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
