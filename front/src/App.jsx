import React from 'react'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import { ResponsiveBottomNavigation } from './components/ResponsiveBottomNavigation';
import { Loading } from "./components/UIkit"
import "./assets/reset.css"
// import "./assets/style.css"

const useStyles = makeStyles((theme)=>({
  root: {
    padding: "96px 0",
    backgroundColor: theme.palette.primary.light,
  }
}))
const App = () => {
  const classes = useStyles();

  return (
    <>
      <Loading>
        <Header />
        <main className={classes.root}>
          <Router />
        </main>
        <ResponsiveBottomNavigation />
      </Loading>
   </>
  )
}

export default App;