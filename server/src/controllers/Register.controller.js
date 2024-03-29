import { validationResult } from "express-validator";
import { jsonGenerate } from "../utilities/helpers.js";
import bcrypt, { hashSync } from "bcrypt"
import UserModel from "../models/User.model.js";
import { StatusCode } from "../utilities/constants.js";
import Jwt from "jsonwebtoken"
import { jwtsecretkey } from "../utilities/constants.js";

 const Register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    let { name, username, email, password } = req.body;

   let  salt = await bcrypt.genSalt(10)
   let  hashPassword = bcrypt.hashSync(password,salt)
    password = hashPassword
    const userExist = await UserModel.findOne({$or:[{email:email},
        {username:username},
       
    ]})
    if (userExist)
    {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"user already exists"))
    }

    try{
        const user = await UserModel.create({
name:name,
email:email,
password:password,
username:username
        })
    
const token = Jwt.sign({userId:user._id},jwtsecretkey)
        res.json(jsonGenerate(StatusCode.SUCCESS ,"Registration successful",{
          userId:user._id,token:token
        }));
    
    }
    catch(error)
    {
        console.log(error);
    }
{

}

   
  } 
  else {
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()));
  }
};

export default Register;
