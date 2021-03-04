import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardMedia } from '@material-ui/core'
import { NoImage } from '../../assets/img/src/no_image.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 200,
  },
  details: {
    flex: 1,
  },
  cover: {
    width: 100,
    heiht: 200,
  },
}))

const BlankBookCard = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia image={NoImage} title="No Image" />
    </Card>
  )
}

export default BlankBookCard
