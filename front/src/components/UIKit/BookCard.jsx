import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 200
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "33%",
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const BookCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  // console.log(props.searchResult.imageLinks)

  let title = ("title" in props.searchResult) ? props.searchResult.title : "No title"
  let author = ("authors" in props.searchResult) ? props.searchResult.authors[0] : "No author"
  let thumbnail = ("imageLinks" in props.searchResult) ? props.searchResult.imageLinks.thumbnail : "https://lh3.googleusercontent.com/proxy/OT0HbEcJ4HNmkzaUIptt_i9_Zu2XlKeqnT6svBmsr1ytaQewvUVBiTXAc7yfe3O_PqfEMnT8ix6g1G4CpHAvHJK3X_EkzilGE7NHhbM"


  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.cover}
        image={thumbnail}
        title={title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {author}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default BookCard