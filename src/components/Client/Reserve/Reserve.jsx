import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.scss";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useContext, useState } from "react";
import { searchContext } from "../../../context/searchContext";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import React from 'react';
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _, { cloneDeep } from "lodash";
import { fetchRoomTypeByHotel } from "../../../servises/room_TypeServises";
import { fetchRoom_By_RoomType } from "../../../servises/roomServises";
import { getMaxIdReservation } from "../../../servises/reservationService";
import { createNewReservationDetail } from "../../../servises/reservationDetailService";
import { fetchDateHotel } from "../../../servises/hotelService";
const Reserve1 = ({ hotelId, userId, email, nameHotel }) => {
  const { data } = useFetch(`/api/v1/hotels/room/${hotelId}`);
  const { dates } = useContext(searchContext);

  // console.log("check dateeeee: ", dates);
  console.log("check dateeeee  start: ", dates[0]?.startDate);
  console.log("check dateeeee  start: ", dates[0]?.endDate);

  const [ListRoomTypeByHotel, setListRoomTypeByHotel] = useState([]);

  const getRoomTypeByHotel = async () => {
    let data = await fetchRoomTypeByHotel(hotelId);
    if (data && +data.EC === 0) {
      setListRoomTypeByHotel(data.DT);
    }
  }

  const [Room_By_TypeRoom, setRoom_By_TypeRoom] = useState([]);
  const getRoom_By_TypeRoom = async (roomTypeId) => {
    let data = await fetchRoom_By_RoomType(1);
    if (data && +data.EC === 0) {
      setRoom_By_TypeRoom(data.DT);

      return data.DT;
    }
    return null;
  }

  const selectRooms = {
    roomId: "",
    roomTypeId: "",
    selectedRooms: 0,
    PriceByRoom: "",
    isSelected: false,
    typeRoom: false,
    countRoom: "",
    price: "",
  };

  const [arrSelect, setArrSelect] = useState([]);
  const handleSelectRooms = () => {
    for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
      setArrSelect(prevArr => [...prevArr, selectRooms]); // Sửa đổi ở đây, sử dụng `push` để thêm phần tử vào mảng
    }

    let newArrSelect = [...arrSelect];
    for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
      newArrSelect.push({
        roomTypeId: ListRoomTypeByHotel[i].id,
      });
    }
    setArrSelect(newArrSelect);

  }
  // Hàm định dạng số có hai chữ số (ví dụ: 1 -> 01)
  const padZero = (num) => (num < 10 ? '0' : '') + num;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    getRoomTypeByHotel();
    handleSelectRooms();
    getRoom_By_TypeRoom();
    saveStartDate();
    loadStartDate();
  }, []);

  // Hàm để lưu giá trị dates[0].startDate và dates[0].endDate vào localStorage
  function saveStartDate() {
    let startDateStr = dates[0]?.startDate;
    let endDateStr = dates[0]?.endDate;

    let startDateObj = new Date(startDateStr);
    let endDateObj = new Date(endDateStr);

    let formatDate = (dateObj) => {
      let padZero = (num) => num.toString().padStart(2, '0');

      let day = padZero(dateObj.getDate());
      let month = padZero(dateObj.getMonth() + 1); // Months start from 0
      let year = dateObj.getFullYear();
      let hours = padZero(dateObj.getHours());
      let minutes = padZero(dateObj.getMinutes());
      let seconds = padZero(dateObj.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    let formattedStartDate = formatDate(startDateObj);
    let formattedEndDate = formatDate(endDateObj);

    // Lưu giá trị vào localStorage
    localStorage.setItem('savedStartDate', formattedStartDate);
    localStorage.setItem('savedEndDate', formattedEndDate);

    console.log(">>>>>>>>>>>>>>>>Saved start date:", formattedStartDate);
    console.log("Saved end date:", formattedEndDate);
  }

  // Hàm để lấy giá trị từ localStorage khi tải lại trang
  function loadStartDate() {
    let savedStartDate = localStorage.getItem('savedStartDate');
    let savedEndDate = localStorage.getItem('savedEndDate');

    if (savedStartDate) {
      setStartDate(savedStartDate);
      console.log("Loaded start date from localStorage:", savedStartDate);
    } else {
      console.log("No saved start date found in localStorage.");
    }

    if (savedEndDate) {
      setEndDate(savedEndDate);
      console.log("Loaded end date from localStorage:", savedEndDate);
    } else {
      console.log("No saved end date found in localStorage.");
    }
  }

  // Function to calculate the difference in days between two dates
  function calculateDaysBetweenDates(startDate, endDate) {
    // Ensure both dates are Date objects
    if (!(startDate instanceof Date) && typeof startDate === 'string') {
      startDate = new Date(startDate);
    }
    if (!(endDate instanceof Date) && typeof endDate === 'string') {
      endDate = new Date(endDate);
    }

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'Invalid date(s) provided';
    }

    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / oneDay);
    return differenceInDays;
  }


      const daysBetween = calculateDaysBetweenDates(startDate, endDate);
     
 console.log(">>check day", daysBetween);

  const [reservationDetailData, setReservationDetailData] = useState(null);
  const [reservation, setReservation] = useState(null);
  useEffect(() => {
    if (startDate && endDate) {
      const defaultReservationDetailData = {
        userId: 9, // ID của người dùng
        reservationId: "11",
        startDate: startDate,
        endDate: endDate,
        bookingDetails: [] // Mảng chứa các chi tiết đặt phòng
      };

      const defaultReservation = {
        userId: userId,
        hotelId: hotelId,
        totalRoom: "",
        totalPrice: "",
        reservationStatus: "",
        discountPercent: "",
        description: "",
        isPayment: "",
        startDate: startDate,
        endDate: endDate,
        reservationDate: "",
        nameHotel: nameHotel,
        name: "",
        address: "",
        phoneNumber: "",
        email: email,
      };

      setReservationDetailData(defaultReservationDetailData);
      setReservation(defaultReservation);

    }
  }, [startDate, endDate, userId, hotelId, email]); // Đảm bảo các dependency cần thiết


  const handleSelectRoomChange = async (value) => {
    let reservationId = await getMaxIdReservation();
    setReservationDetailData(prevState => ({
      ...prevState,
      reservationId: reservationId.DT + 1// Assuming reservationId.DT contains the new reservation ID
    }));
    if (value) {
      const [selectedCountRoom, roomTypeId, totalPrice] = value.split('-');
      const newBookingDetail = {
        roomTypeId: parseInt(roomTypeId),
        selectedRooms: parseInt(selectedCountRoom),
        PriceByRoom: parseInt(totalPrice),
      };

      setReservationDetailData(prevData => {
        const existingIndex = prevData.bookingDetails.findIndex(detail => detail.roomTypeId === newBookingDetail.roomTypeId);

        if (existingIndex !== -1) {
          if (newBookingDetail.selectedRooms === 0) {
            // Xóa mục khỏi danh sách nếu selectedRooms bằng 0
            return {
              ...prevData,
              bookingDetails: prevData.bookingDetails.filter(detail => detail.roomTypeId !== newBookingDetail.roomTypeId)
            };
          } else {
            // Cập nhật thông tin đặt phòng nếu đã tồn tại
            const updatedDetails = [...prevData.bookingDetails];
            updatedDetails[existingIndex] = newBookingDetail;
            return {
              ...prevData,
              bookingDetails: updatedDetails
            };
          }
        } else {
          // Thêm mới thông tin đặt phòng nếu selectedRooms không bằng 0
          return newBookingDetail.selectedRooms !== 0 ? {
            ...prevData,
            bookingDetails: [...prevData.bookingDetails, newBookingDetail]
          } : prevData;
        }
      });
    }

  };

  const saveReservationDetails = async () => {
    let totalRoom = 0;
    let totalPrice = 0;
    try {
      console.log(">>check :", reservationDetailData);
      const reservationId = await getMaxIdReservation();
      for (const detail of reservationDetailData.bookingDetails) {
        const { roomTypeId, selectedRooms, PriceByRoom } = detail;
        totalRoom += selectedRooms;


        const roomData = await fetchRoom_By_RoomType(roomTypeId);
        if (roomData.EC !== 0) {
          console.error(roomData.EM);
          continue;
        }

        const availableRooms = roomData.DT.rooms.filter(room => room.roomStatus === 0);
        if (availableRooms.length === 0) {
          console.log(`No available rooms found for room type ID ${roomTypeId}`);
          continue;
        }

        for (let i = 0; i < selectedRooms; i++) {
          if (i >= availableRooms.length) {
            console.log("Not enough available rooms to fulfill the reservation request.");
            break;
          }
          totalPrice += PriceByRoom;
          const totalPriceBYday = totalPrice * (daysBetween+1);
          console.log(">>check tien: ", totalPriceBYday);
          console.log(">>check tien: ", daysBetween+1);
          await createNewReservationDetail({
            roomId: availableRooms[i].id,
            reservationId: reservationDetailData.reservationId,
            price:PriceByRoom,
            startDate: reservationDetailData.startDate,
            endDate: reservationDetailData.endDate
          });
        }
      }

      const updatedReservation = {
        ...reservation, // assuming this is your current reservation state
        totalRoom: totalRoom,
        totalPrice:  totalPrice * (daysBetween+1),
      };

      setReservation(updatedReservation);
      return updatedReservation;

    } catch (error) {
      console.error('Error saving reservation details:', error);
    }
  };


  console.log("render reservation", reservation);

  const history = useHistory();
  const handleConfirmReservation = async () => {
    if (!userId) {
      history.push('/login');  // Redirects to login if userId is undefined or false
    } else {
      try {
        const updatedReservation = await saveReservationDetails();
        console.log("Reservation success:", updatedReservation);
        if (updatedReservation) {
          history.push('/reservation', { updatedReservation });
        } else {
          console.error('No reservation data to push');
          toast.error('Reservation data is missing');
        }
        toast.success('Reservation confirmed!');
      } catch (error) {
        console.error('Failed to confirm reservation:', error);
        toast.error('Failed to confirm reservation.');
      }
    }
  };

  return (

    <div className="reserveContainer">
      <div className="ReserveTable">
        <div className="ReserveWrapper">
          <table className="table table-bordered table-bordered-middle">
            <thead className="reserve-thead">
              <tr>
                <th className="col">Room type</th>
                <th className="col ">Number of guests</th>
                <th className="col">Today's price</th>
                <th className="col">Your choices</th>
                <th className="col">Select rooms</th>
              </tr>
            </thead>
            <tbody className="">
              {ListRoomTypeByHotel && ListRoomTypeByHotel.length > 0 ? (
                <>
                  {ListRoomTypeByHotel.map((item, index) => {
                    return (
                      <tr className="">
                        <td>
                          <div>
                            {item.type_name}
                          </div>
                        </td>
                        <td>
                          <div className="">
                            Max persons: <b>{item.max_people}</b>
                          </div>
                        </td>
                        <td>
                          <div className="">
                            Current price:  {item.price} VND
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <span>{item.yourChoices}</span>
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <label >
                              <span className="select_room">Select rooms</span>
                            </label>
                            <select
                              className="form-select"
                              onChange={(event) => handleSelectRoomChange(event.target.value)}
                            >
                              <option key={0} value={`0-${item.id}-0`}>0</option>
                              {Array.from({ length: item.countRoom }, (_, index) => {
                                const selectedCountRoom = index + 1;
                                return (
                                  <option key={index + 1} value={`${selectedCountRoom}-${item.id}-${item.price}`}>
                                    {selectedCountRoom} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{selectedCountRoom * item.price})
                                  </option>
                                );
                              })}
                            </select>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not Found User</td>
                  </tr>
                </>
              )}

            </tbody>

          </table>
        </div>
      </div>
      <Button onClick={handleConfirmReservation}   >
        Reserve Now!
      </Button>
    </div>

  );
};

export default Reserve1;