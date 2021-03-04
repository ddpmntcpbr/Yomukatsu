import React, { useCallback, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { QuestionDialog } from "../UIkit";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  itemContent: {
    fontSize: "0.8rem",
    padding: theme.spacing(1),
  },
  checkIcon: {
    float: "right",
  },
  iconCell: {
    fontSize: "1rem",
  },
  inputPostItemArea: {
    display: "flex",
    padding: theme.spacing(1),
  },
  inputButton: {
    display: "flex",
    justifyContent: "space-between",
  },
  menu: {
    padding: 0,
  },
  menuItem: {
    padding: theme.spacing(1),
  },
  menuItemTypography: {
    fontSize: "0.8rem",
    marginLeft: theme.spacing(1),
  },
}));

const EditPostItem = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletePostItemDialogOpen, setDeletePostItemDialogOpen] = useState(
    false
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePostItemDialogOpen = useCallback(() => {
    setDeletePostItemDialogOpen(true);
  }, [setDeletePostItemDialogOpen]);

  const handleDeletePostItemDialogClose = useCallback(() => {
    setDeletePostItemDialogOpen(false);
  }, [setDeletePostItemDialogOpen]);

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item xs={11}>
          <Paper variant="outlined">
            <Typography component="p" className={classes.itemContent}>
              {props.item.content}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Box textAlign="center" p={0}>
            <IconButton onClick={handleClick} style={{ padding: 0 }}>
              <MoreVertIcon className={classes.iconCell} />
            </IconButton>
            <Menu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              <MenuItem
                onClick={() => {
                  props.editPostItem(props.i, props.item.content);
                  handleClose();
                }}
                className={classes.menuItem}
              >
                <Box display="flex" justifyContent="center">
                  <EditIcon fontSize="small" />
                  <Typography className={classes.menuItemTypography}>
                    編集
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeletePostItemDialogOpen();
                  handleClose();
                }}
                className={classes.menuItem}
              >
                <Box display="flex" justifyContent="center">
                  <DeleteIcon fontSize="small" />
                  <Typography className={classes.menuItemTypography}>
                    削除
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>

      <QuestionDialog
        open={deletePostItemDialogOpen}
        handleClose={handleDeletePostItemDialogClose}
        handleEvent={() => {
          props.deletePostItem(props.i);
          handleDeletePostItemDialogClose();
        }}
        title="本当に削除しますか？"
      />
    </div>
  );
};

export default EditPostItem;
