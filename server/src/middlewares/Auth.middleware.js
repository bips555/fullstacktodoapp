import { StatusCode, jwtsecretkey } from "../utilities/constants.js";
import { jsonGenerate } from "../utilities/helpers.js";
import Jwt from "jsonwebtoken";
const Authmiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"access forbidden"));
  }
  const token = req.headers["auth"];
  try {
    const decoded = Jwt.verify(token, jwtsecretkey);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(StatusCode.UNPROCESSABLE_ENTITY,jsonGenerate("invalid token"));
  }
};
export default Authmiddleware;
