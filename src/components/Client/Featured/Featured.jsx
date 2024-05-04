import useFetch from "../../../hooks/useFetch";
import "./featured.scss";

const Featured = () => {
  // const { data, loading, error } = useFetch(
  //   "/hotels/countByCity?cities=berlin,madrid,london"
  // );

  return (
    <div className="featured">
      {
      // loading ? (
      //   "Loading please wait"
      // ) : 
      (
        <>
          <div className="featuredItem">
            <img
              // src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
             src="https://besthuecitytour.com/wp-content/uploads/2020/09/Things-To-Do-In-Da-Nang-Best-Hue-City-Tour-Travel-1.jpg"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              {/* <h2>{data[0]} properties</h2> */}
            </div>
          </div>

          <div className="featuredItem">
            <img
              //src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              src="https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=327&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hồ Chí Minh</h1>
              {/* <h2>{data[1]} properties</h2> */}
            </div>
          </div>
          <div className="featuredItem">
            <img
          // src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          src="https://th.bing.com/th/id/OIP.WbPNl65eZxzL1QDIitlvZgHaE7?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              {/* <h2>{data[2]} properties</h2> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;