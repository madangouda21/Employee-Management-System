import API from "./api";

/* Get all leave requests */

export const getLeaves = async () => {

  try{

    const response = await API.get("/leaves");

    return response.data;

  }catch(error){

    console.error("Leave fetch error", error);
    throw error;

  }

};


/* Create leave */

export const createLeave = async (leave) => {

  try{

    const response = await API.post("/leaves", leave);

    return response.data;

  }catch(error){

    console.error("Leave create error", error);
    throw error;

  }

};


/* Update leave */

export const updateLeave = async (id, leave) => {

  try{

    const response = await API.put(`/leaves/${id}`, leave);

    return response.data;

  }catch(error){

    console.error("Leave update error", error);
    throw error;

  }

};


/* Delete leave */

export const deleteLeave = async (id) => {

  try{

    const response = await API.delete(`/leaves/${id}`);

    return response.data;

  }catch(error){

    console.error("Leave delete error", error);
    throw error;

  }

};