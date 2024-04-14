import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

const apiClient = axios.create({
    baseURL: 'https://cos333-tigercreatives.onrender.com', // API base URL
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiClient
