import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box,Paper,Tab,Tabs } from '@material-ui/core';
import { TabPanel } from "../components/UIkit";
import { RegisteredPostsList,CompletedPostsList } from "../components/Posts"
// import { useHistory,useLocation } from "react-router-dom"

const useStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: theme.palette.grey[100]
  }
}))

const PostsList = () => {
  const classes = useStyles();
  // const history = useHistory()
  // const location = useLocation();
  const [selectedTab,setSelectedTab] = useState(0);

  const handleChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab)
  };

  console.log(selectedTab)
  return (
    <Box mb={2}>
      <Paper className={classes.root} >
        <Tabs value={selectedTab} variant="fullWidth" onChange={handleChange}>
          <Tab label="登録のみ" />
          <Tab label="完読済み" />
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
          <RegisteredPostsList />
          </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <CompletedPostsList />
        </TabPanel>
      </Paper>
    </Box>
  )
}

export default PostsList