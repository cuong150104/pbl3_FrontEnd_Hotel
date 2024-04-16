import "./Hotel.scss";
import Navbar from "../../componentsClient/Navbar/Navbar";
import Header from "../../componentsClient/HeaderClient/HeaderClient";
import Footer from "../../componentsClient/Footer/Footer";
import MailList from "../../componentsClient/MailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { searchContext } from "../../context/searchContext";
import Reserve from "../../componentsClient/Reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
 
  const { data, loading, error } = useFetch(`/api/v2/hotels/find/${id}`);
  const { user } = useContext(UserContext);
  console.log(">> check user: ", user);
  const history = useHistory();
  const searchContextValue = useContext(searchContext);
  let dates, options;
  
  
  console.log(">>check dates: ", dates);
  //const { dates, options } = useContext(searchContext);
  console.log(">>check data hotel", data);

  // const { state } = useContext(searchContext);
  // console.log(">>check date hotel+++", state);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

//  const days = dayDifference(dates[0].endDate, dates[0].startDate);
// const [day, setday] = useState(days);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  
  const handleClick = () => {
    console.log(">> check user click: ", user);
    if (user.isAuthenticated === true) {
     setOpenModal(true);
     console.log("check setpen ", openModal);
    } else {
      history.push("/login");
    }
    
  };
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                 // src={data.photos[slideNumber]}
                 src={JSON.parse(data.photos)[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            {/* <div className="hotelImages">
              {JSON.parse(data.photos)?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div> */}
            <div className="hotelImages">
              {data.photos && JSON.parse(data.photos).map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                {/* <h1>Perfect for a {days}-night stay!</h1> */}
                <h1>Perfect for a ?? -night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  {/* <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights) */}
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />} */}
    </div>
  );
};

export default Hotel;