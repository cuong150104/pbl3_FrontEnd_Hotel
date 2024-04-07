import axios from "../setup/axios";

const fetchAllHotel = (page, limit) => {
    return axios.get(`/api/v1/hotel/read?page=${page}&limit=${limit}`);
};


export default fetchAllHotel;
