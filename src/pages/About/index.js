import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
  },
  img: {
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    color: "#3f51b5",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography align="center" variant="h2">
          About
        </Typography>
      </Grid>

      <Grid item>
        <Typography align="left" variant="body1">
          Hi, mình là{" "}
          <Link href="https://www.facebook.com/duyhiep2519">Trần Duy Hiệp</Link>
          , một người yêu thích công nghệ, lập trình. Đây là nơi chia sẻ cũng
          như lưu trữ những kiến ​​thức mà mình có được trong quá trình học hỏi
          và phát triển. Cũng là nơi mình giới thiệu bản thân cùng những quan
          điểm của mình về cuộc sống!^^
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item lg={6} md={6} xs={12}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://lh3.googleusercontent.com/3q9I82e207CvYspyXkMRJaLKBrxWDnzn3wZHVgIqMqVUmfWEsIXXJ8QB96Dxd5qQpmH1w6dAEl4a5sUcsLjqm-PmCNL8yYebKgdX_Cr3xSRCN-VbaexPbYuYkeajVEncqBO58ynA3no-9SHFbXMjJd_5_Y920xEXB0epdJVLmVA7rJe9XTO_XRhjYyqMHUXm02SwijI4LOpK0kFqIaZcS85MJASfH1JggCEC2zz3plWOGKHOh9vkORIKk4w0byNvmtiFh3P2AK4dH2M8eBWbzHiGiwP5tkToBCM-NBBGYLAaTTRzFTDpsffzbJ-VFd_OmII-rW8uj34GrE5APU5Z4w7_reQ3C3JWEW79fFjLLCQOBzJLLGPTnbmrtv3hJYKWG5nc1mRyj3R90PyFOLeWW7CNZO3By93H9A5Qq49xBzS4OQUPaPU1MjKefodz92F5VHi-1qrKUnRwCBkRDiohlFEjkju0pbEAcxeTrMXIoAw684HNalO35NNcGUmHngc__XMTG1M9l19chw26374OGJmI8wjHGmsEZny1o54FGWUSqj6LkdtG61XM-xOg2ULRJYgeu0GTOA5bKu2oghbDd8pNgfrez5_5AVphtKEr1FE27KQdBIPA9JXjFT-JEHwFZ93Ky9fxslhSl0oWXLGigVgtJJQ7WdUENVw9-HEz8J8aZys7fpk2GbhjCU-GBQTYHf3sVsX9EOMsfklwUlRo5g6L=w463-h617-no?authuser=0"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item>
                    <Link href="https://www.facebook.com/duyhiep2519">
                      <FacebookIcon />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://www.instagram.com/eliot_2519/">
                      <InstagramIcon />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="https://github.com/duyhiep2519">
                      <GitHubIcon />
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item lg={6} md={6}>
          <Typography variant="h3" className={classes.title}>
            Web Developer.
          </Typography>
          <Typography>
            Lập trình Web là công việc mà mình lựa chọn để theo đuổi và phát
            triển trong tương lai.
          </Typography>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Age: 21</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Birthday: 25/01/1999</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Website: www.example.com</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Phone: +84 957 623 119</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Email: duyhiep2519@gmail.com</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>City: Ha Noi, Viet Nam</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText>Hobby: Coffee, Mint smoothie</ListItemText>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h2">Skills</Typography>

        <div className={classes.demo}>
          <List>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText>HTMl, CSS, Javascript</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText>ReactJs, Redux</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText>NodeJs, MongoDB, Restful Api</ListItemText>
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
