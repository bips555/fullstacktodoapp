/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
export default function Header({ search, setsearch }) {
  const navigation = useNavigate();
  const [user, setuser] = useState(null);


  useEffect(() => {
    const u = localStorage.getItem("user");
    setuser(u);
    
  }, []);

  const handlelogout = () => {
    localStorage.clear();

    navigation("/login");
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="todo-app-text">TODO APP</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto text-center">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              {user ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={handlelogout}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {user && (
              <form className="d-flex">
                <input
                  className="form-control me-sm-2 mx-1"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
                <button
                  className="btn btn-secondary my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
