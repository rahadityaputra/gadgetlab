import express from "express";
import { publicRouter } from "./route/public-api.js";
import { userRouter } from "./route/user-api.js";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/error-midleware.js";
import mongodb from "./configuration/mongodb.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(mongodb.connectMongoDB);
app.use(publicRouter);
app.use(userRouter);
app.use(errorMiddleware);

export { app };
