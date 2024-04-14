import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000', // API base URL
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient