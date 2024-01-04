import { validationResult } from "express-validator";
import UserModel from "../models/User.model.js";
import { jsonGenerate } from "../utilities/helpers.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { StatusCode, jwtsecretkey } from "../utilities/constants.js";

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }

    const token = Jwt.sign({ userId: user._id }, jwtsecretkey);

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        token: token,
      })
    );
  }

  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation Error",
      errors.mapped()
    )
  );
};

export default Login;
