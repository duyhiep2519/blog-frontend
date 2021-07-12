import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { getTimestamp } from "helper/ConvertTime";
import React from "react";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { article } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={`/detail/${article.slug}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {article.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {getTimestamp(article.createdAt)}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {article.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Author: {article.author}
              </Typography>
              <Link
                variant="body2"
                color="primary"
                component={RouterLink}
                to={`/detail/${article.slug}`}
              >
                Continue reading...
              </Link>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={article.imgUrl}
              title={article.title}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
