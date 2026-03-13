import API from "./api";

/* Get notifications */

export const getNotifications = async () => {

  try{

    const response = await API.get("/notifications");

    return response.data;

  }catch(error){

    console.error("Notification fetch error", error);
    throw error;

  }

};


/* Send notification */

export const createNotification = async (notification) => {

  try{

    const response = await API.post("/notifications", notification);

    return response.data;

  }catch(error){

    console.error("Notification create error", error);
    throw error;

  }

};


/* Delete notification */

export const deleteNotification = async (id) => {

  try{

    const response = await API.delete(`/notifications/${id}`);

    return response.data;

  }catch(error){

    console.error("Notification delete error", error);
    throw error;

  }

};