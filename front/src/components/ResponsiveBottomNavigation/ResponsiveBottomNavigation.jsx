import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {useLocation} from 'react-router-dom';
import { push } from "connected-react-router";
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme)=>({
  wrapper:{
    display: 'block',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 9999,
    textAlign: 'center',
  },
  root: {
    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
  button: {
    maxWidth: '100%', // ボタンが横一杯に広がって欲しくない時はコメントアウト
  },
}));

const ResponsiveBottomNavigation = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

const currentActiveBottomNavigationAction = (pathname) => {
  switch (true) {
    case /^(?=.*reading)(?=.*posts)/.test(pathname): return 0;
    case /^(?=.*posts)(?=.*list)/.test(pathname): return 1;
    case /^(?=.*registered)(?=.*posts)/.test(pathname): return 1;
    case /^(?=.*completed)(?=.*posts)/.test(pathname): return 1;
    case /edit/.test(pathname): return 2;
    case /help/.test(pathname): return 3;
    default: return -1;
   }
  }

  return (
    <div className={classes.wrapper}>
      <BottomNavigation
        value={currentActiveBottomNavigationAction(location.pathname)}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label={"読書中"}
          className={classes.button}
          icon={<BookmarkBorderIcon/>}
          onClick={()=>dispatch(push("/reading/posts"))}
        />
        <BottomNavigationAction
          label={"登録リスト"}
          className={classes.button}
          icon={<BookmarksIcon/>}
          onClick={()=>dispatch(push("/posts/list"))}
        />
        <BottomNavigationAction
          label={"新規"}
          className={classes.button}
          icon={<AddIcon/>}
          onClick={()=>dispatch(push("/posts/edit"))}
        />
        <BottomNavigationAction
          label={"設定"}
          className={classes.button}
          icon={<SettingsIcon/>}
          onClick={()=>dispatch(push("/setting"))}
        />
      </BottomNavigation>
  </div>
  );
}

export default ResponsiveBottomNavigation