// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// import "./Reserve1.scss";
// import useFetch from "../../hooks/useFetch";
// import { useEffect, useContext, useState } from "react";
// import { searchContext } from "../../context/searchContext";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import React from 'react';
// import _ from "lodash";
// import {
//   createNewReservation
// } from "../../servicesClient/reservationService";

// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { toast } from "react-toastify";

// const Reserve1 = ({ hotelId, userId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([0]);
//   const { data } = useFetch(`/api/v2/hotels/room/${hotelId}`);
//   const { dates } = useContext(searchContext);
//   // console.log(">> check data_+", data);

//   const defaultReservationData = {
//     userId: userId,
//     hotelId: hotelId,
//     roomCount: "",
//     totalPrice: "",
//     reservationStatus: "",
//     discountPercent: "",
//     description: "",
//     isPayment: "",
//     startDate: "",
//     endDate: "",
//     reservationDate: "",
//   };

//   const validInputsDefault = {
//     roomCount: true,
//   };

//   const [reservationData, setReservationData] = useState(defaultReservationData);
//   const [validInputs, setValidInputs] = useState(validInputsDefault);

//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   // const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
//   const startDate = new Date('2024-04-20');
//   const endDate = new Date('2024-04-23');
//   const alldates = getDatesInRange(startDate, endDate);

//   const isAvailable = (reservation) => {
//     const reservationStartDate = new Date(reservation.startDate);
//     const reservationEndDate = new Date(reservation.endDate);

//     for (let currentDate = reservationStartDate; currentDate <= reservationEndDate; currentDate.setDate(currentDate.getDate() + 1)) {
//       if (alldates.includes(currentDate.getTime())) {
//         return false; // Ngày đã được đặt phòng
//       }
//     }

//     return true; // Không có ngày nào đã được đặt phòng trong khoảng thời gian đặt phòng này
//   };




//   const history = useHistory();

//   const handleClick = async () => {

//   };
//   const groupedRooms = {};
//   data.forEach((item) => {
//     if (!groupedRooms[item.title]) {
//       groupedRooms[item.title] = [];
//     }
//     groupedRooms[item.title].push(item);
//   });


//   const handleOnChangeInput = (value, name) => {
//     let _userData = _.cloneDeep(reservationData);
//     _userData[name] = value;
//     setReservationData(_userData);
//   };


//   const handleConfirmReservation = async () => {
//     // let check = checkValidateInputs();
//     let check = true;

//     // const handleClick = () => {
//     //   console.log(">> check user click: ", user);
//     //   if (user.isAuthenticated === true) {
//     //     setOpenModal(true);
//     //     console.log("check setpen ", openModal);
//     //   } else {
//     //     history.push("/login");
//     //   }
  
//     // };
//     if (userId ) {
//       let res = await createNewReservation({ ...reservationData });

//       if (res && res.EC === 0) {
//         // props.onHide();
//         setReservationData({
//           ...defaultReservationData,

//         });
//         toast.success("reservation success");
//       } else {
//         // toast.error(res.EM);
//         // let _validInputs = _.cloneDeep(validInputsDefault);
//         // _validInputs[res.DT] = false;
//         // setValidInputs(_validInputs);
//         // toast.success("reservation unsuccess");
//         // 
//       }
//     }else{
//       history.push("/login");
//     }
//   };
//   return (
//     <div className="reserve">
//       <div className="rContainer">
//         <span>Select your rooms:</span>

//         <div>cuong ok1111</div>



//         <div className="ReserveContainer">
//           <div className="ReserveWrapper">
//             <table className="table table-bordered table-bordered-middle">
//               <thead className="custom-thead">
//                 <tr>
//                   <th className="col">Room type</th>
//                   <th className="col ">Number of guests</th>
//                   <th className="col">Today's price</th>
//                   <th className="col">Your choices</th>
//                   <th className="col">Select rooms</th>
//                 </tr>
//               </thead>
//               <tbody>

//                 {Object.keys(groupedRooms).map((roomType) => (
//                   <React.Fragment key={roomType}>
//                     {groupedRooms[roomType].map((room) => (
//                       <tr key={room.id}>

//                         <td>
//                           <div className="hprt-block">
//                             <div>
//                               <a>
//                                 <span>{roomType}</span>
//                                 <span>{reservationData.userId}</span>
//                               </a>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="hprt-block">
//                             <div className="c-occupancy-icons hprt-occupancy-occupancy-info" data-et-mouseenter="goal:hp_rt_hovering_occupancy"
//                             >
//                               <span className="c-occupancy-icons__adults" aria-hidden="true">
//                                 <i className="bicon bicon-occupancy"></i><i className="bicon bicon-occupancy"></i>
//                               </span>
//                               <span className="bui-u-sr-only">
//                                 Max persons: <b>{room.max_people}</b>
//                               </span>
//                             </div>
//                           </div>
//                         </td>

//                         <td>
//                           <div className="hprt-price-block">
//                             <div className="prco-wrapper bui-price-display prco-sr-default-assembly-wrapper">
//                               <div aria-hidden="true" data-bui-component="Popover" data-popover-position="bottom" tabindex="0" data-popover-content-id="price-area-block-id-89019" aria-describedby="_jyscaxti0">

