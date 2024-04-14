import apiClient from "./apiClient"

// items, services
export const viewListings = async (url) => {
    try{

        const endpoint = `/api/listing/${url}`

        console.log(endpoint)

        const response = await apiClient.get(endpoint)

        console.log(response.status)

        return response.data

    } catch (error) {
        console.error(error)

        throw error
    }
}

export const viewListing = async (id) => {
    try {
        console.log(id)
        const endpoint = ``

        // GET request
        const response = await apiClient.get(endpoint);

        console.log(response.status);
        console.log(response.data);
        

        return response.data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const createListing = async (listingData) => {
    try {
        console.log(listingData)
        const endpoint = '/listing/create/'

        const response = await apiClient.post(endpoint, listingData);

        console.log(response.status);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.error(error);

        throw error;
    }
}