import React, { useState, useCallback} from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box,Typography,Paper } from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import { push } from "connected-react-router";
import MailIcon from '@material-ui/icons/Mail';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { getUserName,getUserImage} from "../reducks/users/selectors"
import { signOut } from "../reducks/users/operations";
import { SecondaryButton } from "../components/UIkit";

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100],
    padding: 0
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  userImage:{
    "& img":{
      borderRadius: "50%"
    }
  },
  menuItem: {
    backgroundColor: "#fff",
    height: 60,
  }
}))

const Setting = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const userName = getUserName(selector)
  const userImage = getUserImage(selector)

  return (
    <Box mb={2}>
      <Box component={Paper} p={2} className={classes.paper}>
        <Box px={2} pt={2}>
          <Box>
            ユーザ情報
          </Box>
          <Box display="flex" alignItems="center" py={2}>
            <Box className={classes.userImage}>
              <img src={userImage} alt="userImage" width="48px" height="48px"/>
            </Box>
            <Box ml={4} fontSize="1.2rem" fontWeight="bold">
              {userName}
            </Box>
          </Box>
          <Box textAlign="center">
            <SecondaryButton
              label="ログアウト"
              onClick={()=>dispatch(signOut())}
            />
          </Box>
        </Box>
        <Box px={2} mt={4}>アプリについて</Box>
        <MenuList>
          <MenuItem className={classes.menuItem} onClick={()=>dispatch(push("/tutorial"))}>
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">アプリの使い方</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={()=>dispatch(push("/agreement"))}>
            <ListItemIcon>
              <LibraryBooksIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">利用規約</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={()=>console.log("お問い合わせ")}>
            <ListItemIcon>
              <MailIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">お問い合わせ</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={()=>window.open("https://twitter.com/ddpmntcpbr")}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">開発者 @ddpmntcpbr</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={()=>window.open("https://github.com/ddpmntcpbr/rails_react_docker")}>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Github ソースコード</Typography>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  );
};

export default Setting