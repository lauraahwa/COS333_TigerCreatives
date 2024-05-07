import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'https://cos333-tigercreatives.onrender.com', // API base URL
    // baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient

apiClient.interceptors.request.use(config => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    // If a token is found, set the Authorization header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    }, error => {
    // Do something with request error
    return Promise.reject(error);
})

apiClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
