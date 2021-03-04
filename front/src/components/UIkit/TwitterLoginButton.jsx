import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#55acee",
    height: 48,
    width: 256,
    textTransform: "none",
    color: "#fff",
  },
  iconStyle: {
    fontSize: 24,
  },
  typographyStyle: {
    paddingLeft: 4,
    fontSize: "1rem",
    color: "#fff",
  },
}));

const TwitterLoginButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      <TwitterIcon className={classes.iconStyle} />
      <Typography className={classes.typographyStyle}>{props.label}</Typography>
    </Button>
  );
};

export default TwitterLoginButton;
