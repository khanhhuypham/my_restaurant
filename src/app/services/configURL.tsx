

import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";



const axiosClient = (port: number | null = null): AxiosInstance => {
    
    const headers = {"Content-Type": "application/json"}

    const client = axios.create({
        baseURL: "http://127.0.0.1:8080/api/v1/",
        headers,
        timeout: 10000,
        withCredentials: false,
        responseType:"json"
    });

    client.interceptors.request.use((config: any) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
      
        config.headers = config.headers || {};
        if (token) {
            
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    
    client.interceptors.response.use(
        (response: AxiosResponse) => { 
            return response;
        },
        (error: AxiosError) => {
            try {
                const { response } = error;
                
                if (response?.status === 401) {
                    localStorage.removeItem("ACCESS_TOKEN");
                }
                console.error(error);
            } catch (e) {
                console.error(e);
            }
            throw error;
        }
    );

    return client;
};

export default axiosClient;