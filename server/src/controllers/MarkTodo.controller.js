import { validationResult } from "express-validator";
import { jsonGenerate } from "../utilities/helpers.js";
import TodoModel from "../models/Todo.model.js";
import { StatusCode } from "../utilities/constants.js";

const MarkTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      
      .json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required"), errors.mapped());
  }

  try {
    const todo = await TodoModel.findOneAndUpdate(
      { _id: req.body.todo_id, userId: req.userId },
      [ {       $set: {
          isCompleted: 
          {
            $eq:[
              false,"$isCompleted"
            ]
          },  
          
      }
        },
      ]
      
    );

    if (todo) {
      return res
     .json(jsonGenerate(StatusCode.SUCCESS,"Todo successfully updated", todo));
    } else {
      return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo not found", null));
    }
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Could not update todo", null));
  }
};

export default MarkTodo;
