import React from 'react'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import { ResponsiveBottomNavigation } from './components/ResponsiveBottomNavigation';
import { Loading } from "./components/UIkit"
import "./assets/reset.css"
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles((theme)=>({
  main: {
    padding: "56px 0 60px 0",
  }
}))
const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Loading>
        <Header />
        <main className={classes.main}>
          <Router />
        </main>
        <ResponsiveBottomNavigation />
      </Loading>
   </div>
  )
}

export default App;