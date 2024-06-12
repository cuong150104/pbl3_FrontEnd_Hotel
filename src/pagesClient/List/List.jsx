import "./List.scss";
import Navbar from "../../components/Client/Navbar/Navbar";
import Header from "../../components/Client/HeaderClient/HeaderClient";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/Client/SearchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
// import { fetchDateHotel } from "../../services/hotelService";

const List = () => {
  const location = useLocation();
  const cityFromUrl = location.pathname.split("/")[3];


  const [dates, setDates] = useState([]);
  const [options, setOptions] = useState({});
  const [destination, setDestination] = useState(cityFromUrl || "");


  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/api/v1/hotels/read?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  useEffect(() => {
    if (location.state) {
      setDestination(location.state.destination || cityFromUrl || "");
      setDates(location.state.dates || []);
      setOptions(location.state.options || {});
    } else if (cityFromUrl) {
      setDestination(cityFromUrl);
    }
    console.log("City ===:", destination);
  }, [location.state, cityFromUrl, data]);
  const handleClick = () => {
    reFetch();
  };
  // if(!cityFromUrl)
  //   {
  //     setDestination(location.state.destination );
  //   }

  console.log("City:", destination);
  console.log("Data list:", data);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination </label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${dates[0]?.startDate ? format(dates[0].startDate, "MM/dd/yyyy") : ''} to ${dates[0]?.endDate ? format(dates[0].endDate, "MM/dd/yyyy") : ''}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data && data.length > 0 && data.map((item) => (
                  <SearchItem item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
