import React from 'react'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import "./assets/reset.css"
import "./assets/style.css"

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
      <Header />
      <main className={classes.root}>
        <Router />
      </main>
   </>
  )
}

export default App;