import React, { useState, useCallback} from 'react';
import { PrimaryButton, TextInput } from "../components/UIKit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {SearchResultDialog} from "../components/Posts"

const useStyles = makeStyles({
  // checkIcon: {
  //   float: "right"
  // },
  searchField: {
    // alignItems: "center",
    display: "flex",
    // marginLeft: 32
  }
})

const PostEdit = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const inputQuery = useCallback((event) => {
    setQuery(event.target.value)
  },[setQuery])

  const getSearchBooks = (query) => {
    if (query === "") {
      return false
    } else {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + query)
      .then(response => {
        // console.log(response.data.items);
        setSearchResults(response.data.items)
        // setTitle(response.data.items.volumeInfo.title)
        // setAuthor(response.data.items.volumeInfo.authors)
        // setThumbnail(response.data.items.volumeInfo.imageLinks.thumbnail)
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  // const handleClickOpen = () => {
  //   setOpen(true)
  // };

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  const handleClickSearchIcon = () => {
    // console.log("handleClickSearchIconのquery",query)
    getSearchBooks(query)

    setOpen(true)
  };

  return (
    <section>
      <h2 className="u-text__headline u-text-center">ヨムカツの登録</h2>
      <div className="c-section-container">
        <Typography>
          書籍登録
        </Typography>
        <div className={classes.searchField}>
          <TextInput
            fullWidth={true} label={"タイトル / 著者名 で 検索"} multiline={false} required={true}
            onChange={inputQuery} rows={1} type={"text"}
          />
          <IconButton onClick={() => handleClickSearchIcon()}>
            <SearchIcon/>
          </IconButton>
        </div>
        <SearchResultDialog open={open} searchResults={searchResults} handleClose={handleClose} setTitle={setTitle} setAuthor={setAuthor} setThumbnail={setThumbnail}/>
        <div>
          {title}
        </div>
      </div>
    </section>
  );
};

export default PostEdit