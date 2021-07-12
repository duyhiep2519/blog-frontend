import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSnackbar } from "notistack";
import qs from "qs";
import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "redux/reducer/userSlice";
import { axios } from "services";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Duy Hiep Tran
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  //responses google
  const responseSuccessGoogle = (response) => {
    axios
      .post(`/user/signin`, qs.stringify({ idToken: response.tokenId }))
      .then((res) => {
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        });
        dispatch(signIn(res.data));
        history.goBack();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          enqueueSnackbar(error.response.data, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          });
        }
      });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <GoogleLogin
          className={classes.form}
          clientId="766423151097-um2alq61rhsnce9ar0af6a9hdp031d0n.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
