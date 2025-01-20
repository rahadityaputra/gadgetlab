import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import deviceController from "../controller/device-controller.js";
import brandController from "../controller/brand-controller.js";

const publicRouter = express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post(
  "/api/users/register/verify-verification-code",
  userController.verifyRegisterVerificationCode
);
publicRouter.post("/api/users/login", userController.login);
publicRouter.post(
  "/api/users/login/verify-verification-code",
  userController.verifyLoginVerificationCode
);

publicRouter.get("/api/devices/popular", deviceController.getPopularDevices);
publicRouter.get(
  "/api/devices/search",
  deviceController.getResultSearchDevices
);
publicRouter.get("/api/devices/:id", deviceController.getDetailDevice);
publicRouter.get(
  "/api/devices/:id/export",
  deviceController.getPdfFileDetailDevice
);
publicRouter.get("/api/brands/", brandController.getBrands);
publicRouter.get("/api/brands/:id", brandController.getDevicesByBrand);
publicRouter.get(
  "/api/devices/:device_id/reviews",
  deviceController.getReviews
);
publicRouter.get(
  "/api/devices/:device_id/reviews/average-rating",
  deviceController.getAverageRating
);

export { publicRouter };
