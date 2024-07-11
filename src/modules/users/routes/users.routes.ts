import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersControllers from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

const usersController = new UsersControllers();

const userAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
