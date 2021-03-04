import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const PostEditDialog = (props) => {
  return (
    <Box>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleSaveReadingPost}
            autoFocus
          >
            さっそく読み始める
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={props.handleSaveRegisteredPost}
          >
            登録だけ行う
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostEditDialog;
