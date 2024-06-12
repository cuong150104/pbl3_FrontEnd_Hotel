// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// import "./Reserve.scss";
// import useFetch from "../../../hooks/useFetch";
// import { useEffect, useContext, useState } from "react";
// import { searchContext } from "../../../context/searchContext";
// import axios from "axios";
// import { useHistory, Link } from "react-router-dom";

// import React from 'react';
// // import _ from "lodash";
// import {
//   createNewReservation
// } from "../../../servises/reservationService"
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { toast } from "react-toastify";
// import _, { cloneDeep } from "lodash";


// import { fetchRoomTypeByHotel } from "../../../servises/room_TypeServises";
// import { fetchRoom_By_RoomType } from "../../../servises/roomServises";
// import { getMaxIdReservation } from "../../../servises/reservationService";
// import { createNewReservationDetail } from "../../../servises/reservationDetailService";

// const Reserve1 = ({ hotelId, userId, email }) => {
//   const { data } = useFetch(`/api/v1/hotels/room/${hotelId}`);
//   const { dates } = useContext(searchContext);

//   // console.log("check dateeeee: ", dates);
//   // console.log("check dateeeee  start: ", dates[0]?.startDate);
//   // console.log("check dateeeee  start: ", dates[0].endDate);




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
//   const [startDate1, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [alldates, setAllDates] = useState([]);




//   useEffect(() => {
//     saveStartDate();
//     loadStartDate();
//   }, []);
//   //

//   useEffect(() => {
//     getRoomTypeByHotel();
//     handleSelectRooms();
//     getRoom_By_TypeRoom();

//   }, []);

//   const [ListRoomTypeByHotel, setListRoomTypeByHotel] = useState([]);
//   const [roomTypeId, setRoomTypeId] = useState([0]);
//   // const [selectRoom, setSelectRoom] = useState("");
//   // const [selectedRooms, setSelectedRooms] = useState([]);


//   const getRoomTypeByHotel = async () => {
//     let data = await fetchRoomTypeByHotel(hotelId);
//     if (data && +data.EC === 0) {

//       setListRoomTypeByHotel(data.DT);
//       // setRoomTypeId(data.DT.id);
//     }
//   }


//   const [Room_By_TypeRoom, setRoom_By_TypeRoom] = useState([]);
//   const getRoom_By_TypeRoom = async (roomTypeId) => {
//     let data = await fetchRoom_By_RoomType(1);
//     if (data && +data.EC === 0) {
//       setRoom_By_TypeRoom(data.DT);

//       return data.DT;
//     }
//     return null;
//   }





//   // const defaultReservationDetailData = {
//   //   roomId: "",
//   //   selectedRooms: "",
//   //   PriceByRoom: "",
//   // };

//   const selectRooms = {
//     roomId: "",
//     roomTypeId: "",
//     selectedRooms: 0,
//     PriceByRoom: "",
//     isSelected: false,
//     typeRoom: false,
//     countRoom: "",
//     price: "",
//   };

//   // const [reservationDetailData, setReservationDetailData] = useState(defaultReservationDetailData);
//   const [arrSelect, setArrSelect] = useState([]);
//   const handleSelectRooms = () => {
//     for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
//       setArrSelect(prevArr => [...prevArr, selectRooms]); // Sửa đổi ở đây, sử dụng `push` để thêm phần tử vào mảng
//     }

//     let newArrSelect = [...arrSelect];
//     for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
//       newArrSelect.push({
//         roomTypeId: ListRoomTypeByHotel[i].id,
//       });
//     }
//     setArrSelect(newArrSelect);

//   }
//   // Hàm định dạng số có hai chữ số (ví dụ: 1 -> 01)
//   const padZero = (num) => (num < 10 ? '0' : '') + num;


//   // Hàm để lưu giá trị dates[0].startDate1 và dates[0].endDate vào localStorage
//   function saveStartDate() {
//     let startDateStr = dates[0].startDate;
//     let endDateStr = dates[0].endDate;

//     let startDateObj = new Date(startDateStr);
//     let endDateObj = new Date(endDateStr);

//     let formatDate = (dateObj) => {
//       let day = padZero(dateObj.getUTCDate());
//       let month = padZero(dateObj.getUTCMonth() + 1); // Tháng bắt đầu từ 0
//       let year = dateObj.getUTCFullYear();
//       let hours = padZero(dateObj.getUTCHours());
//       let minutes = padZero(dateObj.getUTCMinutes());
//       let seconds = padZero(dateObj.getUTCSeconds());
//       return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
//     };

//     let formattedStartDate = formatDate(startDateObj);
//     let formattedEndDate = formatDate(endDateObj);

//     // Lưu giá trị vào localStorage
//     localStorage.setItem('savedStartDate', formattedStartDate);
//     localStorage.setItem('savedEndDate', formattedEndDate);

