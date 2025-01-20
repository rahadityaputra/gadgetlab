import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

export default {
  createToken,
  verifyToken,
};
