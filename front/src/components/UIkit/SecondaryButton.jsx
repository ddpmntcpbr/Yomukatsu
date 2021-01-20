import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme)=>({
  "button": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    color: "white",
    fontWeight: 700,
    height: 48,
    width: "10em",
    '&:hover': {
      background: theme.palette.secondary.light,
   },
  }
}))

const SecondaryButton = (props) => {

  const classes = useStyles();

  return(
    <Button className={classes.button} variant="outlined" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default SecondaryButton