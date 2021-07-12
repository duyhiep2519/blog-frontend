import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Divider,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { AppLinearProgress, ShowListComment } from "components";
import RenderHtml from "components/RenderHtml";
import { getTimestamp } from "helper/ConvertTime";
import { useSnackbar } from "notistack";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import Scroll from "react-scroll";
import { axios } from "services";
import * as yup from "yup";

const scroll = Scroll.animateScroll;

const useStyles = makeStyles((theme) => ({
  formRoot: {
    padding: "18px 10px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  root: {
    minWidth: 345,
  },
  media: {
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
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
}));

//yup

const schema = yup.object().shape({
  content: yup.string().min(2).required("Content should be required please"),
});

const CardArticle = (props) => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // get article from slug
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/article/${slug}`)
        .then((res) => {
          setArticle(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [slug, click]);

  return (
    <>
      {article && (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={article.imgUrl}
                alt={article.title}
              >
                Lisa
              </Avatar>
            }
            title={article.author}
            subheader={getTimestamp(article.createdAt)}
          />
          <CardActionArea href={`/detail/${article.slug}`}>
            <CardMedia className={classes.media} image={article.imgUrl} />
          </CardActionArea>

          <CardContent>
            <Typography variant="h2" color="textPrimary" component="p">
              {article.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              color={`${article.likeCount > 0 ? "secondary" : "primary"}`}
              aria-label="like"
              onClick={() => {
                if (user.isLogin) {
                  axios
                    .post(`/article/${article._id}/likecount`)
                    .then((res) => console.log(res.data))
                    .catch((err) => console.error(err));
                  setClick(!click);
                  enqueueSnackbar("Thank you!", {
                    variant: "success",
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
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
              <Badge badgeContent={article.likeCount} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="comment"
              onClick={() => scroll.scrollToBottom()}
            >
              <Badge badgeContent={article.commentCount} color="primary">
                <Link component={RouterLink} to={`/detail/${article.slug}`}>
                  <CommentIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <CardContent>
              <RenderHtml html={article.content} />
            </CardContent>
            <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
            <Typography>
              Comment here...{"  "}
              <IconButton
                aria-label="comment"
                onClick={() => {
                  if (user.isLogin) {
                    setShowForm(!showForm);
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
                <Badge badgeContent={article.commentCount} color="primary">
                  <Tooltip title="Comment">
                    <CommentIcon color="primary" button />
                  </Tooltip>
                </Badge>
              </IconButton>
            </Typography>

            <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
            {showForm && (
              <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      setLoading(true);

                      axios
                        .post(
                          `/article/${article._id}/comment`,
                          qs.stringify({
                            username: user.user.username,
                            content: data.content,
                            photo: user.user.photo,
                          })
                        )
                        .then((res) => {
                          setTimeout(() => {
                            setLoading(false);
                          }, 500);
                          setClick(!click);
                          setShowForm(false);
                        })
                        .catch((err) => console.error(err));
                      enqueueSnackbar("Your comment has been uploaded", {
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
            )}

            <ShowListComment _id={article._id} showForm={showForm} />
          </Collapse>
        </Card>
      )}
    </>
  );
};

export default CardArticle;