//                                 <div>

//                                   <span className="bui-u-sr-only">
//                                     Current price: $ {room.price}
//                                   </span>
//                                 </div>
//                               </div>


//                             </div>
//                           </div>
//                         </td>

//                         <td>
//                           <div className="hprt-block hprt-block-reposition-tooltip--conditions">
//                             <ul className="hprt-conditions-bui bui-list bui-list--text bui-list--icon bui-f-font-caption">
//                               <li className="bui-list__item">
//                                 <span className="bui-list__icon" role="presentation">
//                                   <svg className="bk-icon -streamline-food_coffee" fill="#333333" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false">
//                                     <path d="M3.75 4.5h12a.75.75 0 0 1 .75.75v7.5a6.75 6.75 0 0 1-13.5 0v-7.5a.75.75 0 0 1 .75-.75zm0-1.5A2.25 2.25 0 0 0 1.5 5.25v7.5a8.25 8.25 0 0 0 16.5 0v-7.5A2.25 2.25 0 0 0 15.75 3h-12zm-3 18h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zm16.5-15h1.5a3.763 3.763 0 0 1 3.75 3.752 3.762 3.762 0 0 1-3.752 3.748H17.1a.75.75 0 0 0 0 1.5h1.65A5.263 5.263 0 0 0 24 9.752 5.264 5.264 0 0 0 18.752 4.5H17.25a.75.75 0 0 0 0 1.5z"></path>
//                                   </svg>
//                                 </span>
//                                 <div className="bui-list__body">
//                                   <div className="bui-list__description">
//                                     <span className="review-score-word--highlighted">Fabulous</span> breakfast $&nbsp;10
//                                   </div>
//                                 </div>
//                               </li>
//                               <li className="bui-list__item e2e-cancellation" data-testid="cancellation-subtitle">
//                                 <div className="bui-group bui-group--inline bui-group--wrap-nowrap tpex-policy" data-testid="cancellation-policy" >
//                                   <div className="bui-group__item">
//                                     <span className="bui-icon bui-icon--small tpex-policy__icon" role="presentation">
//                                       <svg className="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false">
//                                         <path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path>
//                                       </svg>
//                                     </span>
//                                   </div>
//                                   <div className="bui-group__item bui-group__item--grow">
//                                     <div className="bui-group bui-group--small">
//                                       <div className="bui-group__item" data-testid="policy-subtitle">
//                                         <span className="bui-text--variant-small_1 bui-text--color-constructive">
//                                           <strong className="bui-text--variant-strong_2" >Free cancellation</strong> anytime
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </li>
//                               <li className="bui-list__item" data-testid="prepayment-subtitle">
//                                 <div className="bui-group bui-group--inline bui-group--wrap-nowrap tpex-policy" data-testid="prepayment-policy" >
//                                   <div className="bui-group__item" >
//                                     <span className="bui-icon bui-icon--small tpex-policy__icon" role="presentation">
//                                       <svg className="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false">
//                                         <path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path>
//                                       </svg>
//                                     </span>
//                                   </div>
//                                   <div className="bui-group__item bui-group__item--grow">
//                                     <div className="bui-group bui-group--small">
//                                       <div className="bui-group__item" data-testid="policy-subtitle">
//                                         <span className="bui-text--variant-small_1 bui-text--color-constructive">
//                                           <strong className="bui-text--variant-strong_2" >No prepayment needed</strong> - pay at the property
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </li>
//                             </ul>
//                           </div>
//                         </td>

//                         <td>
//                           <div className="hprt-block">
//                             <label for="hprt_nos_select_145339901_363252293_2_2_0">
//                               <span className="invisible_spoken">Select rooms</span>

//                             </label>
//                             <select
//                               className="form-select"
//                               onChange={(event) => {
//                                 const selectedRoomCount = parseInt(event.target.value);
//                                 const totalPrice = selectedRoomCount * room.price;
//                                 setSelectedRooms(selectedRoomCount); // Cập nhật số phòng được chọn
//                                 handleOnChangeInput(selectedRoomCount, "roomCount"); // Gọi hàm xử lý khi số phòng được chọn thay đổi
//                                 handleOnChangeInput(totalPrice, "totalPrice"); // Gọi hàm xử lý khi tổng giá tiền thay đổi
//                               }
//                               }
//                             >

//                               <option key={0} value={0}>
//                                 0 &nbsp; &nbsp;&nbsp;&nbsp;($0)
//                               </option>
//                               {Array.from({ length: room.roomNumbers }, (_, index) => {
//                                 const roomNumber = index + 1;
//                                 return (
//                                   <option key={roomNumber} value={roomNumber}>
//                                     {roomNumber} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{roomNumber * room.price})

//                                   </option>
//                                 )
//                               })}


//                             </select>
//                           </div>
//                         </td>
//                       </tr>

//                     ))}
//                   </React.Fragment>
//                 ))}


//               </tbody>

//             </table>
//           </div>
//         </div>

//         <Button variant="primary" onClick={() => handleConfirmReservation()}>
//           Reserve Now!
      
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Reserve1;



