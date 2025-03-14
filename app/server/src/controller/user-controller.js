import userService from "../service/user-service.js";
import dotenv from "dotenv";
import jwtUtlils from "../utils/jwtUtlils.js";

dotenv.config({ path: "../" });

const register = async (req, res, next) => {
  const userData = req.body;

  try {
    const result = await userService.register(userData);
    await userService.sendVerificationCode(result.email, result.id);
    res.status(200).json({
      data: {
        userId: result.id,
        message: "Verification code sent successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const userData = req.body;
  try {
    const result = await userService.login(userData);
    await userService.sendVerificationCode(result.email, result.id);
    res.status(200).json({
      data: {
        userId: result.id,
        username: result.username,
        message: "Verification code sent successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginVerificationCode = async (req, res, next) => {
  const { userId, username, code } = req.body;

  try {
    await userService.verifyVerificationCode(code, userId);
    const token = await jwtUtlils.createToken(username);
    res.status(200).json({
      data: {
        message: "Verification code verified successfully",
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyRegisterVerificationCode = async (req, res, next) => {
  const { userId, code } = req.body;
  try {
    await userService.verifyVerificationCode(code, userId);
    await userService.setNotPendingVerification(userId);
    await userService.activedUserVerification(userId);

    res.status(201).json({
      data: {
        userId,
        message: "registration successful, please login",
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  const user = req.user;
  try {
    const result = await userService.getUserData(user.username);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const user = req.user;

  try {
    res.status(200).json({
      data: {
        status: "success",
        message: "logout successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateData = async (req, res, next) => {
  const user = req.user;

  try {
    const result = await userService.update();
    res.status(200).json({
      data: {
        status: "success",
        message: "logout successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  const { device_id, device_name, device_img } = req.body;
  const user_id = parseInt(req.params.user_id);

  try {
    const result = await userService.addFavorite(user_id, {
      device_id,
      device_name,
      device_img,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  const { rating, reviewText } = req.body;
  const username = req.user.username;
  const deviceId = req.params.device_id;
  try {
    const result = await userService.addReview({
      username,
      deviceId,
      rating,
      reviewText :  reviewText, 
    });  
    
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteReview = async (req, res, next) => {
  const userId = parseInt(req.params.user_id);
  const reviewId = parseInt(req.params.review_id);

  try {
    const result = await userService.deleteReview({
      userId,
      reviewId,
    });

    res.status(200).json({
      data: {
        message: "Review successfully deleted",
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  const { rating, review_text } = req.body;
  const userId = parseInt(req.params.user_id);
  const reviewId = parseInt(req.params.review_id);

  try {
    const result = await userService.updateReview({
      userId,
      reviewId,
      review_text,
      rating,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  verifyLoginVerificationCode,
  verifyRegisterVerificationCode,
  getCurrentUser,
  updateData,
  logout,
  addFavorite,
  addReview,
  deleteReview,
  updateReview,
};
