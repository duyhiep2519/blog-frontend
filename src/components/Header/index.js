import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { getUserRecord, signOut } from "redux/reducer/userSlice";
import { axios } from "services";

const useStyles = makeStyles((theme) => ({
  breadCrumbs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    background: "#424242",
    marginBottom: 100,
  },
  link: {
    display: "flex",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 400,
    alignItems: "center",
    "&:hover": {
      color: "#1565c0",
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  img: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const classes = useStyles();
  const [search, setSearch] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get(`/user/${JSON.parse(localStorage.getItem("user_id"))}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        dispatch(getUserRecord(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user.isLogin]);
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
      <Link
        color="inherit"
        className={classes.link}
        component={RouterLink}
        to="/"
      >
        <HomeIcon className={classes.icon} />
        Trang chủ
      </Link>
      <Link
        color="inherit"
        className={classes.link}
        component={RouterLink}
        to="/"
      >
        <WhatshotIcon className={classes.icon} />
        Chủ đề
      </Link>
      <Link
        color="inherit"
        component={RouterLink}
        className={classes.link}
        to="/about"
      >
        <AccountCircleIcon className={classes.icon} />
        About me
      </Link>
      {user.isLogin ? (
        <Typography className={classes.link}>
          <img className={classes.img} src={user.user.photo} alt="img" />{" "}
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            size="small"
          >
            {user.user && user.user.username}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user.user && user.user.role === "admin" && (
              <Link href="/admin">
                <MenuItem onClick={handleClose}>Manage </MenuItem>
              </Link>
            )}
            {user.user && user.user.role === "admin" && (
              <Link href="/post">
                <MenuItem onClick={handleClose}>Post </MenuItem>
              </Link>
            )}

            <MenuItem
              onClick={() => {
                handleClose();
                dispatch(signOut());
                history.push("/");
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Typography>
      ) : (
        <Link
          color="inherit"
          className={classes.link}
          component={RouterLink}
          to={{
            pathname: "/signin",
          }}
        >
          <PersonIcon className={classes.icon} />
          SigIn
        </Link>
      )}
      <form
        action="http://localhost:3000/search"
        className={classes.search}
        method="GET"
      >
        <div type="submit" className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="q"
        />
      </form>
    </Breadcrumbs>
  );
}
