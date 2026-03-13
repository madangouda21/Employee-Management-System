import API from "./api";

/* Get all employees */

export const getEmployees = async () => {

  try{

    const response = await API.get("/employees");

    return response.data;

  }catch(error){

    console.error("Error fetching employees", error);

    throw error;

  }

};


/* Create employee */

export const createEmployee = async (employee) => {

  try{

    const response = await API.post("/employees", employee);

    return response.data;

  }catch(error){

    console.error("Error creating employee", error);

    throw error;

  }

};


/* Update employee */

export const updateEmployee = async (id, employee) => {

  try{

    const response = await API.put(`/employees/${id}`, employee);

    return response.data;

  }catch(error){

    console.error("Error updating employee", error);

    throw error;

  }

};


/* Delete employee */

export const deleteEmployee = async (id) => {

  try{

    const response = await API.delete(`/employees/${id}`);

    return response.data;

  }catch(error){

    console.error("Error deleting employee", error);

    throw error;

  }

};