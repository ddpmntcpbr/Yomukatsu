import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme)=>({
  "button": {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256
  }
}))

const SecondaryButton = (props) => {

  const classes = useStyles();

  return(
    <Button className={classes.button} variant="outliend" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default SecondaryButton