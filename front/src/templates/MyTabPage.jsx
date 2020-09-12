import React,{ useCallback,useEffect,useState } from 'react';
import {getUserId, getUserName, getUserImage} from '../reducks/users/selectors';
import {useSelector, useDispatch} from 'react-redux'
import {TwitterShareButton,TwitterIcon} from "react-share";
import {push} from "connected-react-router";
import {makeStyles} from "@material-ui/styles";
import {Avatar,Box,Container,Paper,Tab,Tabs,Typography} from '@material-ui/core';
import { TabPanel,PrimaryButton,QuestionDialog } from "../components/UIkit";
import {fetchPosts} from "../reducks/posts/operations";
import {getPosts} from "../reducks/posts/selectors";
import { ReadingBookDetail, CompletedBooksList } from "../components/Posts"


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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab)
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen]);


  useEffect(()=>{
    dispatch(fetchPosts())
  },[])

  return(
    <Container maxWidth="sm" >
      <Paper>
        <Box display="flex" flexDirection="row" >
          <Avatar alt="User Icon" src={image} />
          <Typography variant="h6" component="h2">
            {username}さんのマイページ
          </Typography>
        </Box>
      </Paper>

      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="読書中" />
        <Tab label="完読リスト" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <ReadingBookDetail />
        <PrimaryButton
          label="完読した！"
          onClick={()=>handleDialogOpen()}
        />
        <QuestionDialog
          open={dialogOpen}
          handleDialogClose={handleDialogClose}
          title="完読にしてよろしいですか？"
          contentText="一度完読にしたアイテムは、元には戻せません"
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <CompletedBooksList />
      </TabPanel>
    </Container>
  )
}

export default MyTabPage