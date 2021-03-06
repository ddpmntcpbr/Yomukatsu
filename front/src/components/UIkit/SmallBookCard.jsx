import { Box, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Image from 'react-image-resizer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 100,
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  details: {
    flex: 1,
  },
  cardContent: {
    height: "100%",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cover: {
    width: 75,
    heiht: 100,
  },
}))

const BookCard = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <Image src={props.image} width={75} height={100} />
      <Box className={classes.details}>
        <Box className={classes.cardContent}>
          <Box fontSize="0.70rem">{props.title}</Box>
          <Box fontSize="0.70rem">登録日: {props.created_at}</Box>
        </Box>
      </Box>
    </Card>
  )
}

export default BookCard
