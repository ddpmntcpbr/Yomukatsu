import React from 'react'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import { Notification } from './components/Notification'
import { ResponsiveBottomNavigation } from './components/ResponsiveBottomNavigation';
import { Loading } from "./components/UIkit"
import "./assets/reset.css"
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { getSignedIn } from "./reducks/users/selectors"

const useStyles = makeStyles((theme)=>({
  main: {
    padding: "56px 0 60px 0",
  }
}))
const App = () => {
  const classes = useStyles();
  const selector = useSelector((state)=>state);
  const isSignedIn = getSignedIn(selector);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Loading>
        <Header />
        <main className={classes.main}>
          <Container maxWidth="sm">
            <Notification/>
            <Router />
          </Container>
        </main>
        {isSignedIn &&
          <ResponsiveBottomNavigation />
        }
      </Loading>
   </div>
  )
}

export default App;