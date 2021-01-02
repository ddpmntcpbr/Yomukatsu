import React, { useState, useCallback} from 'react';
import { BookCard,PrimaryButton, SecondaryButton,TextInput } from "../components/UIkit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import {PostEditDialog,SearchResultDialog,SetMapArea} from "../components/Posts";
import {Container,Box,Typography,Paper} from "@material-ui/core";
import {saveReadingPost,saveRegisteredPost} from "../reducks/posts/operations";
import {useDispatch} from "react-redux";
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100]
  },
  subTitleTypography: {
    color: theme.palette.grey["700"],
    fontSize: "1.5rem",
  },
  searchField: {
    display: "flex",
  }
}))

const PostEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("")
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("#");
  const [mapItems, setMapItems] = useState([]);

  const inputQuery = useCallback((event) => {
    setQuery(event.target.value)
  },[setQuery])

  const getSearchBooks = (inputText) => {
    const query = inputText.replace("　","+").replace(" ","+")
    if (query === "") {
      return false
    } else {
      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const params = "?q=" + query + "&maxResults=20&Country=JP"

      axios.get(baseUrl+params)
      .then(response => {
        setSearchResults(response.data.items)
        setSearchModalOpen(true)
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  const handleSearchModalClose = useCallback(() => {
    setSearchModalOpen(false)
  }, [setSearchModalOpen]);

  const handleSaveModalOpen = useCallback(() => {
    setSaveModalOpen(true)
  }, [setSaveModalOpen]);

  const handleSaveModalClose = useCallback(() => {
    setSaveModalOpen(false)
  }, [setSaveModalOpen]);

  const handleClickSearchIcon = () => {
    getSearchBooks(query)
  };

  const handleSaveReadingPost = useCallback(() => {
    dispatch(saveReadingPost(title,url,author,image,mapItems))
  },[dispatch,title,url,author,image,mapItems])

  const handleSaveRegisteredPost = useCallback(() => {
    dispatch(saveRegisteredPost(title,url,author,image,mapItems))
  },[dispatch,title,url,author,image,mapItems])

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Container maxWidth="md">
      <Box component={Paper} p={2} className={classes.paper}>
        <Typography variant="h3" className={classes.subTitleTypography}>
          書籍登録
        </Typography>
        <Box className={classes.searchField}>
          <TextInput
            fullWidth={true} label={"タイトル / 著者名 で 検索"} multiline={false} required={true}
            onChange={inputQuery} rows={1} type={"text"}
          />
          <IconButton onClick={() => handleClickSearchIcon()}>
            <SearchIcon/>
          </IconButton>
        </Box>
        <SearchResultDialog
          open={searchModalOpen} searchResults={searchResults} handleClose={handleSearchModalClose}
          setTitle={setTitle} setAuthor={setAuthor} setImage={setImage} setUrl={setUrl}
        />
        <BookCard title={title} author={author} image={image} />
        <Box style={{height:24}}/>
        <Typography variant="h3" className={classes.subTitleTypography}>
          メンタルマップ
        </Typography>
        <SetMapArea mapItems={mapItems} setMapItems={setMapItems}  />

        <Box textAlign="center" mt={8}>
          <SecondaryButton
            label="登録!"
            onClick={handleSaveModalOpen}
          />
        </Box>
      </Box>

      <PostEditDialog
        open={saveModalOpen}
        handleClose={handleSaveModalClose}
        handleSaveReadingPost={handleSaveReadingPost}
        handleSaveRegisteredPost={handleSaveRegisteredPost}
        title="書籍を読書中アイテムとしてセットしますか？"
        contentText="読書中の切り替えは後からでも変更できます"
      />
    </Container>
  );
};

export default PostEdit