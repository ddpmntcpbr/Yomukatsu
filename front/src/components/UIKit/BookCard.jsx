import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Image from "react-image-resizer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 200
  },
  details: {
    flex: 1
  },
  cover: {
    width: 100,
    heiht: 200,
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