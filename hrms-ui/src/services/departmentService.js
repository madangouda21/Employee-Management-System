import API from "./api";

export const getDepartments = async () => {

  try{

    const response = await API.get("/departments");

    return response.data;

  }catch(error){

    console.error("Error fetching departments", error);
    throw error;

  }

};

export const createDepartment = async (department) => {

  try{

    const response = await API.post("/departments", department);

    return response.data;

  }catch(error){

    console.error("Error creating department", error);
    throw error;

  }

};

export const updateDepartment = async (id, department) => {

  try{

    const response = await API.put(`/departments/${id}`, department);

    return response.data;

  }catch(error){

    console.error("Error updating department", error);
    throw error;

  }

};

export const deleteDepartment = async (id) => {

  try{

    const response = await API.delete(`/departments/${id}`);

    return response.data;

  }catch(error){

    console.error("Error deleting department", error);
    throw error;

  }

};