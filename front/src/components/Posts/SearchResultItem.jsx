import React from "react";
import {BookCard} from "../UIkit"

const SearchResult = (props) => {
  let title = ("title" in props.searchResult) ? props.searchResult.title : "No title"
  let author = ("authors" in props.searchResult) ? props.searchResult.authors[0] : "No author"
  let thumbnail = ("imageLinks" in props.searchResult) ? props.searchResult.imageLinks.thumbnail : "https://lh3.googleusercontent.com/proxy/OT0HbEcJ4HNmkzaUIptt_i9_Zu2XlKeqnT6svBmsr1ytaQewvUVBiTXAc7yfe3O_PqfEMnT8ix6g1G4CpHAvHJK3X_EkzilGE7NHhbM"

  return (
    <BookCard title={title} author={author} thumbnail={thumbnail} />
  )
}

export default SearchResult