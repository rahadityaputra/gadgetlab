import { ResponseError } from "../error/response-error.js";
import dotenv from "dotenv";
import jwtUtlils from "../utils/jwtUtlils.js";

dotenv.config({ path: "../" });

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new ResponseError(401, "Access token missing");
    }
    const decoded = await jwtUtlils.verifyToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export { authMiddleware };
