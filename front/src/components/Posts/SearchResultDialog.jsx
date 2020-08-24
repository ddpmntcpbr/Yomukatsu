import React, {useState, useCallback,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SearchResultItem} from "./";

const SearchResultDialog = (props) => {
  console.log("props",props)
  console.log("props.searchResults",props.searchResults)

  const setBookInfo = (searchResult) => {
    console.log("setBookInfo")
    let title = ("title" in searchResult) ? searchResult.title : "No title"
    let author = ("authors" in searchResult) ? searchResult.authors[0] : "No author"
    let thumbnail = ("imageLinks" in searchResult) ? searchResult.imageLinks.thumbnail : "https://lh3.googleusercontent.com/proxy/OT0HbEcJ4HNmkzaUIptt_i9_Zu2XlKeqnT6svBmsr1ytaQewvUVBiTXAc7yfe3O_PqfEMnT8ix6g1G4CpHAvHJK3X_EkzilGE7NHhbM"

    props.setTitle(title)
    props.setAuthor(author)
    props.setThumbnail(thumbnail)
    props.handleClose()
  };

  // useEffect(()=>{
  //   console.log("useEffect")
  // },[])

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"検索結果"}</DialogTitle>
      <DialogContent>
        {props.searchResults.length > 0 &&(
          props.searchResults.map(searchResult => (
            <div key={searchResult.id} onClick={()=>setBookInfo(searchResult.volumeInfo)}>
              <SearchResultItem
                searchResult={searchResult.volumeInfo}
              />
            </div>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchResultDialog