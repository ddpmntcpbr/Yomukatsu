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
        width={75}
        height={100}
      />

      <Box className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Typography component="h6">
            <Box fontSize="0.85rem" mb={2}>
              {props.title}
            </Box>
            <Box fontSize="0.70rem">
               登録日: {props.created_at}
            </Box>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BookCard