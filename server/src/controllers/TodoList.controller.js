import UserModel from "../models/User.model.js"
import { StatusCode } from "../utilities/constants.js";
import { jsonGenerate } from "../utilities/helpers.js"

export const GetTodos =async (req,res)=>
{
     try{
const list = await UserModel.findById(req.userId).select("-password").populate('todos').exec()

if (!list) {
     return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User not found", null));
   }

   const todos = list.todos || []
return res.json(jsonGenerate (StatusCode.SUCCESS,"all todo list",list))
     }
     catch(error)
     {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"error",error))
     }
}