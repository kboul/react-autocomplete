import axios from 'axios';

// define app API url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        console.log('Logging the error ', error);
    }
    return Promise.reject(error);
});

export default {
    get: axios.get
};