//     // console.log("Saved start date:", formattedStartDate);
//     // console.log("Saved end date:", formattedEndDate);
//   }

//   // Hàm để lấy giá trị từ localStorage khi tải lại trang
//   function loadStartDate() {
//     let savedStartDate = localStorage.getItem('savedStartDate');
//     let savedEndDate = localStorage.getItem('savedEndDate');

//     if (savedStartDate) {
//       setStartDate(savedStartDate);
//       // console.log("Loaded start date from localStorage:", savedStartDate);
//     } else {
//       console.log("No saved start date found in localStorage.");
//     }

//     if (savedEndDate) {
//       setEndDate(savedEndDate);
//       // console.log("Loaded end date from localStorage:", savedEndDate);
//     } else {
//       console.log("No saved end date found in localStorage.");
//     }


//   }



//   const [reservationDetailData, setReservationDetailData] = useState(null);
//   const [reservation, setReservation] = useState(null);
//   const [reservation111, setReservation111] = useState('8888');
//   useEffect(() => {
//     if (startDate1 && endDate) {
//       const defaultReservationDetailData = {
//         userId: 9, // ID của người dùng
//         reservationId: "11",
//         startDate: startDate1,
//         endDate: endDate,
//         bookingDetails: [] // Mảng chứa các chi tiết đặt phòng
//       };

//       const defaultReservation = {
//         userId: userId,
//         hotelId: hotelId,
//         roomCount: "",
//         totalPrice: "",
//         reservationStatus: "",
//         discountPercent: "",
//         description: "",
//         isPayment: "",
//         startDate: startDate1,
//         endDate: endDate,
//         reservationDate: "",

//         name: "",
//         address: "",
//         phoneNumber: "",
//         email: email,
//       };

//       setReservationDetailData(defaultReservationDetailData);
//       setReservation(defaultReservation);

//       console.log("defaultReservationDetailData:", defaultReservationDetailData);
//       console.log("defaultReservation:", defaultReservation);
//     }
//   }, [startDate1, endDate, userId, hotelId, email]); // Đảm bảo các dependency cần thiết


//   const handleOnChangeInput = (value, name) => {
//     let _reserveData = _.cloneDeep(reservationData);
//     _reserveData[name] = value;
//     setReservationData(_reserveData);
//   };

//   const handleSelectRoomChange = async (value) => {
//     let reservationId = await getMaxIdReservation();
//     // console.log(">>>check max id1", reservationId.DT + 1);
//     setReservationDetailData(prevState => ({
//       ...prevState,
//       reservationId: reservationId.DT + 1// Assuming reservationId.DT contains the new reservation ID
//     }));
//     // console.log(">>>check max id2", reservationDetailData.reservationId);
//     if (value) {
//       const [selectedCountRoom, roomTypeId, totalPrice] = value.split('-');
//       // console.log(">>check roomchang var: ", selectedCountRoom, roomTypeId, totalPrice);

//       const newBookingDetail = {
//         roomTypeId: parseInt(roomTypeId),
//         selectedRooms: parseInt(selectedCountRoom),
//         PriceByRoom: parseInt(totalPrice),
//       };

//       setReservationDetailData(prevData => {
//         const existingIndex = prevData.bookingDetails.findIndex(detail => detail.roomTypeId === newBookingDetail.roomTypeId);

//         if (existingIndex !== -1) {
//           if (newBookingDetail.selectedRooms === 0) {
//             // Xóa mục khỏi danh sách nếu selectedRooms bằng 0
//             return {
//               ...prevData,
//               bookingDetails: prevData.bookingDetails.filter(detail => detail.roomTypeId !== newBookingDetail.roomTypeId)
//             };
//           } else {
//             // Cập nhật thông tin đặt phòng nếu đã tồn tại
//             const updatedDetails = [...prevData.bookingDetails];
//             updatedDetails[existingIndex] = newBookingDetail;
//             return {
//               ...prevData,
//               bookingDetails: updatedDetails
//             };
//           }
//         } else {
//           // Thêm mới thông tin đặt phòng nếu selectedRooms không bằng 0
//           return newBookingDetail.selectedRooms !== 0 ? {
//             ...prevData,
//             bookingDetails: [...prevData.bookingDetails, newBookingDetail]
//           } : prevData;
//         }
//       });
//     }

//   };

//   const [totalRoom1, setTotalRoom] = useState('ppp');
//   const [totalPrice, setTotalPrice] = useState('');

//   const saveReservationDetails = async () => {
//     let totalRoom = 0;
//     let totalPrice = 0;
//     try {

//       console.log("check savev  ===========================================================00");
//       console.log(">>check :", reservationDetailData);
//       const reservationId = await getMaxIdReservation();
//       for (const detail of reservationDetailData.bookingDetails) {
//         const { roomTypeId, selectedRooms, PriceByRoom } = detail;
//         totalRoom += selectedRooms;


