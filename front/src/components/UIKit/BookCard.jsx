import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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

          <CardMedia
            className={classes.cover}
            image={props.thumbnail}
            title={props.title}
          />

          <div className={classes.details}>
            <CardContent>
              <Typography component="p" variant="p" >
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