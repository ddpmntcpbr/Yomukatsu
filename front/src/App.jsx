import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import { ResponsiveBottomNavigation } from './components/ResponsiveBottomNavigation';
import { Loading } from "./components/UIkit"
import "./assets/reset.css"
import { Helmet } from "react-helmet";
import { fetchSharePosts } from "./reducks/sharePosts/operations";

const useStyles = makeStyles((theme)=>({
  root: {
    padding: "96px 0",
    backgroundColor: theme.palette.primary.light,
  }
}))
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("fetchSharePosts")
    dispatch(fetchSharePosts())
  },[dispatch])

  return (
    <>
      <Helmet
        title={'Yomukatsu!'}
        meta={[
          {"name": "twitter:card", "content": "summary_large_image"}
        ]}
      />
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