import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box,Container,Typography } from "@material-ui/core"
import axios from "axios"
import { BookCard } from "../UIkit"
import { MapItemCard } from "./index"

const ReadingBookDetail = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const path = selector.router.location.pathname;
  const id = path.split("/posts/")[1];

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("#");
  const [mapItems, setMapItems] = useState([]);

  useEffect(()=>{
    axios.get(('http://localhost:3000/api/v1/posts/' +  String(id)), {
      headers: {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client_id'),
        'uid': localStorage.getItem('uid'),
      }
    })
    .then((response) => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setImage(response.data.image)
      setUrl(response.data.url)
      setMapItems(response.data.post_items)
    })
    .catch((error) => {
      console.log("error",error)
    })
  },[])

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h3">
        書籍情報
      </Typography>
      <Box>
        <BookCard title={title} author={author} image={image} />
      </Box>

      <Typography variant="h5" component="h3">
        メンタルマップ
      </Typography>

      {mapItems.length > 0 && (
        mapItems.map(mapItem => (
        <Box key={mapItem.id}>
          <MapItemCard content={mapItem.content} />
        </Box>
        ))
      )}
    </Container>
  )
}

export default ReadingBookDetail