import axios from "../setup/axios";

const fetchAllHotel = (page, limit) => {
    return axios.get(`/api/v2/hotel/read?page=${page}&limit=${limit}`);
};
// const fetchDateHotel = (page, limit) => {
//     return axios.get(`/api/v1/hotel/read?page=${page}&limit=${limit}`);
// }

export default fetchAllHotel;