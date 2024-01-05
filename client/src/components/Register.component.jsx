import { register } from "../services/api.js";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.component.jsx";
export default function Register() {
  const navigation = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigation("/");
    }
  });

  const [form, setform] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, seterrors] = useState(null);

  const handleinputchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    console.log(result);
    if (result.status === 200) {
      if (result.data.status === 201) {
        seterrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("something has went wrong , please try again");
    }
  };

  return (
    <>
      <Header />
      <div className="container mb-5">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6  card border-primary mt-4">
            <div className="card-body">
              <h4 className="card-title text-center">Register Form </h4>
              <form onSubmit={handlesubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    onChange={handleinputchange}
                    type="text"
                    className="form-control "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name "
                  />
                  {errors?.name && (
                    <small id="emailHelp" className="form-text text-muted ">
                      {errors.name.msg}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={handleinputchange}
                    type="email"
                    className="form-control "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                  {errors?.email && (
                    <small id="emailHelp" className="form-text text-muted ">
                      {errors.email.msg}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label ">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleinputchange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Username"
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
                    name="password"
                    onChange={handleinputchange}
                    type="password"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                  {errors?.password && (
                    <small id="emailHelp" className="form-text text-muted ">
                      {errors.password.msg}
                    </small>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-outline-primary my-3 "
                    >
                      Register
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
