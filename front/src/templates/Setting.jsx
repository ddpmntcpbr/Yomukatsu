import { Box, Typography, Paper } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import GitHubIcon from '@material-ui/icons/GitHub'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import MailIcon from '@material-ui/icons/Mail'
import TwitterIcon from '@material-ui/icons/Twitter'
import { makeStyles } from '@material-ui/styles'
import { FormDialog } from 'components/Setting'
import { SecondaryButton, QuestionDialog } from 'components/UIkit'
import { push } from 'connected-react-router'
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationAction } from 'reducks/notification/actions'
import { deleteUser } from 'reducks/users/operations'
import { signOut } from 'reducks/users/operations'
import { getUserName, getUserImage, getUserNickname } from 'reducks/users/selectors'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.grey[100],
    padding: 0,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  userImage: {
    '& img': {
      borderRadius: '50%',
    },
  },
  menuItem: {
    backgroundColor: '#fff',
    height: 60,
  },
}))

const Setting = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const userName = getUserName(selector)
  const userImage = getUserImage(selector)
  const userNickname = getUserNickname(selector)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [userDeleteDialogOpen, setUserDeleteDialogOpen] = useState(false)

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true)
  }

  const handleFormDialogClose = useCallback(() => {
    setFormDialogOpen(false)
  }, [setFormDialogOpen])

  const handleUserDeleteDialogOpen = () => {
    setUserDeleteDialogOpen(true)
  }

  const handleUserDeleteDialogClose = useCallback(() => {
    setUserDeleteDialogOpen(false)
  }, [setUserDeleteDialogOpen])

  const handleUserDelete = useCallback(() => {
    dispatch(deleteUser())
    setUserDeleteDialogOpen(false)
  }, [dispatch, setUserDeleteDialogOpen])

  return (
    <Box mb={2}>
      <Box component={Paper} p={2} className={classes.paper}>
        <Box px={2} pt={2}>
          <Box>ユーザ情報</Box>
          <Box display="flex" alignItems="center" py={2}>
            <Box className={classes.userImage}>
              <img src={userImage} alt="userImage" width="48px" height="48px" />
            </Box>
            <Box ml={4} fontSize="1.0rem" fontWeight="bold">
              {userName + '@' + userNickname}
            </Box>
          </Box>
          <Box textAlign="center">
            <SecondaryButton label="ログアウト" onClick={() => dispatch(signOut())} />
          </Box>
        </Box>
        <Box px={2} mt={4}>
          アプリについて
        </Box>
        <MenuList>
          <MenuItem className={classes.menuItem} onClick={() => dispatch(push('/intro'))}>
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">アプリの使い方</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={() => dispatch(push('/agreement'))}>
            <ListItemIcon>
              <LibraryBooksIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">利用規約</Typography>
          </MenuItem>

          {userName === 'ゲストユーザー' && userNickname === 'guest_user' ? (
            <MenuItem
              className={classes.menuItem}
              onClick={() => dispatch(setNotificationAction('error', 'ゲストユーザーではご利用できません'))}
            >
              <ListItemIcon>
                <MailIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">お問い合わせ</Typography>
            </MenuItem>
          ) : (
            <MenuItem className={classes.menuItem} onClick={() => handleFormDialogOpen()}>
              <ListItemIcon>
                <MailIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">お問い合わせ</Typography>
            </MenuItem>
          )}
          <MenuItem className={classes.menuItem} onClick={() => window.open('https://twitter.com/ddpmntcpbr')}>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">開発者 @ddpmntcpbr</Typography>
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => window.open('https://github.com/ddpmntcpbr/rails_react_docker')}
          >
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Github ソースコード</Typography>
          </MenuItem>
          {userName === 'ゲストユーザー' && userNickname === 'guest_user' ? (
            <MenuItem
              className={classes.menuItem}
              onClick={() => dispatch(setNotificationAction('error', 'ゲストユーザーではご利用できません'))}
            >
              <ListItemIcon>
                <ClearAllIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Yomukatsuから退会</Typography>
            </MenuItem>
          ) : (
            <MenuItem className={classes.menuItem} onClick={() => handleUserDeleteDialogOpen()}>
              <ListItemIcon>
                <ClearAllIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Yomukatsuから退会</Typography>
            </MenuItem>
          )}
        </MenuList>
      </Box>
      {!(userName === 'ゲストユーザー' && userNickname === 'guest_user') && (
        <div>
          <FormDialog open={formDialogOpen} handleClose={handleFormDialogClose} />
          <QuestionDialog
            open={userDeleteDialogOpen}
            handleEvent={handleUserDelete}
            handleClose={handleUserDeleteDialogClose}
            title="本当に退会しますか？"
            contentText="一度退会をしますと、登録した書籍情報も全て削除されます"
          />
        </div>
      )}
    </Box>
  )
}

export default Setting
