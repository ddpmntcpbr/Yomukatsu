import React  from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from "react-redux";
import {getLoadingState, getLoadingText} from "../../reducks/loading/selectors";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme)=>({
  "root": {
    alignItems: "center",
    background: "white",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    zIndex: 10,
}
}))

const Loading = ({children}) => {
    const classes = useStyles();
    const selector = useSelector((state) => state);
    const isBeingLoaded = getLoadingState(selector);
    const loadingText  = getLoadingText(selector)

    return (
        <>
            {(isBeingLoaded) && (
                <section className={classes.root}>
                    <CircularProgress/>
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </>
    );
};
export default Loading