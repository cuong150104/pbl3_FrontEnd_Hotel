// import React, { useEffect, useState, useContext } from "react";
// import "./NavHeader.scss";
// import {
//   Link,
//   NavLink,
//   useLocation,
//   useHistory,
// } from "react-router-dom/cjs/react-router-dom.min";
// import { UserContext } from "../../../context/UserContext";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import logo from "../../../logo.png";
// import { logoutUser } from "../../../services/servicesAdmin/userService";
// import { toast } from "react-toastify";
// import { dropRight } from "lodash";
// import { Dropdown } from "bootstrap";
// const NavHeader = (props) => {
//   const { user, logoutContext } = useContext(UserContext);
//   const location = useLocation();
//   const history = useHistory();

//   const handleLogout = async () => {
//     let data = await logoutUser(); // clear cookies
//     localStorage.removeItem("pbl3_hotel"); // clear local storage
//     logoutContext(); // clear user in context
//     if (data && +data.EC === 0) {
//       toast.success("Logout succeeds...");
//       history.push("/login");
//     } else {
//       toast.error(data.EM);
//     }
//   };

//   if ((user && user.isAuthenticated === true) || location.pathname === "/") {
//     return (
//       <>
//         <div className="navbar-light bg-light">
//           <div className="nav-header ">
//             <Navbar expand="lg" className="bg-body-tertiary" bg="header">
             
//               <Navbar.Brand href="#home">
//                 <h3 className="brand">
//                   <img
//                     src={logo}
//                     width="30"
//                     height="30"
//                     className="d-inline-block align-top mx-3"
//                     alt="Logo"
//                   />
//                   <span className="brand-name">Hotel</span>
//                 </h3>
//               </Navbar.Brand>
//               <Container>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                   <Nav className="me-auto">
//                     <NavLink to="/" exact className="nav-link">
//                       Home
//                     </NavLink>


//                     <NavLink to="/users" className="nav-link">
//                       Users
//                     </NavLink>
//                     <NavLink to="/roles" className="nav-link">
//                       Roles
//                     </NavLink>
//                     <NavLink to="/group-role" className="nav-link">
//                       Group-Role
//                     </NavLink>
//                     <NavLink to="/hotels" className="nav-link">
//                       Hotels
//                     </NavLink>
//                     <NavLink to="/Rooms" className="nav-link">
//                       Rooms
//                     </NavLink>
//                     {/* <NavLink to="/projects" className="nav-link">
//                       Hotels
//                     </NavLink> */}
//                     {/* <NavLink to="/about" className="nav-link">
//                       About
//                     </NavLink> */}
//                   </Nav>
//                   <Nav>
//                     {user && user.isAuthenticated === true ? (
//                       <>
//                         <Nav.Item className="nav-link welcome">
//                           WELCOME {user.account.username} !
//                         </Nav.Item>

//                         <NavDropdown title="Settings" id="basic-nav-dropdown">
//                           <NavDropdown.Item>Change Password</NavDropdown.Item>
//                           <NavDropdown.Divider />
//                           <NavDropdown.Item>
//                             <span onClick={() => handleLogout()}>Log out</span>
//                           </NavDropdown.Item>
//                         </NavDropdown>
//                       </>
//                     ) : (
//                       <Link className="nav-link" to="/login">
//                         <button
//                           class="btn btn-outline-info me-2 mb-1"
//                           type="button"
//                         >
//                           Đăng Nhập
//                         </button>
//                       </Link>
//                     )}
//                   </Nav>
//                 </Navbar.Collapse>
//               </Container>
//             </Navbar>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return <></>;
//   }
// };

// export default NavHeader;