import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {useLocation} from 'react-router-dom';
import { push } from "connected-react-router";
import { useDispatch } from 'react-redux';

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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    const pathIndex = ["/", "/mypage", "/posts/edit"];
    return pathIndex.indexOf(pathname)
  }

  return (
    <div className={classes.wrapper}>
      <BottomNavigation
        value={currentActiveBottomNavigationAction(location.pathname)}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label={"ホーム"}
          className={classes.button}
          icon={<HomeIcon/>}
          onClick={()=>dispatch(push("/reading/posts"))}
        />
        <BottomNavigationAction
          label={"登録中"}
          className={classes.button}
          icon={<BookmarkBorderIcon/>}
          onClick={()=>dispatch(push("/registered/posts"))}
        />
        <BottomNavigationAction
          label={"完読済"}
          className={classes.button}
          icon={<BookmarksIcon/>}
          onClick={()=>dispatch(push("/completed/posts"))}
        />
        <BottomNavigationAction
          label={"ヒント"}
          className={classes.button}
          icon={<HelpIcon/>}
          onClick={()=>dispatch(push("/help"))}
        />
        <BottomNavigationAction
          label={"アカウント"}
          className={classes.button}
          icon={<AccountBoxIcon/>}
          onClick={()=>dispatch(push("/account"))}
        />
      </BottomNavigation>
  </div>
  );
}

export default ResponsiveBottomNavigation