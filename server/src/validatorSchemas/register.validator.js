import { check } from "express-validator";

export const Registerschema = [
  check("name")
    .trim()
    .isAlpha()
    .withMessage("Name should only be in alphabets"),
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username should be alphanumeric character only")
    .trim()
    .isLength({ min: 6, max: 32 }),
  check("password", "password is required")
    .exists()
    .isLength({ min: 6, max: 100 })
    .trim(),
  check("email", "email is required").exists().isEmail(),
];
