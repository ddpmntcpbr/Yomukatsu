import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import { TabPanel } from "../components/UIkit";
import { RegisteredPostsList, CompletedPostsList } from "../components/Posts";
import { switchTabIndexAction } from "../reducks/postListPage/actions";
import { getTabIndex } from "../reducks/postListPage/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const PostsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const tabIndex = getTabIndex(selector);

  const handleTabIndexChange = (event, newTabIndex) => {
    dispatch(switchTabIndexAction(newTabIndex));
  };

  return (
    <Box mb={2}>
      <Paper className={classes.root}>
        <Tabs
          value={tabIndex}
          variant="fullWidth"
          onChange={handleTabIndexChange}
        >
          <Tab label="登録のみ" />
          <Tab label="完読済み" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <RegisteredPostsList />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <CompletedPostsList />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PostsList;
