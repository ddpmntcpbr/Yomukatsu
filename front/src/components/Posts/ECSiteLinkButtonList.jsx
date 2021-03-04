import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  googleBooksButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4285F4",
  },
  amazonButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#FA9900",
  },
  rakutenButton: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#BF1A00",
  },
}));

const ECSiteLinkButtonList = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() => window.open(props.url)}
          className={classes.googleBooksButton}
        >
          Google
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() =>
            window.open(
              "https://www.amazon.co.jp/s?k=" +
                props.title +
                "&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss"
            )
          }
          className={classes.amazonButton}
        >
          Amazon
        </Button>
      </Grid>

      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() =>
            window.open(
              "https://books.rakuten.co.jp/search?sitem=" +
                props.title +
                "&l-id=pc-search-box&x=29&y=15"
            )
          }
          className={classes.rakutenButton}
        >
          楽天
        </Button>
      </Grid>
    </Grid>
  );
};

export default ECSiteLinkButtonList;
