import API from "./api";

/* Get payroll records */

export const getPayroll = async () => {

  try {

    const response = await API.get("/payroll");

    return response.data;

  } catch (error) {

    console.error("Payroll fetch error", error);
    throw error;

  }

};


/* Create payroll */

export const createPayroll = async (payroll) => {

  try {

    const response = await API.post("/payroll", payroll);

    return response.data;

  } catch (error) {

    console.error("Payroll create error", error);
    throw error;

  }

};


/* Update payroll */

export const updatePayroll = async (id, payroll) => {

  try {

    const response = await API.put(`/payroll/${id}`, payroll);

    return response.data;

  } catch (error) {

    console.error("Payroll update error", error);
    throw error;

  }

};


/* Delete payroll */

export const deletePayroll = async (id) => {

  try {

    const response = await API.delete(`/payroll/${id}`);

    return response.data;

  } catch (error) {

    console.error("Payroll delete error", error);
    throw error;

  }

};