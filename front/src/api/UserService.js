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