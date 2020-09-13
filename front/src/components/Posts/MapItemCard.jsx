import React from "react";
import { Card,CardContent,Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  root: {

  }
}))

const MapItemCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography component="p">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MapItemCard