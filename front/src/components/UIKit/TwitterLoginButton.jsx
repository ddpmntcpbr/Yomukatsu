import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>({
  "button": {
    backgroundColor: "#55acee",
    color: "#fff",
    height: 48,
    width: 300,
    textTransform: "none"
  },
  iconStyle: {
    fontSize: 28
  },
  "typographyStyle": {
    paddingLeft: 8,
    fontSize: 18
  }
}))

const TwitterLoginButton = (props) => {

  const classes = useStyles();

  return(
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
        <TwitterIcon className={classes.iconStyle}/>
        <Typography className={classes.typographyStyle}>
          {props.label}
        </Typography>
    </Button>
  )
}

export default TwitterLoginButton