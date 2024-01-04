import { check } from "express-validator";

export const todoschema = [
  check("desc", "Todo description is required").exists(),
];
export const todoid=[check("todo_id","todo id is required").exists()]