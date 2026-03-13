import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});


API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if(token && !config.url.includes("/auth/login")){
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },

  (error) => Promise.reject(error)

);


API.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error("API Error:", error);

    if(error.response){

      if(error.response.status === 401){

        localStorage.clear();
        window.location.href = "/";

      }

      if(error.response.status === 500){

        alert("Server error occurred");

      }

    }else{

      alert("Network error. Check your connection.");

    }

    return Promise.reject(error);

  }

);

export default API;