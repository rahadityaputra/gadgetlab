import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import userController from "../controller/user-controller.js";

const userRouter = express.Router();


userRouter.use(authMiddleware);
userRouter.post('/api/users/current/devices/:device_id/reviews', userController.addReview);
userRouter.get('/api/users/current', userController.getCurrentUser);
userRouter.patch('/api/users/current', userController.updateData);
userRouter.post('/api/users/logout', userController.logout);
userRouter.post('/api/users/:user_id/favorites', userController.addFavorite);
userRouter.delete('/api/users/current/reviews/:review_id', userController.deleteReview);
userRouter.patch('/api/users/:user_id/reviews/:review_id', userController.updateReview);


export {
    userRouter
}
