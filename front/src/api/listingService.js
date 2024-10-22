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
        const endpoint = `/api/listing/item/${id}`

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
        const endpoint = '/api/listing/create'

        const response = await apiClient.post(endpoint, listingData);

        console.log(response.status);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const createBidListing = async (listingData) => {
    try {
        console.log(listingData)
        const endpoint = '/api/listing/create-bid'

        const response = await apiClient.post(endpoint, listingData);

        console.log(response.status);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const uploadImage = async (formData) => {
    // construct endpoint
    const endpoint = '/api/upload_image'

    const response = await apiClient.post(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    console.log(response.data)
    console.log(response.status)

    return response.data
}

export const makeBid = async (data) => {
    const endpoint = '/api/bid/place'

    try {
        const response = await apiClient.post(endpoint, data) 
        console.log(response.status);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const viewBidInfo = async (id) => {
    const endpoint = `/api/bid/get_info/${id}`

    try {
        const response = await apiClient.get(endpoint)
        console.log(response.status);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        console.error(error);

        throw error;
    }
}

export const buyNow = async (listingId) => {
    try{
        const endpoint = '/api/listing/buynow'

        const response = await apiClient.put(endpoint, {listingId});

        console.log(response.status);
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const viewSortedAuctions = async () => {
    try {
        const endpoint = '/api/listing/sorted'

        const response = await apiClient.get(endpoint)

        console.log(response.status);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
        
export const processAuction = async(listingId) => {
    try {
        const endpoint = `/api/bid/process/${listingId}`
        const response = await apiClient.get(endpoint);

        console.log(response.status);
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}