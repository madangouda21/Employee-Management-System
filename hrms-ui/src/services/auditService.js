import API from "./api";

const AUDIT_BASE = "/audit";

/* Get all audit logs */

export const getAuditLogs = async () => {

  try{

    const response = await API.get(`${AUDIT_BASE}`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch audit logs", error);

    throw error;

  }

};


/* Get audit by ID */

export const getAuditById = async (id) => {

  try{

    const response = await API.get(`${AUDIT_BASE}/${id}`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch audit log", error);

    throw error;

  }

};


/* Get audit logs by user */

export const getAuditByUser = async (email) => {

  try{

    const response = await API.get(`${AUDIT_BASE}/user/${email}`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch user audit logs", error);

    throw error;

  }

};


/* Get audit logs by module */

export const getAuditByModule = async (module) => {

  try{

    const response = await API.get(`${AUDIT_BASE}/module/${module}`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch module audit logs", error);

    throw error;

  }

};


/* Get today's audit logs */

export const getTodayAuditLogs = async () => {

  try{

    const response = await API.get(`${AUDIT_BASE}/today`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch today's audit logs", error);

    throw error;

  }

};