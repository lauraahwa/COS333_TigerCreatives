import apiClient from "./apiClient";

export const login = async () => {
    try {
        const endpoint = '/login'

        const response = await apiClient.post(endpoint)

        console.log(response.status)

        return response.data
    } catch (error) {
        console.error(error)

        throw error
    }
}

export const getUserInfo = async (id) => {
    try {
        const endpoint = `api/users/get_user/${id}`

        const response = await apiClient.get(endpoint)

        console.log(response.status)
        
        return response.data
    } catch (error) {
        console.error(error)

        throw error
    }
}
