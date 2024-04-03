import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="navbar">
            <div className="navContainer">

                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">booking.com</span>
                </Link>

                {user && user.isAuthenticated === true ? user.account.username : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;