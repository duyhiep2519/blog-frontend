import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FeaturePost, Loading, MainFeaturedPost } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axios } from "services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Home = () => {
  const [articles, setArticles] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  //get articles
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/article`)
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {!articles ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <MainFeaturedPost article={articles[0]} />
          <Grid container spacing={4}>
            {articles.map((article, index) => (
              <FeaturePost key={index} article={article} />
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Home;
