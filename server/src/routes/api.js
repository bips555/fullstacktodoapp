import express from "express";
import Register from "../controllers/Register.controller.js";
import { Registerschema } from "../validatorSchemas/register.validator.js";
import Login from "../controllers/login.controller.js";
import { Loginschema } from "../validatorSchemas/login.validator.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { todoid, todoschema } from "../validatorSchemas/todo.validator.js";
import { GetTodos } from "../controllers/TodoList.controller.js";
import MarkTodo from "../controllers/MarkTodo.controller.js";
import Deletetodo from "../controllers/Deletetodo.controller.js";
export const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", Registerschema, Register);
apiRoute.post("/login", Loginschema, Login);
apiProtected.post("/createtodo", todoschema, createTodo);
apiProtected.get("/listtodo", todoschema, GetTodos);
apiProtected.post("/marktodo", todoid, MarkTodo);
apiProtected.post("/deletetodo", todoid, Deletetodo);
