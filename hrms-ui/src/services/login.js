import API from "./api";



export const loginUser = async (email, password) => {

  try {

    const response = await API.post("/auth/login", {
      email: email,
      password: password
    });

    const data = response.data;

    if (data && data.token) {

      /* Store JWT token */
      localStorage.setItem("token", data.token);

      /* Store user info (optional) */
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userRole", data.role);

    }

    return data;

  } catch (error) {

    console.error("Login API Error:", error);

    throw error;

  }

};




export const logoutUser = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");

};




export const getToken = () => {

  return localStorage.getItem("token");

};




export const isAuthenticated = () => {

  const token = localStorage.getItem("token");

  return token !== null;

};