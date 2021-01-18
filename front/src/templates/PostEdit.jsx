import React, { useState, useCallback} from 'react';
import { BookCard, SecondaryButton,TextInput } from "../components/UIkit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import {PostEditDialog,SearchResultDialog,SetMapArea} from "../components/Posts";
import {Box,Grid,Typography,Paper} from "@material-ui/core";
import {saveReadingPost,saveRegisteredPost} from "../reducks/posts/operations";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100]
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
      .catch((error) => {
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

  return (
    <div>
      <Box component={Paper} p={2} className={classes.paper}>
        <Typography component="h1">
          <Box fontWeight="fontWeightBold">
            書籍登録
          </Box>
        </Typography>
        <Box className={classes.searchField} mb={2}>
          <Grid container>
            <Grid item xs={10}>
              <TextInput
                fullWidth={true} label={"タイトル / 著者名 で 検索"} multiline={false} required={true}
                onChange={inputQuery} rows={1} type={"text"}
              />
            </Grid>
            <Grid item xs={2}>
              <Box  textAlign="center">
                <IconButton onClick={() => handleClickSearchIcon()}>
                  <SearchIcon/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <SearchResultDialog
          open={searchModalOpen} searchResults={searchResults} handleClose={handleSearchModalClose}
          setTitle={setTitle} setAuthor={setAuthor} setImage={setImage} setUrl={setUrl}
        />

        {title ? (
          <BookCard
            title={title}
            author={author}
            image={image}
          />
        ):(
          <Typography>
            登録したい書籍を検索してください。
          </Typography>
        )}


        <Box style={{height:24}}/>
        <Typography component="h2">
          <Box fontWeight="fontWeightBold">
            メンタルマップ
          </Box>
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
        title="さっそく読み始めますか？"
        contentText="読書中の設定は後からでも変更できます"
      />
    </div>
  );
};

export default PostEdit