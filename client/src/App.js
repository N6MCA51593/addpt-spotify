import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import AuthContext from './context/auth/authContext';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/' component={Home} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
