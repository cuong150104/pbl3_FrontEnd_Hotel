import axios from "../../setup/axios";

const fetchAllHotel = (page, limit) => {// hotel love nhất
    return axios.get(`/api/v2/hotel/read?page=${page}&limit=${limit}`);
};
const fetchDateHotel = () => {
    return axios.get(`/api/v2/hotels/read`);
}

export {
    fetchAllHotel,
    fetchDateHotel,
   
  };
  