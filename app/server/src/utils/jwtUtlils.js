import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ResponseError } from "../error/response-error.js";

dotenv.config({
  path: "../../",
});

const createToken = (username) => {
  return new Promise((resolve, rejected) => {
    jwt.sign(
      {username : username},
      process.env.JWT_SECRETKEY,
      { algorithm: "HS256", expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return rejected(err);
        }
        resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRETKEY, (error, decoded) => {
      if (error) {
        return reject(new ResponseError(401, error.message));
      }
      resolve(decoded);
    });
  });
};

export default {
  createToken,
  verifyToken,
};
