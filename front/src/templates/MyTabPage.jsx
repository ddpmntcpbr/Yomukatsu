import React,{ useCallback,useEffect,useState } from 'react';
import {getUserId, getUserName, getUserImage} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
// import {TwitterShareButton,TwitterIcon} from "react-share";
import {push} from "connected-react-router";
import {makeStyles} from "@material-ui/styles";
import {Avatar,Box,Container,Paper,Tab,Tabs,Typography} from '@material-ui/core';
import { TabPanel,PrimaryButton,QuestionDialog } from "../components/UIkit";
import {fetchPosts} from "../reducks/posts/operations";
import {getPosts} from "../reducks/posts/selectors";
import { ReadingBooksList, CompletedBooksList } from "../components/Posts"

const useStyles = makeStyles((theme)=>({
  root: {

  }
}))

const MyTabPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const uid = getUserId(selector);
  const username = getUserName(selector);
  const image = getUserImage(selector);
  const posts = getPosts(selector);

  const [selectedTab,setSelectedTab] = useState(0);

  const handleChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab)
  };

  useEffect(()=>{
    dispatch(fetchPosts())
  },[])

  return(
    <Container maxWidth="sm" >
      <Paper>
        <Box m={1} >
          <Box display="flex" flexDirection="row" my={2} alignItems="center">
            <Avatar alt="User Icon" src={image} />
              <Typography component="h2">
                <Box fontSize="1.5rem" ml={2}>
                 {username}さんの<br/>マイページ
                </Box>
              </Typography>
          </Box>

          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="読書中" />
            <Tab label="完読リスト" />
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <ReadingBooksList />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <CompletedBooksList />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  )
}

export default MyTabPage