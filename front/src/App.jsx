import React from 'react'
import Router from './Router'
import "./assets/reset.css"
import "./assets/style.css"
import {Header} from './components/Header'
import { makeStyles } from "@material-ui/styles";
import {Helmet} from 'react-helmet';

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
      <Helmet>
        <title>My Title</title>
      </Helmet>
      <Header />
      <main className={classes.root}>
        <Router />
      </main>
   </>
  )
}

export default App;