import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import validate from 'validate.js';

import theme from './theme';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { Provider } from "react-redux"
import store from "./js/store/index";

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};
export const styles = (theme) => ({
  '@global': {
    webkit:{
      scrollbar:{
        width: '12px',
        track:{
          shadow: "0px 0px 6px transparent",
          borderRadius: '10px',
        },
        thumb:{
          borderRadius: '10px',
          shadow: "0px 0px 6px red"
        }
      },

    }
  },
});


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
// export default (withStyles)(App);
export default App;