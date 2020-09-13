import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
import axios from "axios"
import { BookCard } from "../UIkit"
import { MapItemCard } from "./index"
import { getPosts } from "../../reducks/posts/selectors";

const CompletedBookDetail = (props) => {

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h3">
        書籍情報
      </Typography>
      <Box>
        <BookCard title={props.title} author={props.author} image={props.image} />
      </Box>

      <Typography variant="h5" component="h3">
        メンタルマップ
      </Typography>

      {props.mapItems.length > 0 && (
        props.mapItems.map(mapItem => (
        <Box key={mapItem.id}>
          <MapItemCard content={mapItem.content} />
        </Box>
        ))
      )}
    </Container>
  )
}

export default CompletedBookDetail