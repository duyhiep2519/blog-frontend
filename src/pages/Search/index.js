import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FeaturePost, Loading } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { axios } from "services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0",
    marginTop: 30,
    textAlign: "center",
  },
  res: {
    padding: 30,
  },
}));
//useQuery

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const [articles, setArticles] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  let query = useQuery().get("q");

  //get articles
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`/article/search/${query}`)
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [dispatch, query]);

  return (
    <>
      {!articles ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography
            align="center"
            variant=" h2"
            component="h1"
            color="secondary"
            className={classes.res}
          >
            Result for "{query}"
          </Typography>
          <Grid container spacing={2}>
            {articles.map((article, index) => (
              <FeaturePost key={index} article={article} />
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Search;
