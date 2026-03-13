import API from "./api";

/* Get attendance list */

export const getAttendance = async () => {

  try{

    const response = await API.get("/attendance");

    return response.data;

  }catch(error){

    console.error("Attendance fetch error", error);
    throw error;

  }

};


/* Create attendance */

export const createAttendance = async (attendance) => {

  try{

    const response = await API.post("/attendance", attendance);

    return response.data;

  }catch(error){

    console.error("Attendance create error", error);
    throw error;

  }

};


/* Update attendance */

export const updateAttendance = async (id, attendance) => {

  try{

    const response = await API.put(`/attendance/${id}`, attendance);

    return response.data;

  }catch(error){

    console.error("Attendance update error", error);
    throw error;

  }

};


/* Delete attendance */

export const deleteAttendance = async (id) => {

  try{

    const response = await API.delete(`/attendance/${id}`);

    return response.data;

  }catch(error){

    console.error("Attendance delete error", error);
    throw error;

  }

};