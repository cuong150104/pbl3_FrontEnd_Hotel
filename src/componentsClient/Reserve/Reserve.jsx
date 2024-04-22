import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.scss";
import useFetch from "../../hooks/useFetch";
import { useEffect, useContext, useState } from "react";
import { searchContext } from "../../context/searchContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/api/v2/hotels/room/${hotelId}`);
  const { dates } = useContext(searchContext);
  // console.log(">> check data_+", data);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const startDate = new Date('2024-04-20');
  const endDate = new Date('2024-04-23');
  const alldates = getDatesInRange(startDate, endDate);
  
  const isAvailable = (reservation) => {
    const reservationStartDate = new Date(reservation.startDate);
    const reservationEndDate = new Date(reservation.endDate);
  
    for (let currentDate = reservationStartDate; currentDate <= reservationEndDate; currentDate.setDate(currentDate.getDate() + 1)) {
      if (alldates.includes(currentDate.getTime())) {
        return false; // Ngày đã được đặt phòng
      }
    }
  
    return true; // Không có ngày nào đã được đặt phòng trong khoảng thời gian đặt phòng này
  };
  

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const history = useHistory();

  const handleClick = async () => {

  };
  const groupedRooms = {};
  data.forEach((item) => {
    if (!groupedRooms[item.title]) {
      groupedRooms[item.title] = [];
    }
    groupedRooms[item.title].push(item);
  });

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>

        <div>cuong</div>
        <div>
    {Object.keys(groupedRooms).map((roomType) => (
      <div key={roomType}>
        <h4>{roomType}</h4>
        {groupedRooms[roomType].map((room) => (
          <div className="rItem" key={room.id}>
            <div className="rItemInfo">
              <div className="rDesc">{room.description}</div>
              <div className="rMax">
                Max people: <b>{room.max_people}</b>
              </div>
              <div className="rPrice">{room.price}</div>
            </div>
            <div className="rSelectRooms">
              <input
                type="checkbox"
                value={room.id}
                onChange={handleSelect}
                //disabled={!isAvailable(room)}
                // {data.reservation.map((item) => )}

              />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
    

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;



// {data.map((item) => (
//   <div className="rItem" key={item.id}>
//     <div className="rItemInfo">
//       <div className="rTitle">{item.title}</div>
//       <div className="rDesc">{item.description}</div>
//       <div className="rMax">
//         Max people: <b>{item.max_people}</b>
//       </div>
//       <div className="rPrice">{item.price}</div>
//     </div>
//     <div className="rSelectRooms">
  
//       <input
//         type="checkbox"
//         value={data.id}
//         onChange={handleSelect}
//         disabled={!isAvailable(data)}
//       />
//     </div>
//   </div>
// ))}