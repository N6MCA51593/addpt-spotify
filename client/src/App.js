import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import AuthContext from './context/auth/authContext';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import LibraryState from './context/library/LibraryState';

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <AlertState>
      <LibraryState>
        <Router>
          <Fragment>
            {isAuthenticated && <Navbar />}
            <Alerts />
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/settings' component={Settings} />
            </Switch>
          </Fragment>
        </Router>
      </LibraryState>
    </AlertState>
  );
};

export default App;
