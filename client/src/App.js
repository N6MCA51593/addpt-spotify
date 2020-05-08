import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.scss';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import AuthContext from './context/auth/authContext';
import PrivateRoute from './components/routing/PrivateRoute';
import AlertState from './context/alert/AlertState';
import LibraryState from './context/library/LibraryState';
import Footer from './components/layout/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faCog,
  faDoorOpen,
  faSyncAlt,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faEye,
  faEyeSlash,
  faTrashAlt,
  faPlus,
  faFileArchive
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticated } = authContext;
  library.add(
    faHome,
    faCog,
    faDoorOpen,
    faSyncAlt,
    faCalendarAlt,
    faEye,
    faEyeSlash,
    faTrashAlt,
    faPlus,
    faFileArchive
  );

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <AlertState>
      <LibraryState>
        <Router>
          <Fragment>
            <div className='main-grid'>
              {isAuthenticated && <Navbar />}
              <Alerts />
              <Switch>
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/settings' component={Settings} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </LibraryState>
    </AlertState>
  );
};

export default App;
