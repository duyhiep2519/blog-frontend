import { Avatar, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { getTimestamp } from "helper/ConvertTime";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { axios } from "services";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export default function ShowListReply(props) {
  const { _id, clickReply } = props;
  const classes = useStyles();
  const [listReply, setListReply] = useState();
  const [clickHeart, setClickHeart] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //get list reply

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/article/${_id}/reply`)
        .then((res) => {
          setListReply(res.data);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [_id, clickReply, clickHeart]);

  return (
    <>
      {listReply &&
        listReply.map((reply, index) => (
          <>
            <Divider variant="fullWidth" style={{ margin: "5px 0" }} />
            <Grid container direction="column" key={index}>
              <Grid container item spacing={2}>
                <Grid item>
                  <Avatar alt={reply.title} src={reply.url} />
                </Grid>
                <Grid item>
                  <h4 className={classes.author}>{reply.name}</h4>
                </Grid>
              </Grid>
              <Grid justifyContent="left" item>
                <p className={classes.content}>{reply.content}</p>
                <p className={classes.createdAt}>
                  {getTimestamp(reply.createdAt)}
                </p>
              </Grid>
              <Grid justifyContent="left" item container spacing={1}>
                <Grid item>
                  {" "}
                  <Typography
                    component="body1"
                    variant="body1"
                    className={classes.replyButton}
                    color={`${reply.likeCount > 0 ? "secondary" : "primary"}`}
                    button
                    onClick={() => {
                      axios
                        .post(`/article/${reply._id}/likecountreply`)
                        .then((res) => console.log(res.data))
                        .catch((err) => console.error(err));
                      setClickHeart(!clickHeart);
                      enqueueSnackbar(`You liked ${reply.name}'s reply`, {
                        variant: "success",
                      });
                    }}
                  >
                    Thích
                  </Typography>
                </Grid>
                <Grid item>
                  {reply.likeCount > 0 ? <ThumbUpIcon color="primary" /> : null}
                </Grid>
                <Grid item>{reply.likeCount > 0 ? reply.likeCount : null}</Grid>
              </Grid>
            </Grid>
          </>
        ))}

      <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
    </>
  );
}
