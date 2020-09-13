import React, { useCallback,useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button,Box,Container,Divider,Paper,Typography } from "@material-ui/core"
import axios from "axios"
import { BookCard } from "../UIkit"
import { MapItemCard } from "./index"
import { getPosts } from "../../reducks/posts/selectors";
import { PrimaryButton,QuestionDialog } from "../UIkit"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme)=>({
  root: {
    margin:"0 1rem"
  }
}))


const ReadingBookDetail = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  return (
    <Paper>
      <Box p={1} >
        <Typography variant="h6" component="h3">
          書籍情報
        </Typography>
        <Divider />
        <Box m={1}>
          <BookCard title={props.title} author={props.author} image={props.image} />
        </Box>

        <Typography variant="h6" component="h3">
          メンタルマップ
        </Typography>
        <Divider />

        {props.mapItems.length > 0 && (
          props.mapItems.map(mapItem => (
          <Box key={mapItem.id} m={1} >
            <MapItemCard content={mapItem.content} />
          </Box>
          ))
        )}

        <Box display="flex" justifyContent="center" p={1}>
          <PrimaryButton
            label="完読した!"
            onClick={handleClickOpen}
          />
        </Box>

        <Box display="flex" justifyContent="center">
          <Box m={1}>
            <Button
              variant="contained"
              color="default"
              startIcon={<EditIcon />}
            >
              編集
            </Button>
          </Box>
          <Box m={1}>
            <Button
              variant="outlined"
              color="default"
              startIcon={<DeleteIcon />}
            >
              削除
            </Button>
          </Box>
        </Box>

        <QuestionDialog
          open={open}
          handleClose={handleClose}
          title="完読にしてよろしいですか？"
          contentText="一度完読にしたアイテムは、元には戻せません"
        />
      </Box>
    </Paper>
  )
}

export default ReadingBookDetail