import axios from 'axios';
import Cookies from 'universal-cookie';

const setAxiosOptions = logout => {
  axios.interceptors.request.use(
    config => {
      const cookies = new Cookies();
      const token = cookies.get('token');
      if (token) {
        config.headers['auth-token'] = token;
      }
      return config;
    },
    err => {
      return err;
    }
  );

  axios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      if (err.response.status === 401) {
        logout();
      }
    }
  );
};

export default setAxiosOptions;
