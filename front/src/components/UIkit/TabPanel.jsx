import React from "react";
import { Box } from "@material-ui/core";

const TabPanel = (props) => {
  return (
    <div role="tabpanel" hidden={props.value !== props.index}>
      {props.value === props.index && <Box py={3}>{props.children}</Box>}
    </div>
  );
};

export default TabPanel;
