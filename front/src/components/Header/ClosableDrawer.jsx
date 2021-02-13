import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/styles";
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {signOut} from "../../reducks/users/operations";

const useStyles = makeStyles((theme)=>({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32
  }
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const {container} = props;
  const dispatch = useDispatch();

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event)
  }

  const handleSignOut = (event) => {
    dispatch(signOut());
    props.onClose(event)
  }

  const menus = [
    {func: selectMenu, label: "Yomukatsuとは?", icon: <AppsIcon/>, id: "register", value: "/"},
    {func: selectMenu, label: "アプリの使い方", icon: <AttachFileIcon/>, id: "intro", value: "/intro"},
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        />
        <div>
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e)=>menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label}/>
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={(e) => handleSignOut(e)}>
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
