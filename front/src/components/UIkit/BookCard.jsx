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
    height: 150,
  },
  details: {
    flex: 1,
  },
  cardContent: {
    padding: theme.spacing(1)
  },
  cover: {
    width: 100,
    heiht: 150,
  }
}));

const BookCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <Image
        src={props.image}
        width={100}
        height={150}
      />

      <Box className={classes.details}>
        <CardContent className={classes.cardContent}>
          <Typography component="h6">
            <Box fontSize="0.8rem" mb={1} fontWeight="fontWeightBold">
              {props.title}
            </Box>
            <Box fontSize="0.70rem">
               著者: {props.author}
            </Box>
            { props.created_at && (
              <Box fontSize="0.70rem">
                登録日: {props.created_at}
              </Box>
            )}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default BookCard