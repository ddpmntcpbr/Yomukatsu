import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { closeNotificationAction } from 'reducks/notification/actions'
import { getNotificationIsOpen, getNotificationVariant, getNotificationMessage } from 'reducks/notification/selectors'
import { NotificationSnackbar } from './index'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    height: 80,
  },
}))

const Notification = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isOpen = getNotificationIsOpen(selector)
  const variant = getNotificationVariant(selector)
  const message = getNotificationMessage(selector)

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => dispatch(closeNotificationAction())}
      className={classes.snackbar}
    >
      <NotificationSnackbar onClose={() => dispatch(closeNotificationAction())} variant={variant} message={message} />
    </Snackbar>
  )
}

export default Notification
