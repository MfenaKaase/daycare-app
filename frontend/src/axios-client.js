import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // console.log(error);
    try {
        const {response} = error;
        if (response.status == 401 || response.status == 403) {
            sessionStorage.removeItem('ACCESS_TOKEN')
        }
    } catch (e) {
        // console.error(e);
    }

    throw error;
})

export default axiosClient;