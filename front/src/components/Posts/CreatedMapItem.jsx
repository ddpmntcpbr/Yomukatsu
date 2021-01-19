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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { QuestionDialog } from "../UIkit"

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

const CreatedMapItem = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletePostItemDialogOpen, setDeletePostItemDialogOpen] = useState(false);

  // const dispatch = useDispatch();

  // const [index, setIndex] = useState(-1),
  //       [postItem, setPostItem] = useState(""),
  //       [inputFormOpen, setInputFormOpen] = useState(false),
  //       [anchorEl, setAnchorEl] = useState(null);

  // useEffect(()=>{
  //   setIndex(props.postItems.length)
  // },[props])

  // const inputPostItem = useCallback((event)=>{
  //   setPostItem(event.target.value)
  // },[setPostItem]);

  // const handleInputFormOpen = () => {
  //   setInputFormOpen(true);
  // };

  // const handleInputFormClose = () => {
  //   setPostItem("")
  //   setInputFormOpen(false);
  // };

  // const addPostItem = (index, postItem) => {
  //   if (postItem === "") {
  //     return false
  //   } else {
  //     if (index === props.postItems.length) {
  //       props.setPostItems(prevState => [...prevState, {content:postItem}])
  //       setIndex(index + 1)
  //       setPostItem("")
  //     } else {
  //       const newPostItems = props.postItems
  //       newPostItems[index]["content"] = postItem
  //       props.setPostItems(newPostItems)
  //       setIndex(newPostItems.length)
  //       setPostItem("")
  //     }
  //     // console.log(props.postItems)
  //     // dispatch(updatePostItems(props.postId,props.postItems))
  //     handleInputFormClose()
  //   }
  // };

  // const editPostItem = (index,content) => {
  //   handleInputFormOpen()
  //   setIndex(index);
  //   setPostItem(content);
  //   // console.log(props.postItems)
  //   // dispatch(updatePostItems(props.postId,props.postItems))
  // }

  // const deletePostItem = (deleteIndex) => {
  //   const newPostItems = props.postItems.filter((item,i) => i !== deleteIndex);
  //   props.setPostItems(newPostItems);
  // }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleDeletePostItem = (i) => {
  //   props.deletePostItem(i)
  //   handleClose()
  // }

  const handleDeletePostItemDialogOpen = useCallback(() => {
    setDeletePostItemDialogOpen(true);
  }, [setDeletePostItemDialogOpen])

  const handleDeletePostItemDialogClose = useCallback(() => {
    setDeletePostItemDialogOpen(false)
  }, [setDeletePostItemDialogOpen]);

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item xs={11}>
          <Paper variant="outlined" onClick={() => props.editPostItem(props.i,props.item.content)}>
            <Typography component="p" className={classes.itemContent}>
              {props.item.content}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {/* <Box textAlign="center" p={0}>
            <IconButton onClick={() => props.deletePostItem(props.i)} style={{padding: 0}}>
              <MoreVertIcon className={classes.iconCell}/>
            </IconButton>
          </Box> */}
          <Box textAlign="center" p={0}>
            <IconButton onClick={handleClick} style={{padding: 0}}>
              <MoreVertIcon className={classes.iconCell}/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={()=>{
                  props.editPostItem(props.i,props.item.content);
                  handleClose();
                }}>
                編集
              </MenuItem>
              <MenuItem
                onClick={()=>{
                  handleDeletePostItemDialogOpen()
                  handleClose()
                }}>
                削除
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>

      <QuestionDialog
        open={deletePostItemDialogOpen}
        handleClose={handleDeletePostItemDialogClose}
        handleEvent={()=>{
          props.deletePostItem(props.i)
          handleDeletePostItemDialogClose()
        }}
        title="本当に削除しますか？"
      />
    </div>
  )
}

export default CreatedMapItem