import axios from "../setup/axios";

const fetchAllHotel = (page, limit) => {
    return axios.get(`/api/v2/hotel/read?page=${page}&limit=${limit}`);
};
const fetchDateHotel = () => {
    return axios.get(`/api/v2/hotels/read`);
}
// const fetchHotelId = () => {
//     return axios.get(`/api/v2/hotels/:id`);
// }
export {
    fetchAllHotel,
    fetchDateHotel,
   
  };
  