import { prisma } from "../configuration/prisma.js";
import { ResponseError } from "../error/response-error.js";
import { Otp } from "../model/otp-model.js";
import cryptoUtils from "../utils/cryptoUtils.js";
import mongoDbUtils from "../utils/mongoDbUtils.js";
import nodemailerUtils from "../utils/nodemailerUtils.js";
import { reviewValidation } from "../validation/review-validation.js";
import { userValidation } from "../validation/user-validation.js";
import validation from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  try {
    const user = await userValidation(
      validation.registerUserValidation,
      request
    );

    // Cek keberadaan user berdasarkan username
    const existingUser = await prisma.user.findUnique({
      where: { username: user.username },
    });

    if (existingUser) {
      // Jika user sudah diverifikasi, lempar error
      if (existingUser.pendingVerification === false) {
        throw new ResponseError(400, "Username or email already exists");
      }

      // Jika user belum diverifikasi, hapus record
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const login = async (request) => {
  try {
    const user = await userValidation(validation.loginUserValidation, request);
    const userCorrect = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
      },
    });

    console.log(userCorrect);

    if (!userCorrect) {
      throw new ResponseError(
        401,
        "Invalid credentials. Please check your username and password and try again."
      );
    }
    const result = await bcrypt.compare(user.password, userCorrect.password);

    if (!result) {
      throw new ResponseError(401, "Password is wrong");
    }
    return {
      id: userCorrect.id,
      name: userCorrect.name,
      username: userCorrect.username,
      email: userCorrect.email,
    };
  } catch (error) {
    throw error;
  }
};

const getUserData = async (username) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    });

    return result;
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

const update = async (username) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        name: true,
        email: true,
      },
    });

    return result;
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

const addFavorite = async (user_id, { device_id, device_name, device_img }) => {
  try {
    const result = await prisma.favorite.create({
      data: {
        user_id: user_id,
        device_id: device_id,
        device_name: device_name,
        device_img: device_img,
      },

      select: {
        user_id: true,
        device_id: true,
        device_name: true,
        device_img: true,
      },
    });

    return result;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const sendVerificationCode = async (email, user_id) => {
  console.log(email);
  const code = cryptoUtils.generateVerificationCode();
  const otp = new Otp(code, user_id);
  try {
    const save = await mongoDbUtils.saveData(otp, "otp_codes");
    await nodemailerUtils.sendVerificationCode({ code, to: email });
    return true;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const verifyVerificationCode = async (verificationCode, userId) => {
  console.log("ini adalah kode verif", verificationCode, "inin user id", userId)
  try {
    const result = await mongoDbUtils.findVerificationCode(
      verificationCode,
      userId
    );
    console.log(result);

    if (!result) {
      console.log("wkwkwkk");

      throw new ResponseError(400, "Verification code is incorrect.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

const setNotPendingVerification = async (userId) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pendingVerification: false,
      },
    });

    return;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const activedUserVerification = async (userId) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });

    return;
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};

const addReview = async ({ userId, deviceId, rating, review_text }) => {
  try {
    await reviewValidation(validation.reviewValidation, {
      review_text,
      rating,
    });
    const result = await prisma.review.create({
      data: {
        rating: rating,
        review_text: review_text,
        device_id: deviceId,
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        device_id: true,
        rating: true,
        review_text: true,
        createdAt: true,
        users: {
          select: {
            username: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteReview = async ({ userId, reviewId }) => {
  console.log(userId, reviewId);

  try {
    // Validasi kepemilikan review
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      throw new ResponseError(404, "Review not found.");
    }

    if (review.user_id !== userId) {
      throw new ResponseError(
        401,
        "You are not authorized to delete this review."
      );
    }

    const result = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const updateReview = async ({ userId, reviewId, rating, review_text }) => {
  try {
    await reviewValidation(validation.reviewValidation, {
      rating,
      review_text,
    });
    const result = await prisma.review.update({
      where: {
        id: reviewId,
        user_id: userId,
      },
      data: {
        rating: rating,
        review_text: review_text,
      },

      select: {
        id: true,
        rating: true,
        review_text: true,
        device_id: true,
        users: {
          select: {
            username: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
  getUserData,
  update,
  addFavorite,
  sendVerificationCode,
  verifyVerificationCode,
  activedUserVerification,
  setNotPendingVerification,
  addReview,
  deleteReview,
  updateReview,
};
