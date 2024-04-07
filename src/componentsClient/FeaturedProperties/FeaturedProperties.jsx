//import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.scss";
import fetchAllHotel from "../../servicesClient/hotelService"
import { useEffect, useState } from "react";

const FeaturedProperties = () => {
  const [listHotels, setListHotels] = useState([]);

  useEffect(() => {
    // Your effect code here
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    let response = await fetchAllHotel(2, 1);

    if (response && response.EC === 0) {
      console.log(response.DT);

      setListHotels(response.DT);

    }
  };


  const list = listHotels.length;
  return (
    <div className="fp">
    
      {listHotels && listHotels.length > 0 ? (
        <>
          {listHotels.map((item, index) => {
            return (
              <div className="fpItem" key={item.id}>
                <img
                 src = {JSON.parse(item.photos)[0]}
                 alt="loi"
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapest_price}</span>
                {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
              </div>

            );
          })}
        </>
      ) : (
        <>
          <tr>
            <td>Not Found User</td>

          </tr>
          <div>
            Số lượng người dùng: {list}
          </div>
        </>
      )}
  
    </div>
  );
};

export default FeaturedProperties;