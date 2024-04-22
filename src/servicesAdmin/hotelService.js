import axios from "../setup/axios";


//hotel
const fetchAllHotels = (page, limit) => {
  return axios.get(`/api/v1/hotelAdmin/read?page=${page}&limit=${limit}`);
};
export {
  
  fetchAllHotels,
};
