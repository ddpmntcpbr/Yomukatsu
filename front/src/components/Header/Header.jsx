import React,{useCallback,useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../../assets/img/icons/logo.png";
import { useDispatch } from 'react-redux';
import {push} from "connected-react-router"
import {ClosableDrawer} from "./index"
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu"
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: theme.palette.primary.main,
  },
  toolBar: {
    margin: "0 auto",
    width: "100%"
  },
  iconButtons: {
    margin: "0 0 0 auto"
  },
  headerTypography: {
    fontSize:32
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event)=>{
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
      return;
    }
    setOpen(!open)
  },[setOpen, open]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo} alt="Logo" width="256px"
            onClick={()=>dispatch(push("/"))}
          />
          <div className={classes.iconButtons}>
            <IconButton>
              <MenuIcon onClick={(event) => handleDrawerToggle(event)}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle}/>
    </div>
  )
}

export default Header