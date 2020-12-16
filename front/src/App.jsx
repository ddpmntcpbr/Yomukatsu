import React from 'react'
import Router from './Router'
import { makeStyles } from "@material-ui/styles";
import { Header } from './components/Header'
import { ResponsiveBottomNavigation } from './components/ResponsiveBottomNavigation';
import { Loading } from "./components/UIkit"
import "./assets/reset.css"
// import "./assets/style.css"
import { Helmet } from "react-helmet";
// import { getPosts } from "./reducks/posts/selectors"

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
      <Helmet
        title={'Yomukatsu!'}
        meta={[
          {"name": "twitter:card", "content": "summary_large_image"},
          {"name": "twitter:site", "content": "twitter:siteを入力します"},
          {"name": "twitter:title", "content": "twitter:titleを入力します"},
          {"name": "twitter:description", "content": "twitter:descriptionを入力します"},
          {"property": "og:title", "content": "og:titleを入力します"},
          {"property": "og:type", "content": "website"},
          {"property": "og:image", "content": "https://books.google.co.jp/books/content?id=Nvx1oAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71IuQnf7vY4PgAbAdBijMB7ygXMuyIU4sCmomOirtUMFFnSO3Yf7FjD2dOeklnL2K-dI_X6zYnK4VZPya97rXQgJanXMhSycoUtdD4wJxuhPDQsDLk6yFINOyQkr9dZpDkED0ZQ"},
          {"property": "og:url", "content": process.env.REACT_APP_BASE_URL}
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