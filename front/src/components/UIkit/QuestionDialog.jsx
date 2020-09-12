import React from "react";
import {  Box,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles"

const QuestionDialog = (props) => {
  return (
    <Box>
      <Dialog
        open={props.dialogOpen}
        onClose={props.handleDialogClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDialogClose} >
            OK
          </Button>
          <Button onClick={props.handleDialogClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default QuestionDialog