import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import userController from "../controller/user-controller.js";

const userRouter = express.Router();


userRouter.use(authMiddleware);
userRouter.get('/api/users/current', userController.getCurrentUser);
userRouter.patch('/api/users/current', userController.updateData);
userRouter.post('/api/users/logout', userController.logout);
userRouter.post('/api/users/:user_id/favorites', userController.addFavorite);
// userRouter.get('/api/users/:user_id/favorites', userController.getFavorites);
// userRouter.delete('/api/users/:user_id/favorites/:favorite_id', userController.deleteFavorite);
// userRouter.post('/api/users/:user_id/devices/:device_id/reviews', userController.addReview);
// userRouter.delete('/api/users/:user_id/reviews/:review_id', userController.deleteReview);
// userRouter.put('/api/users/:user_id/reviews/:review_id', userController.updateReview);
// userRouter.post('/api/feedbacks', feedbackController.addFeedback);


export {
    userRouter
}