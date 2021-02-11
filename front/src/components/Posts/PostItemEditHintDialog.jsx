import  React  from  "react";
import  { Dialog,
          DialogContent,
          DialogContentText,
          DialogTitle
        } from  '@material-ui/core';

const PostItemEditHintDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>ヒント</DialogTitle>
      <DialogContent>
        <DialogContentText>
          てすと
        </DialogContentText>
      </DialogContent>
    </Dialog>
)
}

export default PostItemEditHintDialog