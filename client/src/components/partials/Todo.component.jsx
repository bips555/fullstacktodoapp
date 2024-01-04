import React from "react";
import moment from "moment";
import { delete_todo, update_todo } from "../../services/api.js";
import { toast } from "react-toastify";

export default function Todo({ todo,refreshlist }) {
  const handledelete = async () => {
    const result = await delete_todo(
      {
        todo_id:todo._id
      }
   
    );
    console.log(result);
    
   
    if (result.data.status === 200) {
     refreshlist(new Date())
      toast("Deleted");
    } else {
      toast("Failed to delete , Please try again!!");
    }

  };
  const handleupdatetodo = async () => {
    const result = await update_todo(
      {
        todo_id:todo._id
      }
   
    );
    console.log(result);
    
   
    if (result.data.status === 200) {
     refreshlist(new Date())
      toast(result.data.message);
    } else {
      toast("Failed to update , Please try again!!");
    }

  };

  return (
    <div className="col-sm-12 col-11 col-md-6 col-lg-5 mx-1  my-2 alert bg-info text-danger">
      <div className="card-header h5">
        {todo.isCompleted ? "completed" : "Not completed"}
      </div>
      <div className="card-body ">
        <h5 className="card-title h1" style={{textDecoration:todo.isCompleted ? "line-through":"none" }}>{todo.desc}</h5>
        <p className="card-text">{moment(todo.date).fromNow()}</p>
        <div className="actionButtons mt-2 d-flex justify-content-between align-items-center">
          <div className="deletebutton">
            <button className="btn btn-outline-danger" onClick={handledelete}>
              Delete
            </button>
          </div>
          <div className="markTodo">
            <button className="btn btn-outline-danger"
            onClick={handleupdatetodo}>
              {todo.isCompleted ? "Mark incomplete" : "Mark Completed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
