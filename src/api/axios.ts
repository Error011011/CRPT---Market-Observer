import axios from "axios";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'accept': 'application/json'
    }
})

// key interceptor
axiosClient.interceptors.request.use((config) => {
    if(import.meta.env.VITE_API_KEY) {
        config.headers['x-cg-demo-api-key'] = import.meta.env.VITE_API_KEY;
    }

    return config
})

