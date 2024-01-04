import React, { useState, useEffect } from "react";
import Header from "./partials/Header.component.jsx";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigation = useNavigate();
  const [form, setform] = useState({
    username: "",
    password: "",
  });


  const [errors, seterrors] = useState(null);
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);

    seterrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        console.log(result.data.data);
        seterrors(result.data.data);
        toast(result.data.message);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
      }
    }
  };
  return (
    <>
      <Header />
      <div className="container mb-3">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6  card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title text-center">Login Form </h4>
              <form onSubmit={handlesubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="username"
                    className="form-control "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email or Username"
                  />
                  {errors?.username && (
                    <small id="emailHelp" className="form-text text-muted ">
                      {errors.username.msg}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="form-label ">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                  {errors?.password && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.password.msg}
                    </small>
                  )}
                </div>

                <div className="row">
                  <div className="col-lg-12 d-flex justify-content-center my-3">
                    <button type="submit" className="btn btn-outline-info mb-3">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
