import apiClient from "./apiClient";

const UserService = {
    getAllUsers: async () => {
        return apiClient.get('/users').then(response => response.data)
    },
    createUser: async (user) => {
        return apiClient.post('/users/create', user).then(response => response.data)
    },
    updateUser: async (id, updates) => {
        return apiClient.put(`/users/${id}`, updates).then(response => response.data)
    },
    deleteUser: async (id) => {
        return apiClient.delete(`/users/${id}`).then(response => response.data)
    },
};

export default UserService;