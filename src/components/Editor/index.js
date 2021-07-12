import {
  Button,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import qs from "qs";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { axios } from "services";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    formInput: {
      with: "100%",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AppEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log(process.env.REACT_APP_baseUrl);
  const [privacy, setPrivacy] = useState("Public");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const classes = useStyles();

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  //get data from mongoDb to edit

  // const handleUpload = () => {
  //   const blocksFromHtml = htmlToDraft("<h1>H1</h1>");
  //   const { contentBlocks, entityMap } = blocksFromHtml;
  //   const contentState = ContentState.createFromBlockArray(
  //     contentBlocks,
  //     entityMap
  //   );
  //   const editorState = EditorState.createWithContent(contentState);
  //   setEditorState(editorState);
  // };

  // handle upload
  const handleUpload = () => {
    axios
      .post(
        "/article",
        qs.stringify({
          title: title,
          author: author,
          privacy: privacy,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          imgUrl: imgUrl,
          description: description,
        })
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    setAuthor("");
    setTitle("");
    setPrivacy("Public");
    setImgUrl("");
    setDescription("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <Grid container xs={12} lg={12} md={12} className={classes.root}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h2" component="h3">
              Text editor
            </Typography>
          </Grid>

          <Grid item>
            <FormControl className={classes.margin}>
              <Select
                defaultValue="public"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem value={"Public"}>Public</MenuItem>
                <MenuItem value={"Private"}>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                handleUpload();
              }}
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={6} className={classes.formInput}>
            <FormControl>
              <InputLabel htmlFor="input-title">Title</InputLabel>
              <BootstrapInput
                id="input-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.formInput}>
            <FormControl>
              <InputLabel htmlFor="input-title">Author</InputLabel>
              <BootstrapInput
                id="input-author"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.formInput}>
            <FormControl>
              <InputLabel htmlFor="input-img">Theme Image</InputLabel>
              <BootstrapInput
                id="input-img"
                placeholder="Link"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.formInput}>
            <FormControl>
              <InputLabel htmlFor="input-img">Description</InputLabel>
              <BootstrapInput
                id="input-img"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </Grid>
    </>
  );
};

export default AppEditor;
