import { validationResult } from "express-validator";
import { jsonGenerate } from "../utilities/helpers.js";
import TodoModel from "../models/Todo.model.js";
import UserModel from "../models/User.model.js";
import { StatusCode } from "../utilities/constants.js";

export const createTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo is required", errors.mapped()));
  }
  try{
const result = await TodoModel.create(
    {
        userId:req.userId,
        desc:req.body.desc,

    }
)
   if(result)
   {
    const user = await UserModel.findOneAndUpdate({
        _id:req.userId,
       
    },{$push:
    {
        todos:result,
        
    }})
    return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created successfully.",result))
   
}
  }
  
  catch(error)
  {
    return res.json(StatusCode.UNPROCESSABLE_ENTITY,jsonGenerate("Something went wrong",error))
  }
}

