import API from "./api";

/* Get performance reviews */

export const getPerformance = async () => {

  try{

    const response = await API.get("/performance");

    return response.data;

  }catch(error){

    console.error("Performance fetch error", error);
    throw error;

  }

};


/* Create performance review */

export const createPerformance = async (review) => {

  try{

    const response = await API.post("/performance", review);

    return response.data;

  }catch(error){

    console.error("Performance create error", error);
    throw error;

  }

};


/* Update review */

export const updatePerformance = async (id, review) => {

  try{

    const response = await API.put(`/performance/${id}`, review);

    return response.data;

  }catch(error){

    console.error("Performance update error", error);
    throw error;

  }

};


/* Delete review */

export const deletePerformance = async (id) => {

  try{

    const response = await API.delete(`/performance/${id}`);

    return response.data;

  }catch(error){

    console.error("Performance delete error", error);
    throw error;

  }

};