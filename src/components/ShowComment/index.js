import {
  Avatar,
  Badge,
  Collapse,
  Divider,
  Grid,
  Container,
  Button,
  TextField,
  Tooltip,
  Modal,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { ShowListReply } from "components";
import { getTimestamp } from "helper/ConvertTime";
import React, { useEffect, useState } from "react";
import { axios } from "services";
import * as yup from "yup";
import { AppLinearProgress } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import qs from "qs";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingLeft: "8px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  author: { margin: 0, textAlign: "left" },
  content: { textAlign: "left" },
  createdAt: { textAlign: "left", color: "gray", fontSize: 12 },
  replyButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  inputReply: {
    width: 400,
  },
  expandIcon: {
    marginTop: 10,
  },
  collapse: {
    paddingTop: "13px",
    paddingLeft: "30px",
  },
  formRoot: {
    padding: "10px 0",
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formReply: {
    position: "absolute",
    top: "20%",
    left: "35%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//yup

const schema = yup.object().shape({
  content: yup.string().min(2).required("Content should be required please"),
});

export default function ShowListComment(props) {
  const { _id, showForm } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [clickReply, setClickReply] = useState(false);
  const [listComment, setListComment] = useState();
  const [loading, setLoading] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [comment_id, setComment_id] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);

  //form validate
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //show reply
  const handleClick = () => {
    setOpen(!open);
  };
  //handle reply
  const handleReply = (_id) => {
    if (user.isLogin) {
      setShowReply(!showReply);
      setComment_id(_id);
    } else {
      enqueueSnackbar("You must login to continue", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    }
  };
  //get list comment

  useEffect(() => {
    const fetchData = () => {
      if (_id) {
        axios
          .get(`/article/${_id}/comment`)
          .then((res) => {
            setListComment(res.data);
          })
          .catch((err) => console.error(err));
      }
    };

    fetchData();
  }, [_id, clickReply, showForm, showReply]);

  return (
    <>
      {listComment &&
        listComment.map((comment, index) => (
          <>
            <Grid
              key={index}
              container
              direction="column"
              className={classes.root}
            >
              <Grid container item spacing={2}>
                <Grid item>
                  <Avatar alt={comment.name} src={comment.photo} />
                </Grid>
                <Grid item>
                  <h4 className={classes.author}>{comment.username}</h4>
                </Grid>
              </Grid>
              <Grid justifyContent="left" item>
                <p className={classes.content}>{comment.content}</p>
                <p className={classes.createdAt}>
                  {getTimestamp(comment.createdAt)}
                </p>
              </Grid>
              <Grid justifyContent="left" item spacing={1} container>
                <Grid item>
                  <Typography
                    color={`${comment.likeCount > 0 ? "secondary" : "primary"}`}
                    className={classes.replyButton}
                    button
                    onClick={() => {
                      if (user.isLogin) {
                        axios
                          .post(`/article/${comment._id}/likecountcomment`)
                          .then((res) => console.log(res.data))
                          .catch((err) => console.error(err));
                        setClickReply(!clickReply);
                        enqueueSnackbar(`You liked ${comment.name}'s comment`, {
                          variant: "success",
                        });
                      } else {
                        enqueueSnackbar("You must login to continue", {
                          variant: "warning",
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                        });
                      }
                    }}
                  >
                    Thích
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    component="body1"
                    variant="body"
                    className={classes.replyButton}
                    button
                    onClick={() => handleReply(comment._id)}
                  >
                    Trả lời
                  </Typography>
                </Grid>
                <Grid item>
                  {open ? (
                    <Badge>
                      <Tooltip title="Close">
                        <ExpandLess
                          className={classes.replyButton}
                          onClick={handleClick}
                        />
                      </Tooltip>
                    </Badge>
                  ) : (
                    <Badge>
                      <Tooltip title="Show reply">
                        <ExpandMore
                          className={classes.replyButton}
                          onClick={handleClick}
                        />
                      </Tooltip>
                    </Badge>
                  )}
                </Grid>
                <Grid item>
                  {comment.likeCount > 0 ? (
                    <ThumbUpIcon color="primary" />
                  ) : null}
                </Grid>
                <Grid item>
                  {comment.likeCount > 0 ? comment.likeCount : null}
                </Grid>
              </Grid>
            </Grid>
            <Collapse
              key={index + 12}
              in={open}
              timeout="auto"
              className={classes.collapse}
            >
              <ShowListReply _id={comment._id} clickReply={clickReply} />
            </Collapse>
            <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
          </>
        ))}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showReply}
        onClose={() => setShowReply(!showReply)}
      >
        <Container component="main" maxWidth="xs" className={classes.formReply}>
          <div className={classes.paper}>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit((data) => {
                setLoading(true);
                axios
                  .post(
                    `/article/${comment_id}/reply`,
                    qs.stringify({
                      name: user.user.username,
                      content: data.content,
                    })
                  )
                  .then((res) => {
                    setTimeout(() => {
                      setLoading(false);
                    }, 500);

                    setShowReply(false);
                    setClickReply(!clickReply);
                  })
                  .catch((err) => console.error(err));
                enqueueSnackbar(`Your reply has been uploaded`, {
                  variant: "success",
                });
              })}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="content"
                label="Content"
                type="content"
                id="content"
                {...register("content", { required: true })}
                helperText={errors.content && errors.content.message}
                rows={5}
                maxRows={5}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Post
              </Button>
            </form>
            {loading && <AppLinearProgress />}
          </div>
        </Container>
      </Modal>
    </>
  );
}
