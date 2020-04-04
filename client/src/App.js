import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Alerts from './components/layout/Alerts';
import AuthContext from './context/auth/authContext';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import LibraryState from './context/library/LibraryState';

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, logout } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <AlertState>
      <LibraryState>
        <Router>
          <Fragment>
            <Alerts />
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/settings' component={Settings} />
            </Switch>
            <Link to='/settings'>Settings</Link>
            <Link to='/'>Library</Link>
            <Link to='/login'>Login</Link>
            <button onClick={logout}>Log out</button>
          </Fragment>
        </Router>
      </LibraryState>
    </AlertState>
  );
};

export default App;
