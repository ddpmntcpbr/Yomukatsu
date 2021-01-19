import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper,Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import { Box,Button } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme)=>({
  itemContent:{
    fontSize: "0.8rem",
    padding: theme.spacing(1)
  },
  checkIcon: {
    float: "right"
  },
  iconCell: {
    fontSize: "1rem",
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
    <Box>
      { props.postItems.length > 0 && (
          props.postItems.map((item,i) => (
            item.content !== "" && (
              <Grid container spacing={1} key={i} alignItems="center" justify="center">
                <Grid item xs={11}>
                  <Paper variant="outlined" onClick={() => editPostItem(i,item.content)}>
                    <Typography component="p" className={classes.itemContent}>
                      {item.content}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={1}>
                  <Box textAlign="center" p={0}>
                    <IconButton onClick={() => deletePostItem(i)} style={{padding: 0}}>
                      <MoreVertIcon className={classes.iconCell}/>
                    </IconButton>
                  </Box>
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