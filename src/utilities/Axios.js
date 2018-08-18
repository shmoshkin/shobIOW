var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

module.exports = axiosInstance;