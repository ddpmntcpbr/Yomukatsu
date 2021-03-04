import { MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'
import React from 'react'
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { render } from 'react-snapshot'
import App from './App'
import { theme } from './assets/theme'
import { ScrollToTop } from './components/ScrollToTop'
import createStore from './reducks/store/store'
import * as serviceWorker from './serviceWorker'

const history = History.createBrowserHistory()
export const store = createStore(history)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <ScrollToTop />
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
