import axios from 'axios';

const setAxiosOptions = logout => {
  axios.defaults.withCredentials = true;
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
