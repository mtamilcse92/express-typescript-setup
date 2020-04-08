import { body } from "express-validator";

export default () => {
  return [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ];
};
