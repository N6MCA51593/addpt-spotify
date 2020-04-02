import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['auth-token'] = token;
    axios.interceptors.response.use(
      response => {
        return response;
      },
      function(err) {
        console.log('1123');
        return '123';
      }
    );
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
};

export default setAuthToken;
