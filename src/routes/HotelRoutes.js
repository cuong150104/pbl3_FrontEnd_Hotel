import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../components/NotFound/NotFound";
import Hotels from "../components/Admin/ManageHotels/Hotels";
import ListRoom from "../components/Admin/ManageRooms/ListRoom";
import BookingList from "../components/Admin/BookingManager/BookingList";
import BookingDetail from "../components/Admin/BookingDetail/BookingDetail";
import Statistics from "../components/Admin/Statistics/Statistics";
import Customer from "../components/Customer/customer";
const CompanyRoutes = () => {
  return (
    <Switch>
      <PrivateRoutes path="/hotels/:hotelId/rooms" component={ListRoom} />
      <PrivateRoutes path="/hotels" component={Hotels} />
      <PrivateRoutes path="/bookings/:bookingId" component={BookingDetail} />
      <PrivateRoutes path="/bookings" component={BookingList} />
      <PrivateRoutes path="/statistics" component={Statistics} />

      <Route path="/" exact>
        <Customer />
      </Route>
      <Route path="*">
        {/* <NotFound /> */}
        <Customer />
      </Route>
    </Switch>
  );
};

export default CompanyRoutes;