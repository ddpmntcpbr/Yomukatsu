import React, { useState, useCallback} from 'react';
import { BookCard,PrimaryButton, TextInput } from "../components/UIkit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {SearchResultDialog,SetMapArea} from "../components/Posts";
import {Container,Box} from "@material-ui/core";
import {saveRegisteredPost} from "../reducks/posts/operations";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme)=>({
  titleTypography: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
    paddingBottom: theme.spacing(2),
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
  const [open, setOpen] = useState(false);
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
        console.log(response.data.items)
        setOpen(true)
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  const handleClickSearchIcon = () => {
    getSearchBooks(query)
  };

  return (
    <Container maxWidth="sm" style={{backgroundColor:"white"}}>
      <Typography variant="h2" className={classes.titleTypography}>
        POST登録
      </Typography>
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
        open={open} searchResults={searchResults} handleClose={handleClose}
        setTitle={setTitle} setAuthor={setAuthor} setImage={setImage} setUrl={setUrl}
      />
      <BookCard title={title} author={author} image={image} />
      <Box style={{height:24}}/>
      <Typography variant="h3" className={classes.subTitleTypography}>
        読書メンタルマップ
      </Typography>
      <SetMapArea mapItems={mapItems} setMapItems={setMapItems}  />
      <Box textAlign="center" mt={4}>
        <PrimaryButton
          label="POSTを登録！"
          onClick={() => dispatch(saveRegisteredPost(title,url,author,image,mapItems))} />
      </Box>
    </Container>
  );
};

export default PostEdit