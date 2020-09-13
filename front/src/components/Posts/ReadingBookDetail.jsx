import React, { useCallback,useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button,Box,Container,Typography } from "@material-ui/core"
import axios from "axios"
import { BookCard } from "../UIkit"
import { MapItemCard } from "./index"
import { getPosts } from "../../reducks/posts/selectors";
import { PrimaryButton,QuestionDialog } from "../UIkit"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ReadingBookDetail = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

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

      <PrimaryButton
        label="完読した"
        onClick={handleClickOpen}
      />

      <Button variant="contained" color="secondary" size="large" onClick={()=>handleClickOpen()}>
        完読した！
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
      >
        編集
      </Button>

      <Button
        variant="outlined"
        color="inherit"
        startIcon={<DeleteIcon />}
      >
        削除
      </Button>

      <QuestionDialog
        open={open}
        handleClose={handleClose}
        title="完読にしてよろしいですか？"
        contentText="一度完読にしたアイテムは、元には戻せません"
      />
    </Container>
  )
}

export default ReadingBookDetail