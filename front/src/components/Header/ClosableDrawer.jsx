import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'
import AppsIcon from '@material-ui/icons/Apps'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { signOut } from '../../reducks/users/operations'
import { getSignedIn } from '../../reducks/users/selectors'
import { useSelector } from 'react-redux'
import { signIn, signInGuestUser } from '../../reducks/users/operations'
import TwitterIcon from '@material-ui/icons/Twitter'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}))

const ClosableDrawer = (props) => {
  const classes = useStyles()
  const { container } = props
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getSignedIn(selector)

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event)
  }

  const handlePushMypage = (event) => {
    dispatch(push('reading/posts'))
    props.onClose(event)
  }

  const handleSignOut = (event) => {
    dispatch(signOut())
    props.onClose(event)
  }

  const handleTwitterSignIn = (event) => {
    dispatch(signIn())
    props.onClose(event)
  }

  const handleGuestSignIn = (event) => {
    dispatch(signInGuestUser())
    props.onClose(event)
  }

  const menus = [
    {
      func: selectMenu,
      label: 'Yomukatsuとは?',
      icon: <AppsIcon />,
      id: 'register',
      value: '/',
    },
    {
      func: selectMenu,
      label: 'アプリの使い方',
      icon: <AttachFileIcon />,
      id: 'intro',
      value: '/intro',
    },
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onClose={(e) => props.onClose(e)} onKeyDown={(e) => props.onClose(e)} />
        <div>
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            {isSignedIn ? (
              <div>
                <ListItem button key="mypage" onClick={(e) => handlePushMypage(e)}>
                  <ListItemIcon>
                    <BookmarkBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary={'マイページへ移動'} />
                </ListItem>
                <ListItem button key="logout" onClick={(e) => handleSignOut(e)}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={'ログアウト'} />
                </ListItem>
              </div>
            ) : (
              <div>
                <ListItem button key="twitter_signin" onClick={(e) => handleTwitterSignIn(e)}>
                  <ListItemIcon>
                    <TwitterIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Twitter ログイン'} />
                </ListItem>
                <ListItem button key="guest_signin" onClick={(e) => handleGuestSignIn(e)}>
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText primary={'ゲスト ログイン'} />
                </ListItem>
              </div>
            )}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
