import React, { useEffect, useState } from "react";
import Header from "./partials/Header.component.jsx";
import Todo from "./partials/Todo.component.jsx";
import Addtodomodal from "./partials/Addtodomodal.component.jsx";
import { gettoken, list_todo } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const navigation = useNavigate();
  const [search, setsearch] = useState("");
  const [list, setList] = useState([]);
  const [filter, setfilter] = useState([]);
  const [refresh, refreshlist] = useState();

  useEffect(() => {
    if (!gettoken()) {
      navigation("/login");
    }
    fetchtodolist();
  }, [refresh]);
  useEffect(() => {
    if (search === "") {
      setfilter(list);
    } else {
      const filter = list.filter((todo) =>
        todo.desc.toLowerCase().includes(search.toLowerCase().trim())
      );
      setfilter(filter);
    }
  }, [list, search]);

  const fetchtodolist = async () => {
    const result = await list_todo();

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  };

  return (
    <div>
      <Header search={search} setsearch={setsearch} />
      <ToastContainer />
      <div className="container">
        <div className="row d-flex justify-content-center mt-4">
          {filter.map((todo) => (
            <Todo todo={todo} key={todo._id} refreshlist={refreshlist} />
          ))}
          {filter.length === 0 && (
            <div className="notfound">
              <h1>Todo not found</h1>
            </div>
          )}
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>
      <Addtodomodal refreshlist={refreshlist} />
    </div>
  );
}
