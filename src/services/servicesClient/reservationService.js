import axios from "../setup/axios";

const createNewReservation = (userReservation) => {
    return axios.post("/api/v1/reservation/create", {
      ...userReservation,
    });
  };

export {
    createNewReservation,

  };
  