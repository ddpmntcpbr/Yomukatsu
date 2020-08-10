import React, { useState, useCallback} from 'react';
import { TextInput } from "../components/UIKit"
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from "@material-ui/styles";
import axios from "axios";

const useStyles = makeStyles({
  checkIcon: {
    float: "right"
  }
})

const BookSearch = () => {
  const classes = useStyles();

  const [query, setQuery] = useState("")

  const inputQuery = useCallback((event) => {
    setQuery(event.target.value)
  },[setQuery])

  const getSearchBooks = (query) => {
    if (query === "") {
      return false
    } else {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=search" + query)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  return (
    <section>
      <div className="c-section-container">
        <TextInput
          fullWidth={true} label={"タイトル / 著者名 で 検索"} multiline={false} required={true}
          onChange={inputQuery} rows={1} type={"text"}
        />
      <IconButton className={classes.checkIcon} onClick={() => getSearchBooks(query)} >
        <CheckCircleIcon/>
      </IconButton>
      </div>
    </section>
  );
};

export default BookSearch