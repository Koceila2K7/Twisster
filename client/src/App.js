import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors/';
import { Splash } from './components/Spalsh/Splash';
import Login from "./components/LogIn/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './index.css'
import Home from './components/Home/Home';
import Message from './components/Messages/Messages';

import Profil from './components/Profil/Profil';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[500],
      contrastText: '#fff',

    },
    secondary: {
      main: '#f44336',
    },

  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact component={Splash} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/message" exact component={Message} />
            <Route path="/:id" component={Profil} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
