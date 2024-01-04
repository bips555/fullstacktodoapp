import { jsonGenerate } from "../utilities/helpers.js";
import { validationResult } from "express-validator";
import TodoModel from "../models/Todo.model.js";
import UserModel from "../models/User.model.js";
import { StatusCode } from "../utilities/constants.js";
const Deletetodo = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        
        .json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()));
    }

    const result = await TodoModel.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await UserModel.findByIdAndUpdate(
        req.userId,
        {
          $pull: {
            todos: req.body.todo_id,
          },
        },
        { new: true }
      );

      return res
       
        .json(jsonGenerate(StatusCode.SUCCESS,"Todo successfully deleted", null));
    } else {
      return res.status(404).json(jsonGenerate("Todo not found"));
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Error deleting todo"));
  }
};

export default Deletetodo;
