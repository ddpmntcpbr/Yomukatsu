import React, { useState, useCallback} from 'react';
import { TextInput } from "../components/UIkit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {SearchResultDialog} from "../components/Posts"

const useStyles = makeStyles({
  searchField: {
    display: "flex",
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
    console.log("getSearchBooks")
    if (query === "") {
      return false
    } else {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + query)
      .then(response => {
        console.log("?response ",response.data.items);
        setSearchResults(response.data.items)
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
    // console.log("handleClickSearchIconのquery",query)
    getSearchBooks(query)
  };

  console.log("?:return ",searchResults)
  return (
    <section>
      <h2 className="u-text__headline u-text-center">POST登録</h2>
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
        <SearchResultDialog
          open={open} searchResults={searchResults} handleClose={handleClose}
          setTitle={setTitle} setAuthor={setAuthor} setThumbnail={setThumbnail}
        />
        <div>
          {title}
        </div>
        <div>
          {author}
        </div>
        <div>
          <img src={thumbnail} alt="サムネイル"/>
        </div>
      </div>
    </section>
  );
};

export default PostEdit