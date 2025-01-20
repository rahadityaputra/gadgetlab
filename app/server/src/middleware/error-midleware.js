import { ResponseError } from "../error/response-error.js";
import Joi from "joi";
import {Prisma } from '@prisma/client'

const errorMiddleware = (err, req, res, next) => {

  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err instanceof Joi.ValidationError) {
    const messages = err.details.map((detail) => {
      return detail.message;
    });
    res
      .status(400)
      .json({
        errors: messages,
      })
      .end();
  } else if (err.name === "JsonWebTokenError") {
    res
      .status(401)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      console.error("Unique constraint failed on the field:", err.meta.target);
        res
      .status(500)
      .json({
        errors: `Unique constraint failed on the field:", ${err.meta.target}`,
      })
      .end();
    } else {
      console.error("Database error:", err.message);
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Error validasi data Prisma
    console.error("Validation error:", err.message);
  } else {
    res
      .status(500)
      .json({
        errors: "An unexpected error occurred. Please try again later",
      })
      .end();
  }
};

export { errorMiddleware };
