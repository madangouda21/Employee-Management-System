import API from "./api";

/* Get audit logs */

export const getAuditLogs = async () => {

  try{

    const response = await API.get("/audit");

    return response.data;

  }catch(error){

    console.error("Audit log fetch error", error);
    throw error;

  }

};