//         const roomData = await fetchRoom_By_RoomType(roomTypeId);
//         if (roomData.EC !== 0) {
//           console.error(roomData.EM);
//           continue;
//         }

//         const availableRooms = roomData.DT.rooms.filter(room => room.roomStatus === 0);
//         if (availableRooms.length === 0) {
//           console.log(`No available rooms found for room type ID ${roomTypeId}`);
//           continue;
//         }

//         for (let i = 0; i < selectedRooms; i++) {
//           if (i >= availableRooms.length) {
//             console.log("Not enough available rooms to fulfill the reservation request.");
//             break;
//           }
//           const roomIdSelected = availableRooms[i].id;
//           totalPrice += PriceByRoom;
//           await createNewReservationDetail({
//             roomId: roomIdSelected,
//             reservationId: reservationDetailData.reservationId,
//             price: PriceByRoom,
//             startDate: reservationDetailData.startDate,
//             endDate: reservationDetailData.endDate
//           });
//         }
//       }
//       setReservation111("90909");
//       console.log("check totalroom===========================", totalRoom)
//       console.log("check totalroom===========================", totalPrice)
      
//       setReservation(prev => ({ ...prev, roomCount: totalRoom, totalPrice: totalPrice }));
      
//       } catch (error) {
        
//         console.error('Error saving reservation details:', error);
//         }
//       setTotalRoom(totalRoom);
//     console.log("Total rooms reserved+++++++++++++++++++++++++++++++ôkokok:", reservation);
//   };

//   useEffect(() => {
//     console.log('Updated reservation:', reservation);
//     setReservation111("90909");
//     console.log("Updating reservation: llllllllllllllllllll", totalRoom1);
//   }, [reservation,totalRoom1]);
  





//   const history = useHistory();

//   const handleClick = async () => {

//   };




//   const handleConfirmReservation = async (event) => {
//     if (!userId) {
//     //  event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
//       history.push('/login');
//     } else {
//       console.log("Total rooms reserved+++++++++++++++++++++++++++++++=====================:", reservation);
//       await saveReservationDetails();
//       // await createNewReservation(reservation);
//       console.log("Total rooms reserved+++++++++++++++++++++++++++++++ôkoko000000000000000000000000:", reservation111);
//       toast.success('Reservation confirmed!  okok');
//     }
//   };




//   return (

//     <div className="reserveContainer">

//       <div className="ReserveTable">
//         <div className="ReserveWrapper">
//           <table className="table table-bordered table-bordered-middle">
//             <thead className="reserve-thead">
//               <tr>
//                 <th className="col">Room type</th>
//                 <th className="col ">Number of guests</th>
//                 <th className="col">Today's price</th>
//                 <th className="col">Your choices</th>
//                 <th className="col">Select rooms</th>
//               </tr>
//             </thead>
//             <tbody className="">
//               {ListRoomTypeByHotel && ListRoomTypeByHotel.length > 0 ? (
//                 <>
//                   {ListRoomTypeByHotel.map((item, index) => {
//                     return (
//                       <tr className="">
//                         <td>
//                           <div>
//                             {item.type_name}
//                           </div>
//                         </td>
//                         <td>
//                           <div className="">
//                             Max persons: <b>{item.max_people}</b>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="">
//                             Current price:  {item.price} VND
//                           </div>
//                         </td>
//                         <td>
//                           <div className="">
//                             <span>{item.yourChoices}</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="">
//                             <label >
//                               <span className="select_room">Select rooms</span>
//                             </label>
//                             <select
//                               className="form-select"
//                               onChange={(event) => handleSelectRoomChange(event.target.value)}
//                             >
//                               <option key={0} value={`0-${item.id}-0`}>0</option>
//                               {Array.from({ length: item.countRoom }, (_, index) => {
//                                 const selectedCountRoom = index + 1;
//                                 return (
//                                   <option key={index + 1} value={`${selectedCountRoom}-${item.id}-${item.price}`}>
//                                     {selectedCountRoom} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{selectedCountRoom * item.price})
//                                   </option>
//                                 );
//                               })}
//                             </select>

//                           </div>
//                         </td>

//                       </tr>
//                     );
//                   })}
//                 </>
//               ) : (
//                 <>
//                   <tr>
//                     <td>Not Found User</td>
//                   </tr>
//                 </>
//               )}

//             </tbody>

//           </table>
//         </div>
//       </div>

//       {/* <Button variant="primary"
//         onClick={() => handleConfirmReservation()}
//       >
//         Reserve Now!

//       </Button> */}
//       {/* <div>
//         <Link to="/reservation">Reserve Now!</Link>
//       </div> */}

//       <Link
//         to={{
//           pathname: "/reservation",
//           state: {
//             reservation,
//           }
//         }}
//         onClick={handleConfirmReservation}
//       >
//         Reserve Now!
//       </Link>
//     </div>

//   );
// };

// export default Reserve1;