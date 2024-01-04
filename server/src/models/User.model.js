import mongoose from "mongoose";
import TodoModel from "./Todo.model.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    min: 6,
    required: true,
    max: 32,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
   default:Date.now ,
  },
  todos:
  [
    {
      type:mongoose.Types.ObjectId,
      ref:"Todo",
    }
  ]
});
const UserModel= mongoose.model("User",userSchema)

export default UserModel