import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";
import { Box,Button } from "@material-ui/core"
import { PrimaryButton } from "../UIkit"
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import {updatePostItems} from "../../reducks/posts/operations"
// import { useDispatch } from 'react-redux'
// import {_sleep} from "../../helpers"

const useStyles = makeStyles((theme)=>({
  checkIcon: {
    float: "right"
  },
  iconCell: {
    height: 32,
    width: 32,
  },
  postItemPaper: {
    padding: theme.spacing(1)
  },
  inputPostItemArea: {
    display: "flex",
    padding: theme.spacing(1)
  },
  inputButton: {
    display: "flex",
    justifyContent: "space-between"
  }
}))

const CreatedMapItemsList = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const [index, setIndex] = useState(-1),
        [postItem, setPostItem] = useState(""),
        [inputFormOpen, setInputFormOpen] = useState(false)

  useEffect(()=>{
    setIndex(props.postItems.length)
  },[props])

  const inputPostItem = useCallback((event)=>{
    setPostItem(event.target.value)
  },[setPostItem]);

  const handleInputFormOpen = () => {
    setInputFormOpen(true);
  };

  const handleInputFormClose = () => {
    setPostItem("")
    setInputFormOpen(false);
  };

  const addPostItem = (index, postItem) => {
    if (postItem === "") {
      return false
    } else {
      if (index === props.postItems.length) {
        props.setPostItems(prevState => [...prevState, {content:postItem}])
        setIndex(index + 1)
        setPostItem("")
      } else {
        const newPostItems = props.postItems
        newPostItems[index]["content"] = postItem
        props.setPostItems(newPostItems)
        setIndex(newPostItems.length)
        setPostItem("")
      }
      // console.log(props.postItems)
      // dispatch(updatePostItems(props.postId,props.postItems))
      handleInputFormClose()
    }
  };

  const editPostItem = (index,content) => {
    handleInputFormOpen()
    setIndex(index);
    setPostItem(content);
    // console.log(props.postItems)
    // dispatch(updatePostItems(props.postId,props.postItems))
  }

  const deletePostItem = (deleteIndex) => {
    const newPostItems = props.postItems.filter((item,i) => i !== deleteIndex);
    props.setPostItems(newPostItems);
  }

  return (
    <Box my={2}>
      { props.postItems.length > 0 && (
          props.postItems.map((item,i) => (
            item.content !== "" && (
              <Grid container spacing={3} key={i} alignItems="center" justify="center">
                <Grid item xs={10}>
                  <Paper className={classes.mapItemPaper} onClick={() => editPostItem(i,item.content)}>
                    {item.content}
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <IconButton className={classes.iconCell} onClick={() => deletePostItem(i)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )
          ))
      )}

      {inputFormOpen
        ?
        <Box>
          <TextInput
            fullWidth={true}
            label={"マップアイテムを入力"}
            multiline={true}
            requires={true}
            onChange={inputPostItem}
            rows={3}
            value={postItem}
            type={"text"}
            autoFocus={true}
          />
          <Box className={classes.inputButton}>
            <Box>
              <Button
                variant="contained"
                color="default"
                startIcon={<RemoveIcon />}
                onClick={() => handleInputFormClose()}
              >
                キャンセル
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addPostItem(index, postItem)}
              >
              保存
              </Button>
            </Box>
          </Box>
        </Box>
        :
        <Box textAlign="center" my={2}>
          <Button
            variant="outlined"
            color="default"
            startIcon={<AddIcon />}
            onClick={() => handleInputFormOpen()}
          >
            マップアイテムを追加
          </Button>
        </Box>
        }
    </Box>
  )
}

export default CreatedMapItemsList