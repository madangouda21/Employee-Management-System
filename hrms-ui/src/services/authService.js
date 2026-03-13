import API from "./api";

export const loginUser = async (email, password) => {
  try {
    // In a real app, this sends data to your Spring Boot Controller
    const response = await API.post("/auth/login", { email, password });

    // We expect the backend to return { token: "..." }
    return response.data;
  } catch (error) {
    console.error("Authentication Error:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};