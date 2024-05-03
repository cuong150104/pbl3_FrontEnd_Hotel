import { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { useHistory, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { loginUser } from "../../services/servicesAdmin/userService";
import { UserContext } from "../../context/UserContext";
import logo from "../../logo.png";
import React from 'react';
import ReactDOM from 'react-dom';
// import Root from '../../Root'; // Import Root component from Root.js
import reportWebVitals from '../../reportWebVitals';

const Login = (props) => {
  const { user, loginContext } = useContext(UserContext);

  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error("Please enter your email address or phone number");
      return;
    }

    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error("Please enter your password");
      return;
    }

    let response = await loginUser(valueLogin, password);

    if (response && +response.EC === 0) {
      // Success
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
        },
      };

      localStorage.setItem("jwt", token);
      loginContext(data);
      if (groupWithRoles.name === "Admin") {
        history.push("/admin");
      } else if (groupWithRoles.name === "Customer") {
        history.push("/company");
      } else {
        history.push("/");
      }
    }

    if (response && +response.EC !== 0) {
      // ERROR
      toast.error(response.EM);
    }
  };

  const handlePressEnter = (event) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div class="wrapper">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div class="container-fluid">
            <div class="row row-cols-1 row-cols-lg-1">
              <div class="col mx-auto">
                <div class="card">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <div class="text-center">
                        <img
                          src={logo}
                          width="30"
                          height="30"
                          className="d-inline-block align-top me-3"
                          alt="Logo"
                        />
                        <h3 class="">Login</h3>
                      </div>
                      <p>
                        Don't have an account yet?
                        <Link to="/register">Register here</Link>
                      </p>
                      <div class="form-body">
                        <form class="row g-3">
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className={
                                objValidInput.isValidValueLogin
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Email address or phone number"
                              value={valueLogin}
                              onChange={(event) => {
                                setValueLogin(event.target.value);
                              }}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Enter Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objValidInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                                onKeyDown={(event) => handlePressEnter(event)}
                              />
                            </div>
                          </div>
                          <div class="col-md-12 d-inline-block text-center">
                            <Link to="#">Forgot Password?</Link>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
                                  handleLogin();
                                }}
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
