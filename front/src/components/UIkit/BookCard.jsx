import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "react-image-resizer";
import {
  Box,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 100,
  },
  details: {
    flex: 1,
  },
  cardContent: {
    padding: theme.spacing(1)
  },
  cover: {
    width: 75,
    heiht: 100,
  }
}));

const BookCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">

          <Image
            src={props.image}
            width={100}
            height={200}
          />

          <div className={classes.details}>
            <CardContent>
              <Typography component="p">
                {props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.author}
              </Typography>
            </CardContent>
          </div>

    </Card>
  );
}

export default BookCard