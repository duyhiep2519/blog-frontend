import { Grid } from "@material-ui/core";
import { CardArticle } from "components";
import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  let { slug } = useParams();

  return (
    <>
      <Grid item xs={12} lg={12} sm={12}>
        <CardArticle slug={slug} />
      </Grid>
    </>
  );
};

export default Detail;
