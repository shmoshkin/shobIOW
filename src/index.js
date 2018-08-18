import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducer from './reducers'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk' 
import { createStore, applyMiddleware } from 'redux' 
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import 'moment/locale/he';

// Make sure all dates will be in hebrew
let moment = require('moment');
moment.locale('he');

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      light: '#E3F2FD',
      main: '#2196F3',
      dark: '#0D47A1',
      contrastText: '#FAFAFA',
    },
    secondary: {
      light: '#ff7961',
      main: '#FAFAFA',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const store = createStore(reducer, {}, applyMiddleware(thunk))

const RootApp = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store = {store}>
      <MuiPickersUtilsProvider utils={MomentUtils} locale="he">
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </MuiPickersUtilsProvider>
      </Provider>
    </MuiThemeProvider>
  </JssProvider>
);

ReactDOM.render(
    <RootApp />, document.getElementById("root")
);