import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
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
    zIndex: 1000,
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
          onClick={()=>dispatch(push("/"))}
        />
        <BottomNavigationAction
          label={"マイページ"}
          className={classes.button}
          icon={<InfoIcon/>}
          onClick={()=>dispatch(push("/mypage"))}
        />
        <BottomNavigationAction
          label={"新規登録"}
          className={classes.button}
          icon={<LocationOnIcon/>}
          onClick={()=>dispatch(push("/posts/edit"))}
        />
      </BottomNavigation>
  </div>
  );
}

export default ResponsiveBottomNavigation