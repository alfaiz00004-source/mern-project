import axios from "axios";

const BASE_URL = "https://mern-project-gzqy.onrender.com/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            //token expired ya unauthorized
            localStorage.removeItem("token");
            
            //redirect to login
            window.location.href = "/login";
        }
            return Promise.reject(error);
        
    }
)

export default api;
