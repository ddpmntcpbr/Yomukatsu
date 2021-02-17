import React from "react"
import classNames from 'classnames';
import { makeStyles } from "@material-ui/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import indigo from '@material-ui/core/colors/indigo';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme)=>({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[700],
  },
  info: {
    backgroundColor: indigo[700],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const NotificationSnackbar = (props) => {
  // const { classes, className, message, onClose, variant, ...other } = props;
  const classes = useStyles()
  const Icon = variantIcon[props.variant];

  
  return (
    <SnackbarContent
      className={classes[props.variant]}
      aria-describedby="client-snackbar"
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {props.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  )
}
export default NotificationSnackbar