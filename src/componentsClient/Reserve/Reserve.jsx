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



{/* <tr key={room.id}>

<td>
  <div className="hprt-block">
    <div>
      <a>
        <span>{roomType}</span>
      </a>
    </div>
  </div>
</td>
<td>
  <div className="hprt-block">
    <div className="c-occupancy-icons hprt-occupancy-occupancy-info" data-et-mouseenter="goal:hp_rt_hovering_occupancy"
    >
      <span className="c-occupancy-icons__adults" aria-hidden="true">
        <i className="bicon bicon-occupancy"></i><i className="bicon bicon-occupancy"></i>
      </span>
      <span className="bui-u-sr-only">
        Max persons: <b>{room.max_people}</b>
      </span>
    </div>
  </div>
</td>

<td>
  <div className="hprt-price-block">
    <div className="prco-wrapper bui-price-display prco-sr-default-assembly-wrapper">
      <div aria-hidden="true" data-bui-component="Popover" data-popover-position="bottom" tabindex="0" data-popover-content-id="price-area-block-id-89019" aria-describedby="_jyscaxti0">
        <div>
          <div className="bui-f-color-destructive js-strikethrough-price prco-inline-block-maker-helper bui-price-display__original" aria-hidden="true" data-strikethrough-value="2710000" data-et-mouseenter="goal:desktop_room_list_price_column_hover_over_strikethrough"
          >
            VND&nbsp;2,710,000
          </div>
        </div>
        <div>
          <div className="bui-price-display__value prco-text-nowrap-helper prco-inline-block-maker-helper prco-f-font-heading" aria-hidden="true" data-et-mouseenter="goal:desktop_room_list_price_column_hover_over_price">
            <span className="prco-valign-middle-helper">
              VND&nbsp;758,800
            </span>
            <span data-et-mouseenter="goal:desktop_room_list_price_column_hover_over_i_icon">
              <svg className="bk-icon -iconset-info_sign" fill="#6B6B6B" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M49.4 85l4.2-17.2c.7-2.7.8-3.8 0-3.8a29 29 0 0 0-8.8 3.8l-1.8-3A48 48 0 0 1 66.7 53c3.7 0 4.3 4.3 2.5 11l-5 18c-.7 3.3-.3 4.3.5 4.3a19 19 0 0 0 8.2-4L75 85c-8.6 8.7-18.2 12-21.8 12s-6.4-2.3-3.8-12zM75 36a9.2 9.2 0 0 1-9.2 9c-4.4 0-7-2.7-6.8-7a9 9 0 0 1 9.1-9c4.6 0 6.9 3.2 6.9 7z"></path><path d="M62 16a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-8a56 56 0 1 0 56 56A56 56 0 0 0 62 8z"></path></svg>
            </span>
          </div>
          <span className="bui-u-sr-only">
            Original price: VND&nbsp;2,710,000, Current price: VND&nbsp;758,800
          </span>
        </div>
      </div>
      <div id="price-area-block-id-89019" className="bui-panel bui-u-hidden prco-price-area-popover">
        Content inside the popover
      </div>
      <div className="prd-taxes-and-fees-under-price prco-inline-block-maker-helper on-hpage blockuid-145339901_363252293_2_2_0" data-cur-stage="2" data-excl-charges-raw="101679.2">
        +VND&nbsp;101,679 taxes and charges
      </div>
    </div>
  </div>
</td>

<td>
  <div className="hprt-block hprt-block-reposition-tooltip--conditions">
    <ul className="hprt-conditions-bui bui-list bui-list--text bui-list--icon bui-f-font-caption">
      <li className="bui-list__item">
        <span className="bui-list__icon" role="presentation">
          <svg className="bk-icon -streamline-food_coffee" fill="#333333" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false">
            <path d="M3.75 4.5h12a.75.75 0 0 1 .75.75v7.5a6.75 6.75 0 0 1-13.5 0v-7.5a.75.75 0 0 1 .75-.75zm0-1.5A2.25 2.25 0 0 0 1.5 5.25v7.5a8.25 8.25 0 0 0 16.5 0v-7.5A2.25 2.25 0 0 0 15.75 3h-12zm-3 18h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zm16.5-15h1.5a3.763 3.763 0 0 1 3.75 3.752 3.762 3.762 0 0 1-3.752 3.748H17.1a.75.75 0 0 0 0 1.5h1.65A5.263 5.263 0 0 0 24 9.752 5.264 5.264 0 0 0 18.752 4.5H17.25a.75.75 0 0 0 0 1.5z"></path>
          </svg>
        </span>
        <div className="bui-list__body">
          <div className="bui-list__description">
            <span className="review-score-word--highlighted">Fabulous</span> breakfast VND&nbsp;200,000
          </div>
        </div>
      </li>
      <li className="bui-list__item e2e-cancellation" data-testid="cancellation-subtitle">
        <div className="bui-group bui-group--inline bui-group--wrap-nowrap tpex-policy" data-testid="cancellation-policy" >
          <div className="bui-group__item">
            <span className="bui-icon bui-icon--small tpex-policy__icon" role="presentation">
              <svg className="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false">
                <path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path>
              </svg>
            </span>
          </div>
          <div className="bui-group__item bui-group__item--grow">
            <div className="bui-group bui-group--small">
              <div className="bui-group__item" data-testid="policy-subtitle">
                <span className="bui-text--variant-small_1 bui-text--color-constructive">
                  <strong className="bui-text--variant-strong_2" >Free cancellation</strong> anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="bui-list__item" data-testid="prepayment-subtitle">
        <div className="bui-group bui-group--inline bui-group--wrap-nowrap tpex-policy" data-testid="prepayment-policy" >
          <div className="bui-group__item" >
            <span className="bui-icon bui-icon--small tpex-policy__icon" role="presentation">
              <svg className="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false">
                <path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path>
              </svg>
            </span>
          </div>
          <div className="bui-group__item bui-group__item--grow">
            <div className="bui-group bui-group--small">
              <div className="bui-group__item" data-testid="policy-subtitle">
                <span className="bui-text--variant-small_1 bui-text--color-constructive">
                  <strong className="bui-text--variant-strong_2" >No prepayment needed</strong> - pay at the property
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</td>

<td>
  <div className="hprt-block">
    <label for="hprt_nos_select_145339901_363252293_2_2_0">
      <span className="invisible_spoken">Select rooms</span>
    </label>
    < className="hprt-nos-select js-hprt-nos-select" name="nr_rooms_145339901_363252293_2_2_0" data-component="hotel/new-rooms-table/select-rooms" data-room-id="145339901" data-block-id="145339901_363252293_2_2_0" data-is-fflex-selected="0" data-testid="select-room-trigger" id="hprt_nos_select_145339901_363252293_2_2_0" aria-describedby="room_type_id_145339901 rate_price_id_145339901_363252293_2_2_0 rate_policies_id_145339901_363252293_2_2_0">
      <option value="0">0</option>
      <option value="1">1 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;758,800)</option>
      <option value="2">2 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;1,517,600)</option>
      <option value="3">3 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;2,276,400)</option>
      <option value="4">4 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;3,035,200)</option>
      <option value="5">5 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;3,794,000)</option>
      <option value="6">6 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;4,552,800)</option>
      <option value="7">7 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;5,311,600)</option>
      <option value="8">8 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;6,070,400)</option>
      <option value="9">9 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;6,829,200)</option>
      <option value="10">10 &nbsp; &nbsp;&nbsp;&nbsp;(VND&nbsp;7,588,000)</option>
    </select>
  </div>
</td>
</tr> */}