import { Box, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { makeStyles } from '@material-ui/styles'
import { CreatedPostItem } from 'components/Posts'
import { TextInput } from 'components/UIkit'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePostItems } from 'reducks/posts/operations'

const useStyles = makeStyles((theme) => ({
  inputButton: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const CreatedPostItemsList = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [index, setIndex] = useState(-1),
    [postItem, setPostItem] = useState(''),
    [inputFormOpen, setInputFormOpen] = useState(false)

  useEffect(() => {
    setIndex(props.postItems.length)
  }, [props])

  const inputPostItem = useCallback(
    (event) => {
      setPostItem(event.target.value)
    },
    [setPostItem]
  )

  const handleInputFormOpen = () => {
    setInputFormOpen(true)
  }

  const handleInputFormClose = () => {
    setPostItem('')
    setInputFormOpen(false)
  }

  const addPostItem = async (index, postItem) => {
    if (postItem === '') {
      return false
    } else {
      let newPostItems = []
      if (index === props.postItems.length) {
        newPostItems = [...props.postItems, { content: postItem }]
        props.setPostItems(newPostItems)
        setIndex(index + 1)
        setPostItem('')
      } else {
        newPostItems = props.postItems
        newPostItems[index]['content'] = postItem
        props.setPostItems(newPostItems)
        setIndex(newPostItems.length)
        setPostItem('')
      }
      dispatch(updatePostItems(props.postId, [...props.initialPostItems], [...newPostItems]))
      handleInputFormClose()
    }
  }

  const editPostItem = useCallback(
    (index, content) => {
      handleInputFormOpen()
      setIndex(index)
      setPostItem(content)
    },
    [setIndex, setPostItem]
  )

  const deletePostItem = useCallback(
    (deleteIndex) => {
      const newPostItems = props.postItems.filter((item, i) => i !== deleteIndex)
      dispatch(updatePostItems(props.postId, [...props.initialPostItems], [...newPostItems]))
      props.setPostItems(newPostItems)
    },
    [dispatch, props]
  )

  return (
    <Box>
      {props.postItems.length > 0 &&
        props.postItems.map(
          (item, i) =>
            item.content !== '' && (
              <CreatedPostItem key={i} i={i} item={item} editPostItem={editPostItem} deletePostItem={deletePostItem} />
            )
        )}

      {inputFormOpen ? (
        <Box>
          <TextInput
            fullWidth={true}
            label={'マップアイテムを入力'}
            multiline={true}
            requires={true}
            onChange={inputPostItem}
            rows={3}
            value={postItem}
            type={'text'}
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
      ) : (
        <Box textAlign="center" my={2}>
          <Button variant="outlined" color="default" startIcon={<AddIcon />} onClick={() => handleInputFormOpen()}>
            マップアイテムを追加
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default CreatedPostItemsList
